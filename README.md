# RAWR

Flask + Vue storefront with SQLite persistence, Redis-backed caching, and Celery batch jobs.

## Free production setup (Render + Supabase + Resend)

The included `render.yaml` deploys the site as a Render **Free** web service. It uses a free
Supabase Postgres database and Resend's HTTPS email API, so no paid Render database or SMTP
service is required.

1. Create a free Supabase project and copy its Postgres connection string (use the connection
   pooler string if Supabase recommends it for your network).
2. Create a Resend account, verify a sending domain, create an API key, and choose the verified
   sender address for `RESEND_FROM` (for example, `RAWR <orders@yourdomain.com>`).
3. Push this repository to GitHub, then create a Render Blueprint from it. In Render, enter:
   `DATABASE_URL`, `ADMIN_INITIAL_PASSWORD`, `ADMIN_OTP_EMAIL`, `RESEND_API_KEY`, and
   `RESEND_FROM`. Render generates `SECRET_KEY` automatically.
4. In GitHub repository settings, add an Actions secret named `RENDER_APP_URL` containing the
   Render URL or your HTTPS custom domain, with no trailing slash. The included workflow pings
   `/healthz` every ten minutes.
5. Add your GoDaddy domain in Render's Custom Domains page, then add the DNS records Render
   displays at GoDaddy. Keep the site URL HTTPS before setting `RENDER_APP_URL`.

The scheduled ping is best suited to a public GitHub repository. In a private repository it
uses GitHub Actions minutes and can exceed the free allowance; scheduled workflows can also be
delayed. For reliable always-on production availability, use a paid Render instance or an
external uptime monitor that fits your plan.

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
