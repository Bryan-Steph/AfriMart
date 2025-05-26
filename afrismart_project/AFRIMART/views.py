from django.shortcuts import render,redirect, HttpResponse, reverse
from django.contrib.auth.models import User
from .models import Profile, Shop
from django.utils.timezone import now
from django.contrib.auth import login, logout,authenticate
from .functions import generate_email_comfirmation_code
from django.core.mail import send_mail
import json
from django.http import JsonResponse


def Afrimarthome(request):#home page
    return render(request, "index.html")


def verifyemail(request):
    if request.method == 'POST':
        try:
            destination=reverse('createshop')
            session_data=request.session.get('registrationcode')
            email=session_data['email']
            password=session_data['password']
            phone=session_data['phone']
            full_name=session_data['fullname']
            code=session_data['code']

            if request.POST['code']:
                user=User.objects.create_user(
                    email=email,
                    password=password,
                    username=f"{full_name}_{email}",
                    first_name=full_name
                )
                Profile.object.create(
                    user=user,
                    Phone=phone
                )
                send_mail(
                    "Verification Code to Complete account registration",  # subject
                    f"Congratulations {full_name} you have completed you registration now, discover how to expand your market scope AfriMart Plateform. Visit {request.build_absolute_uri(destination)}",
                    # message
                    'afrimmartonlinemarket@gmail.com',
                    [email],
                    fail_silently=False
                )
                return redirect('home')
        except:
            destination = reverse('registration')
            return HttpResponse(f"You have to pass through registration form page first of all <a href='{request.build_absolute_uri(destination)}'>Link</a>")
    return render(request, "verification_code.html")


def Afrimartaccountcreation(request):
    if request.method=='POST':
        email=request.POST['email']
        password=request.POST['password']
        phone=request.POST['phone']
        fullname=request.POST['fullname']
        try:
            User.objects.get(email=email)
            return render(request, "registration.html" , {"warning": "A User already exists with this account"})
        except:
            code=generate_email_comfirmation_code()
            try:
                send_mail(
                    "Verification Code to Complete account registration",  # subject
                    f"Hello, you've started Your account Creation on AfriMart online market Complete your registration by copying and pasting this secrete code {code}",  # message
                    'afrimmartonlinemarket@gmail.com',
                    [email],
                    fail_silently=False
                )
                request.session['registrationcode']={
                    "email":email,
                    "password":password,
                    "phone":phone,
                    "fullname":fullname,
                    "code":code
                }
                return redirect('mailverification')
            except:
                return render(request, "registration.html", {"error":"Could not send email, ensure your email exist and try again"})
    return render(request, "registration.html")

    
    
    
def Afrimartlogin(request):#login page
    if request.method=='POST':
        try:
            username=User.objects.get(email=request.POST['email']).username
        except:
            return render(request, "login.html", {"warning":"No account exist with this email"})
        user=authenticate(request, username=username,password=request.POST['password'])
        if user != None:
            login(request, user)
            return redirect('home')
        else:
            return render(request, "login.html", {"warning":"email or password is incorrect"})
        
            
    return render(request, "login.html")

def Afrimartcreateshop(request):
    if not request.user.is_authenticated:#ensuring user is logged in
        return HttpResponse("You must be loggedin before creating a virtual shop")
    if request.method=='POST':
        user=request.user
        Shop.objects.create(
            user=user,
            Photo=request.FILES['vendorPhoto'],
            Id_card=request.FILES['idCard'],
            Shop_proof=request.FILES['shopProof']
        )
        return render(request, "CreateShop.html", {"success":"success"})
    return render(request, "CreateShop.html")

def Afrimartapprovedvendor(request):
    return render(request, "approvedVendor.html")

def vendordashboard(request):
    return render(request, "vendorDashboard.html")