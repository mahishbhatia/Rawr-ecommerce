from extensions import celery, db
from models.order import Order

@celery.task
def process_order(order_id):
    """Background batch work placeholder for payment, inventory, and confirmation."""
    order = db.session.get(Order, order_id)
    if order:
        order.status = 'processing'
        db.session.commit()
    return {'order_id': order_id, 'status': 'processing'}
