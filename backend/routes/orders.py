import os
from flask import Blueprint, jsonify, request, session
from extensions import db
from models.order import Order
from models.user import User
from models.admin import SupportTicket
from tasks.order_tasks import process_order

orders_bp = Blueprint('orders', __name__)
SHIPPING_FEE = 59

def cart_quantity():
    from models.cart import CartItem
    user = db.session.get(User, session.get('user_id'))
    if not user:
        return None, 0
    return user, sum(item.quantity for item in CartItem.query.filter_by(email=user.email).all())

@orders_bp.post('/checkout/create')
def create_checkout():
    user, quantity = cart_quantity()
    if not user: return jsonify({'error': 'Please sign in before checkout.'}), 401
    if not quantity: return jsonify({'error': 'Your cart is empty.'}), 400
    key_id, key_secret = os.getenv('RAZORPAY_KEY_ID'), os.getenv('RAZORPAY_KEY_SECRET')
    if not key_id or not key_secret:
        return jsonify({'error': 'Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to the server environment.'}), 503
    try:
        import razorpay
        gateway_order = razorpay.Client(auth=(key_id, key_secret)).order.create({'amount': (quantity * 120 + SHIPPING_FEE) * 100, 'currency': 'INR', 'receipt': f'rawr-{user.id}-{quantity}'})
    except Exception:
        return jsonify({'error': 'Unable to start Razorpay checkout. Please try again.'}), 502
    return jsonify({'keyId': key_id, 'orderId': gateway_order['id'], 'amount': gateway_order['amount'], 'currency': 'INR', 'quantity': quantity, 'shipping': SHIPPING_FEE})

@orders_bp.post('/checkout/verify')
def verify_checkout():
    user, quantity = cart_quantity()
    if not user or not quantity: return jsonify({'error': 'Your checkout session has expired.'}), 400
    data = request.get_json(silent=True) or {}
    phone, address = data.get('phone', '').strip(), data.get('address', '').strip()
    if len(phone) < 10 or len(address) < 12: return jsonify({'error': 'Please provide a valid mobile number and delivery address.'}), 400
    key_secret = os.getenv('RAZORPAY_KEY_SECRET')
    try:
        import razorpay
        razorpay.Client(auth=(os.getenv('RAZORPAY_KEY_ID'), key_secret)).utility.verify_payment_signature({'razorpay_order_id': data['razorpay_order_id'], 'razorpay_payment_id': data['razorpay_payment_id'], 'razorpay_signature': data['razorpay_signature']})
    except Exception:
        return jsonify({'error': 'Payment verification failed.'}), 400
    customer_name = ' '.join(address.split(',', 1)[0].split())
    order = Order(email=user.email, quantity=quantity, status='pending', phone=phone, address=address, customer_name=customer_name, total=quantity * 120 + SHIPPING_FEE)
    db.session.add(order)
    from models.cart import CartItem
    CartItem.query.filter_by(email=user.email).delete()
    db.session.commit()
    return jsonify({'id': order.id, 'status': order.status, 'shipping': SHIPPING_FEE})

@orders_bp.post('/')
def create_order():
    data = request.get_json(silent=True) or {}
    email = data.get('email')
    if not email: return jsonify({'error': 'email is required'}), 400
    quantity = max(1, int(data.get('quantity', 1)))
    order = Order(email=email, quantity=quantity, status='pending', customer_name=data.get('customerName', ''), phone=data.get('phone', ''), address=data.get('address', ''), total=quantity * 120 + SHIPPING_FEE)
    db.session.add(order); db.session.commit()
    try: process_order.delay(order.id)
    except Exception: order.status = 'processing'; db.session.commit()
    return jsonify({'id': order.id, 'status': order.status}), 202

@orders_bp.get('/history')
def history():
    user = db.session.get(User, session.get('user_id'))
    if not user: return jsonify({'error': 'Please sign in to view order history.'}), 401
    email = user.email
    orders = Order.query.filter_by(email=email).order_by(Order.created_at.desc()).all()
    return jsonify({'orders': [{'id': order.id, 'quantity': order.quantity, 'status': order.status, 'phone': order.phone, 'address': order.address, 'total': order.total, 'createdAt': order.created_at.isoformat(), 'tickets': [{'id': ticket.id, 'message': ticket.message, 'status': ticket.status, 'createdAt': ticket.created_at.isoformat()} for ticket in SupportTicket.query.filter_by(order_id=order.id, email=email).order_by(SupportTicket.created_at.desc()).all()]} for order in orders]})

@orders_bp.post('/<int:order_id>/tickets')
def raise_ticket(order_id):
    user = db.session.get(User, session.get('user_id'))
    order = db.session.get(Order, order_id)
    if not user or not order or order.email != user.email: return jsonify({'error': 'Order not found.'}), 404
    message = (request.get_json(silent=True) or {}).get('message', '').strip()
    if len(message) < 8: return jsonify({'error': 'Please describe the issue in at least 8 characters.'}), 400
    ticket = SupportTicket(order_id=order.id, email=user.email, message=message)
    db.session.add(ticket); db.session.commit()
    return jsonify({'ticket': {'id': ticket.id, 'message': ticket.message, 'status': ticket.status, 'createdAt': ticket.created_at.isoformat()}}), 201
