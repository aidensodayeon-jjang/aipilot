from django.conf import settings
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.local')
django.setup()
from django.test import Client
c = Client()
try:
    response = c.get('/api/students/')
    print(response.status_code)
except Exception as e:
    import traceback
    traceback.print_exc()
