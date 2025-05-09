from django.urls import path
from . import views

urlpatterns = [
    path("",views.Afrimarthome, name="home"),
    path("registration/",views.Afrimartaccountcreation, name="registration"),
    path("login/",views.Afrimartlogin, name="login"),
    path("createshop/", views.Afrimartcreateshop, name="createshop"),
    path("approvedvendor/",views.Afrimartapprovedvendor, name="approvedvendor")
    
]