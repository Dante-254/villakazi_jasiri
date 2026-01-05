from django.test import TestCase, Client
from unittest.mock import patch

# Tests for auth-related views

class LogoutTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_logout_redirects_without_supabase(self):
        # If Supabase client cannot be initialized, logout should still redirect
        with patch('supabase.create_client', side_effect=Exception('no supabase')):
            resp = self.client.get('/logout/')
            self.assertEqual(resp.status_code, 302)
            self.assertEqual(resp.url, '/')

    def test_logout_redirects_normally(self):
        resp = self.client.get('/logout/')
        self.assertEqual(resp.status_code, 302)
        self.assertEqual(resp.url, '/')
