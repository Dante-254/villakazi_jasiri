import logging
from django.contrib.auth.models import User
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured

logger = logging.getLogger(__name__)

class SupabaseAuthBackend:
    """Authenticate users against Supabase Auth and map them to Django Users."""

    def authenticate(self, request, username=None, password=None):
        try:
            from supabase import create_client
        except ImportError:
            raise ImproperlyConfigured('supabase package is required for SupabaseAuthBackend')

        supabase_url = getattr(settings, 'SUPABASE_URL', None)
        supabase_key = getattr(settings, 'SUPABASE_KEY', None)
        if not supabase_url or not supabase_key:
            logger.warning("Supabase URL or key not set in settings")
            return None

        supabase = create_client(supabase_url, supabase_key)

        # Determine email
        email = None
        if username and '@' in username:
            email = username
        else:
            # Only attempt username lookup if using a service_role key
            if 'service_role' in supabase_key.lower():
                try:
                    users_list = supabase.auth.admin.list_users()
                    for u in users_list.data:
                        meta = u.get('user_metadata') or {}
                        if meta.get('username') == username or u.get('email') == username:
                            email = u.get('email')
                            break
                except Exception as e:
                    logger.warning(f"Failed to list users for username lookup: {e}")
                    email = username  # fallback to assuming it's an email
            else:
                email = username  # anon key, just treat as email

        if not email:
            logger.warning(f"Could not determine email for username '{username}'")
            return None

        # Sign in with password
        try:
            resp = supabase.auth.sign_in_with_password({"email": email, "password": password})
            # Supabase response can vary by client version
            user_data = getattr(resp, 'user', None) if hasattr(resp, 'user') else resp.get('user') if isinstance(resp, dict) else None
        except Exception as e:
            logger.warning(f"Supabase sign-in failed for {email}: {e}")
            return None

        if not user_data or not user_data.get('email'):
            logger.warning(f"Supabase authentication returned no user for {email}")
            return None

        user_email = user_data.get('email')
        django_user, created = User.objects.get_or_create(username=user_email, defaults={'email': user_email})

        # Set staff/superuser based on metadata
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
