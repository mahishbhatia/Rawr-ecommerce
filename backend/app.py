import os
from pathlib import Path
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.middleware.proxy_fix import ProxyFix
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
    production = os.getenv('APP_ENV') == 'production'
    secret_key = os.getenv('SECRET_KEY')
    if production and not secret_key:
        raise RuntimeError('SECRET_KEY must be set in production.')
    database_url = os.getenv('DATABASE_URL')
    if database_url and database_url.startswith('postgres://'):
        database_url = database_url.replace('postgres://', 'postgresql+psycopg://', 1)
    elif database_url and database_url.startswith('postgresql://'):
        database_url = database_url.replace('postgresql://', 'postgresql+psycopg://', 1)
    database_url = database_url or 'sqlite:///' + os.path.join(os.getenv('DATABASE_PATH', app.instance_path), 'rawr.db')
    redis_url = os.getenv('REDIS_URL')
    app.config.update(
        SQLALCHEMY_DATABASE_URI=database_url,
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        CACHE_TYPE='RedisCache' if redis_url else 'SimpleCache', CACHE_REDIS_URL=redis_url,
        CELERY_BROKER_URL=os.getenv('CELERY_BROKER_URL', redis_url or 'memory://'),
        CELERY_RESULT_BACKEND=os.getenv('CELERY_RESULT_BACKEND', redis_url or 'cache+memory://'),
        task_always_eager=not bool(redis_url),
        SECRET_KEY=secret_key or os.urandom(32),
        SESSION_COOKIE_SECURE=production,
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE='Lax',
        PERMANENT_SESSION_LIFETIME=60 * 60 * 24 * 7,
        MAX_CONTENT_LENGTH=1 * 1024 * 1024,
    )
    os.makedirs(app.instance_path, exist_ok=True)
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)
    allowed_origins = [origin.strip() for origin in os.getenv('CORS_ORIGINS', '').split(',') if origin.strip()]
    if allowed_origins: CORS(app, origins=allowed_origins, supports_credentials=True)
    db.init_app(app); cache.init_app(app)
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

    @app.after_request
    def security_headers(response):
        response.headers.setdefault('X-Content-Type-Options', 'nosniff')
        response.headers.setdefault('X-Frame-Options', 'SAMEORIGIN')
        response.headers.setdefault('Referrer-Policy', 'strict-origin-when-cross-origin')
        if production: response.headers.setdefault('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
        return response

    @app.get('/api/<path:path>')
    def unknown_api(path):
        return jsonify({'error': 'API endpoint not found.'}), 404

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
        if database_url.startswith('sqlite:'):
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
