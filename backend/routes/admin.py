import os
import secrets
from collections import Counter
from datetime import datetime, timedelta

import requests
from flask import Blueprint, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash

from extensions import db
from models.admin import AdminSetting, SupportTicket
from models.order import Order

admin_bp = Blueprint('admin', __name__)
OTP_EMAIL = os.getenv('ADMIN_OTP_EMAIL')
INITIAL_PASSWORD = os.getenv('ADMIN_INITIAL_PASSWORD')


def setting(key, default=None):
    record = db.session.get(AdminSetting, key)
    return record.value if record else default


def set_setting(key, value):
    record = db.session.get(AdminSetting, key)
    if record:
        record.value = value
    else:
        db.session.add(AdminSetting(key=key, value=value))


def authorized():
    return bool(session.get('admin_authenticated'))


def require_admin():
    if not authorized():
        return jsonify({'error': 'Admin sign-in required.'}), 401
    return None


def order_payload(order):
    tickets = SupportTicket.query.filter_by(order_id=order.id).order_by(SupportTicket.created_at.desc()).all()
    return {
        'id': order.id, 'email': order.email, 'customerName': order.customer_name,
        'phone': order.phone, 'address': order.address, 'quantity': order.quantity,
        'total': order.total, 'status': order.status, 'createdAt': order.created_at.isoformat(),
        'tickets': [{'id': ticket.id, 'message': ticket.message, 'status': ticket.status, 'createdAt': ticket.created_at.isoformat()} for ticket in tickets],
    }


@admin_bp.post('/login')
def login():
    password = (request.get_json(silent=True) or {}).get('password', '')
    password_hash = setting('password_hash')
    if not password_hash and not INITIAL_PASSWORD:
        return jsonify({'error': 'Admin sign-in is not configured.'}), 503
    valid = check_password_hash(password_hash, password) if password_hash else secrets.compare_digest(password, INITIAL_PASSWORD)
    if not valid:
        return jsonify({'error': 'Incorrect admin password.'}), 401
    session.clear(); session['admin_authenticated'] = True
    return jsonify({'authenticated': True})


@admin_bp.post('/logout')
def logout():
    session.pop('admin_authenticated', None)
    return '', 204


@admin_bp.get('/orders')
def orders():
    denied = require_admin()
    if denied: return denied
    records = Order.query.order_by(Order.created_at.desc()).all()
    return jsonify({'orders': [order_payload(order) for order in records]})


@admin_bp.patch('/orders/<int:order_id>')
def update_order(order_id):
    denied = require_admin()
    if denied: return denied
    order = db.session.get(Order, order_id)
    if not order: return jsonify({'error': 'Order not found.'}), 404
    status = (request.get_json(silent=True) or {}).get('status', '')
    if status not in {'pending', 'complete'}:
        return jsonify({'error': 'Invalid order status.'}), 400
    order.status = status
    db.session.commit()
    return jsonify({'order': order_payload(order)})


@admin_bp.patch('/tickets/<int:ticket_id>')
def update_ticket(ticket_id):
    denied = require_admin()
    if denied: return denied
    ticket = db.session.get(SupportTicket, ticket_id)
    if not ticket: return jsonify({'error': 'Ticket not found.'}), 404
    status = (request.get_json(silent=True) or {}).get('status', '')
    if status not in {'open', 'resolved'}: return jsonify({'error': 'Invalid ticket status.'}), 400
    ticket.status = status
    db.session.commit()
    return jsonify({'ticket': {'id': ticket.id, 'status': ticket.status}})


@admin_bp.get('/analytics')
def analytics():
    denied = require_admin()
    if denied: return denied
    orders = Order.query.filter(Order.status != 'cancelled').all()
    total_revenue = sum(order.total or order.quantity * 120 + 59 for order in orders)
    places = Counter((order.address.split(',')[-2].strip() if ',' in order.address else 'Unspecified') for order in orders if order.address)
    return jsonify({'totalOrders': len(orders), 'totalRevenue': total_revenue, 'averageCartValue': round(total_revenue / len(orders), 2) if orders else 0, 'salesByLocation': [{'location': location, 'orders': count} for location, count in places.most_common()]})


@admin_bp.post('/password/otp')
def request_otp():
    if not OTP_EMAIL:
        return jsonify({'error': 'Admin OTP recipient is not configured.'}), 503
    resend_key, resend_from = os.getenv('RESEND_API_KEY'), os.getenv('RESEND_FROM')
    if not all((resend_key, resend_from)):
        return jsonify({'error': 'Email is not configured. Set RESEND_API_KEY and RESEND_FROM to send the OTP.'}), 503
    code = f'{secrets.randbelow(1000000):06d}'
    try:
        response = requests.post(
            'https://api.resend.com/emails',
            headers={'Authorization': f'Bearer {resend_key}', 'Content-Type': 'application/json'},
            json={
                'from': resend_from,
                'to': [OTP_EMAIL],
                'subject': 'Your RAWR admin password OTP',
                'text': f'Your RAWR admin password OTP is {code}. It expires in 10 minutes.',
            },
            timeout=15,
        )
        response.raise_for_status()
    except requests.RequestException:
        return jsonify({'error': 'Unable to send the OTP email. Check the Resend configuration.'}), 502
    set_setting('otp_hash', generate_password_hash(code))
    set_setting('otp_expires', (datetime.utcnow() + timedelta(minutes=10)).isoformat())
    db.session.commit()
    return jsonify({'sentTo': OTP_EMAIL})


@admin_bp.post('/password')
def change_password():
    data = request.get_json(silent=True) or {}
    otp_hash, expiry = setting('otp_hash'), setting('otp_expires')
    if not otp_hash or not expiry or datetime.utcnow() > datetime.fromisoformat(expiry) or not check_password_hash(otp_hash, data.get('otp', '')):
        return jsonify({'error': 'Invalid or expired OTP.'}), 400
    password = data.get('password', '')
    if len(password) < 10: return jsonify({'error': 'Use a password with at least 10 characters.'}), 400
    set_setting('password_hash', generate_password_hash(password))
    set_setting('otp_hash', '')
    db.session.commit()
    return jsonify({'changed': True})
