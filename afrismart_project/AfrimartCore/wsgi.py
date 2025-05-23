"""
WSGI config for AfrimartCore project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

# import os

# from django.core.wsgi import get_wsgi_application

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "afrismart_project.AfrimartCore.settings")

# application = get_wsgi_application()

# app=application


import os
import sys

# Add the root project directory to sys.path so Python can find AFRIMART app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from django.core.wsgi import get_wsgi_application

# Point to your settings module (make sure it's correct)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'AfrimartCore.settings')

application = get_wsgi_application()

app=application