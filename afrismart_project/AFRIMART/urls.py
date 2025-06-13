from django.urls import path
from . import views

urlpatterns = [
    path("",views.Afrimarthome, name="home"),


    path("registration/",views.Afrimartaccountcreation, name="registration"),
    path("emailverifricationcode/", views.verifyemail, name="mailverification"),
    path("login/",views.Afrimartlogin, name="login"),


    path("forgotpassword/", views.forgot_password, name="forgotpassword"),
    path("ressetpassword/", views.resetpassword, name="ressetpassword"),


    path("createshop/", views.Afrimartcreateshop, name="createshop"),
    path("approvedvendor/",views.Afrimartapprovedvendor, name="approvedvendor"),
    path('vendordashboard/',views.vendordashboard, name="dashboard"),
    path('PUvendorinfo/<int:id>/', views.PUvendorinfo, name="PUinfo"),
    path("market/", views.marketplace, name="market")
    
]