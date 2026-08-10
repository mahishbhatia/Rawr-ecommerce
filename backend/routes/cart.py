from flask import Blueprint, jsonify, request, session
from extensions import db
from models.cart import CartItem
from models.user import User

cart_bp = Blueprint('cart', __name__)

def current_email():
    user_id = session.get('user_id')
    user = db.session.get(User, user_id) if user_id else None
    return user.email if user else None

@cart_bp.get('/')
def list_items():
    email = current_email()
    if not email: return jsonify({'items': []})
    items = CartItem.query.filter_by(email=email).all()
    return jsonify({'items': [{'id': item.id, 'name': item.product_name, 'quantity': item.quantity, 'price': 120} for item in items]})

@cart_bp.post('/')
def add_item():
    email = current_email()
    if not email: return jsonify({'error': 'Please sign in to add items to your cart.'}), 401
    item = CartItem.query.filter_by(email=email, product_name='Protein Choco Crunch').first()
    if item: item.quantity += max(1, int((request.get_json(silent=True) or {}).get('quantity', 1)))
    else: item = CartItem(email=email); db.session.add(item)
    db.session.commit()
    return list_items(), 201

@cart_bp.delete('/<int:item_id>')
def remove_item(item_id):
    email = current_email()
    item = CartItem.query.filter_by(id=item_id, email=email).first_or_404()
    db.session.delete(item); db.session.commit()
    return '', 204

@cart_bp.patch('/<int:item_id>')
def update_item(item_id):
    email = current_email()
    item = CartItem.query.filter_by(id=item_id, email=email).first_or_404()
    quantity = int((request.get_json(silent=True) or {}).get('quantity', item.quantity))
    if quantity < 1:
        db.session.delete(item)
    else:
        item.quantity = quantity
    db.session.commit()
    return list_items()
