from django.contrib import admin
from django.contrib.auth.models import User
from .models import *

admin.site.register(Profile)
admin.site.register(Shop)

# Register your models here.
