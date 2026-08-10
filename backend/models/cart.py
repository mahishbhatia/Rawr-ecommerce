from extensions import db

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, index=True)
    product_name = db.Column(db.String(120), nullable=False, default='Protein Choco Crunch')
    quantity = db.Column(db.Integer, nullable=False, default=1)
