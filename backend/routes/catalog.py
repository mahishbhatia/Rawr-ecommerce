from flask import Blueprint, jsonify
from extensions import cache
from models.product import Product

catalog_bp = Blueprint('catalog', __name__)

@catalog_bp.get('/home')
@cache.cached(timeout=300)
def home():
    product = Product.query.first()
    return jsonify({
        'product': {'name': 'Protein Choco Crunch', 'price': '₹120'},
        'nutrition': [
            {'value': '15g', 'label': 'Protein', 'detail': 'In every 60g bar'},
            {'value': '272', 'label': 'Energy', 'detail': 'kcal per bar'},
            {'value': '0g', 'label': 'Added sugar', 'detail': 'Naturally occurring only'},
            {'value': '60g', 'label': 'Bar weight', 'detail': 'Convenient everyday fuel'}],
        'reviews': [
            {'name': 'Anaya S.', 'role': 'CrossFit Coach', 'quote': 'The first bar my clients actually enjoy and still trust before training.'},
            {'name': 'Karan M.', 'role': 'Product Designer', 'quote': 'No sugar crash, clean focus, and the crunch is unreal.'},
            {'name': 'Rhea P.', 'role': 'Marathon Runner', 'quote': 'I keep one in every bag. It tastes real and sits light.'}]})
