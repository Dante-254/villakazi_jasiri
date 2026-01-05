from django.contrib.auth.models import User
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured

class SupabaseAuthBackend:
    """Authenticate users against Supabase Auth and map them to Django Users.

    Behavior:
    - Accepts `username_or_email` and `password` (the login form accepts username or email).
    - If a username (no '@') is provided, list Supabase users and find one whose user_metadata.username matches.
    - Uses the Supabase client to sign in with email/password.
    - On success, get or create a Django User with username=email and set `is_staff` if the Supabase user has metadata role='admin' or 'staff'.
    """

    def authenticate(self, request, username=None, password=None):
        try:
            from supabase import create_client
        except Exception:
            raise ImproperlyConfigured('supabase package is required for SupabaseAuthBackend')

        supabase_url = getattr(settings, 'SUPABASE_URL', None)
        supabase_key = getattr(settings, 'SUPABASE_KEY', None)
        if not supabase_url or not supabase_key:
            return None

        supabase = create_client(supabase_url, supabase_key)

        # Determine email
        username_or_email = username
        email = None
        if username_or_email and '@' in username_or_email:
            email = username_or_email
        else:
            # try to find a user with matching username in user_metadata
            try:
                # Requires service role key
                users_list = supabase.auth.admin.list_users()
                for u in users_list.data:
                    meta = u.get('user_metadata') or {}
                    if meta.get('username') == username_or_email or u.get('email') == username_or_email:
                        email = u.get('email')
                        break
            except Exception:
                # if admin list_users not available, fallback to assume username is an email
                email = username_or_email

        if not email:
            return None

        # Sign in with password
        try:
            # Using supabase.auth.sign_in_with_password (newer API)
            resp = supabase.auth.sign_in_with_password({"email": email, "password": password})
            user_data = getattr(resp, 'user', None) if hasattr(resp, 'user') else resp.get('user') if isinstance(resp, dict) else None
            if not user_data:
                # older client
                json_data = getattr(resp, 'json', None)
                if json_data:
                    user_data = json_data().get('user')
        except Exception:
            return None

        if not user_data:
            return None

        user_email = user_data.get('email')
        if not user_email:
            return None

        django_user, created = User.objects.get_or_create(username=user_email, defaults={'email': user_email})

        # Set staff status based on metadata (if present)
        meta = user_data.get('user_metadata') or {}
        role = meta.get('role') or meta.get('roles')
        if role in ('admin', 'staff', 'superuser'):
            django_user.is_staff = True
            django_user.is_superuser = True if role == 'superuser' else django_user.is_superuser
            django_user.save()

        return django_user

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
