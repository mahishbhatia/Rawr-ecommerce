from flask import Blueprint, jsonify, request
from extensions import db
from models.order import Order
from tasks.order_tasks import process_order

orders_bp = Blueprint('orders', __name__)

@orders_bp.post('/')
def create_order():
    data = request.get_json(silent=True) or {}
    if not data.get('email'): return jsonify({'error': 'email is required'}), 400
    order = Order(email=data['email'], quantity=max(1, int(data.get('quantity', 1))))
    db.session.add(order); db.session.commit()
    process_order.delay(order.id)
    return jsonify({'id': order.id, 'status': order.status}), 202
