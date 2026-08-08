from flask import Blueprint, jsonify
from extensions import cache
from models.product import Product

catalog_bp = Blueprint('catalog', __name__)

@catalog_bp.get('/home')
@cache.cached(timeout=300)
def home():
    product = Product.query.first()
    return jsonify({
        'product': {'name': product.name, 'price': f'₹{product.price}'},
        'nutrition': [
            {'value': '20g', 'label': 'Protein', 'detail': 'High-quality whey per bar'},
            {'value': '220', 'label': 'Calories', 'detail': 'Balanced fuel for active days'},
            {'value': '6', 'label': 'Natural ingredients', 'detail': 'Every ingredient has a purpose'},
            {'value': '0g', 'label': 'Added sugar', 'detail': 'Sweetened naturally'}],
        'reviews': [
            {'name': 'Anaya S.', 'role': 'CrossFit Coach', 'quote': 'The first bar my clients actually enjoy and still trust before training.'},
            {'name': 'Karan M.', 'role': 'Product Designer', 'quote': 'No sugar crash, clean focus, and the crunch is unreal.'},
            {'name': 'Rhea P.', 'role': 'Marathon Runner', 'quote': 'I keep one in every bag. It tastes real and sits light.'}]})
