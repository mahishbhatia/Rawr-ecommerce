import os
from pathlib import Path
from flask import Flask, send_from_directory
from flask_cors import CORS
from extensions import cache, celery, db

def init_celery(app):
    celery.conf.update(app.config)
    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context(): return self.run(*args, **kwargs)
    celery.Task = ContextTask

def create_app():
    backend_dir = Path(__file__).resolve().parent
    frontend_dist = backend_dir.parent / 'frontend' / 'dist'
    app = Flask(
        __name__,
        instance_path=str(backend_dir / 'instance'),
        static_folder=str(frontend_dist / 'assets'),
        static_url_path='/assets',
    )
    app.config.update(
        SQLALCHEMY_DATABASE_URI='sqlite:///' + os.path.join(app.instance_path, 'rawr.db'),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        CACHE_TYPE='RedisCache', CACHE_REDIS_URL=os.getenv('REDIS_URL', 'redis://localhost:6379/0'),
        CELERY_BROKER_URL=os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/1'),
        CELERY_RESULT_BACKEND=os.getenv('CELERY_RESULT_BACKEND', 'redis://localhost:6379/1'),
        SECRET_KEY=os.getenv('SECRET_KEY', 'change-this-secret-before-production'),
    )
    os.makedirs(app.instance_path, exist_ok=True)
    CORS(app); db.init_app(app); cache.init_app(app)
    init_celery(app)
    from routes.auth import auth_bp
    from routes.cart import cart_bp
    from routes.catalog import catalog_bp
    from routes.orders import orders_bp
    from routes.admin import admin_bp
    app.register_blueprint(catalog_bp, url_prefix='/api/catalog')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(cart_bp, url_prefix='/api/cart')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    @app.get('/')
    @app.get('/<path:path>')
    def serve_frontend(path=''):
        """Serve the Vue production build and support client-side routing."""
        requested_file = frontend_dist / path
        if path and requested_file.is_file():
            return send_from_directory(frontend_dist, path)
        return send_from_directory(frontend_dist, 'index.html')
    with app.app_context():
        from models.product import Product
        db.create_all()
        # SQLite does not add model fields to an existing table; keep local deployments compatible.
        columns = {row[1] for row in db.session.execute(db.text('PRAGMA table_info("order")'))}
        for name, ddl in {'customer_name': "VARCHAR(160) NOT NULL DEFAULT ''", 'phone': "VARCHAR(32) NOT NULL DEFAULT ''", 'address': "TEXT NOT NULL DEFAULT ''", 'total': 'INTEGER NOT NULL DEFAULT 0'}.items():
            if name not in columns:
                db.session.execute(db.text(f'ALTER TABLE "order" ADD COLUMN {name} {ddl}'))
        db.session.commit()
        product = Product.query.first()
        if not product:
            db.session.add(Product(name='Protein Choco Crunch', price=120))
            db.session.commit()
        elif product.name != 'Protein Choco Crunch' or product.price != 120:
            product.name = 'Protein Choco Crunch'
            product.price = 120
            db.session.commit()
    return app

app = create_app()

if __name__ == '__main__': app.run(debug=True, port=5000)
