# RAWR

Flask + Vue storefront with SQLite persistence, Redis-backed caching, and Celery batch jobs.

## Structure

```
frontend/src/components/  Vue UI components
backend/routes/           Flask API blueprints
backend/models/           SQLite / SQLAlchemy models
backend/app.py            Flask app, Redis cache, Celery configuration
```

## Run

1. Start Redis: `redis-server`
2. Build the site once: `cd frontend; npm install; npm run build`
3. Backend: `cd backend; python -m pip install -r requirements.txt; python app.py`
4. Worker: `cd backend; celery -A app:celery worker --loglevel=info`

Open `http://127.0.0.1:5000` after starting Flask. For live Vue edits, run `cd frontend; npm run dev` and open the Vite URL instead.
