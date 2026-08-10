from datetime import datetime
from extensions import db

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    status = db.Column(db.String(30), nullable=False, default='queued')
    customer_name = db.Column(db.String(160), nullable=False, default='')
    phone = db.Column(db.String(32), nullable=False, default='')
    address = db.Column(db.Text, nullable=False, default='')
    total = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
