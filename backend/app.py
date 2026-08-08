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
    )
    os.makedirs(app.instance_path, exist_ok=True)
    CORS(app); db.init_app(app); cache.init_app(app)
    init_celery(app)
    from routes.catalog import catalog_bp
    from routes.orders import orders_bp
    app.register_blueprint(catalog_bp, url_prefix='/api/catalog')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')

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
        if not Product.query.first(): db.session.add(Product(name='RAWR Protein Choco Crunch', price=249)); db.session.commit()
    return app

app = create_app()

if __name__ == '__main__': app.run(debug=True, port=5000)
