# Supabase Integration Setup

This project supports using a Supabase Postgres database and Supabase Auth. Steps to enable:

1. Install dependencies:

   - `pip install -r requirements.txt` (includes `psycopg2-binary`, `supabase`, `python-dotenv`)

2. Add environment variables (example `.env`):

   # SUPABASE core

   SUPABASE_URL=<your-supabase-url>
   SUPABASE_KEY=<your-supabase-key>

   # Supabase Postgres (if using as DB)

   SUPABASE_DB_HOST=<db-host>
   SUPABASE_DB_NAME=<db-name>
   SUPABASE_DB_USER=<db-user>
   SUPABASE_DB_PASSWORD=<db-pass>
   SUPABASE_DB_PORT=5432

**Important:** Do NOT commit real secrets into version control. Use a local `.env` (ignored by git) or your deployment environment's secret manager to store sensitive keys.

3. Start with the local sqlite DB while developing. When ready, set the `SUPABASE_DB_NAME` and related env vars to switch the database to Supabase Postgres.

4. The Supabase auth backend is scaffolded at `main/auth_backends.py`. Implement authentication logic using `supabase-py` and update `login_view`/`logout_view` in `main/views.py`.

5. Run migrations:

   - `python manage.py migrate`

6. Create an initial Django superuser (optional while using Django admin):
   - `python manage.py createsuperuser`

Notes:

- This repository currently keeps Django auth as a fallback; full replacement with Supabase Auth requires additional implementation in the auth backend and admin protections.
