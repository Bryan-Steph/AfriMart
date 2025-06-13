from django.shortcuts import render, redirect, HttpResponse, reverse
from django.contrib.auth.models import User
from .models import Profile, Shop, Vendor
from django.utils.timezone import now
from django.contrib.auth import login, logout, authenticate
from .functions import generate_email_comfirmation_code
from django.core.mail import send_mail
import json
from django.http import JsonResponse


def Afrimarthome(request):  # home page
    return render(request, "index.html")


def verifyemail(request):
    if request.method == 'POST':
        print('post')
        try:
            destination = reverse('createshop')
            session_data = request.session['registrationcode']
            email = session_data['email']
            password = session_data['password']
            phone = session_data['phone']
            full_name = session_data['fullname']
            code = session_data['code']
            # print('code')

            if request.POST['code'] == code:
                print("code is correct")
                user = User.objects.create_user(
                    email=email,
                    password=password,
                    username=f"{full_name}_{email}",
                    first_name=full_name
                )
                print("user created")
                Profile.objects.create(
                    user=user,
                    Phone=phone
                )
                send_mail(
                    "Verification Code to Complete account registration",  # subject
                    f"Congratulations {full_name} you have completed you registration now, discover how to expand your market scope AfriMart Plateform. Visit {request.build_absolute_uri(destination)}",
                    'afrimartonlinemarket@gmail.com',
                    [email],
                    fail_silently=False
                )
                return redirect('home')
        except:
            destination = reverse('registration')
            return HttpResponse(
                f"You have to pass through registration form page first of all <a href='{request.build_absolute_uri(destination)}'>Link</a>")
    return render(request, "verification_code.html")


def Afrimartaccountcreation(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        phone = request.POST['phone']
        fullname = request.POST['fullname']
        try:
            User.objects.get(email=email)
            print("exist")
            return render(request, "registration.html", {"warning": "A User already exists with this email account"})
        except:
            try:
                code = generate_email_comfirmation_code()
                print(email)
                send_mail(
                    "Verification Code to Complete account registration",  # subject
                    f"Hello, you've started Your account Creation on AfriMart online market Complete your registration by copying and pasting this secrete code {code}",
                    'afrimartonlinemarket@gmail.com',
                    [email],
                    fail_silently=False
                )
                print('mail')
                request.session['registrationcode'] = {
                    "email": email,
                    "password": password,
                    "phone": phone,
                    "fullname": fullname,
                    "code": code
                }
                print("code sent")
                return redirect('mailverification')
            except:
                return render(request, "registration.html",
                              {"error": "Could not send email, ensure your email exist and try again"})
    return render(request, "registration.html")


def Afrimartlogin(request):  # login page
    if request.method == 'POST':
        try:
            username = User.objects.get(email=request.POST['email']).username
        except:
            return render(request, "login.html", {"warning": "No account exist with this email"})
        user = authenticate(request, username=username, password=request.POST['password'])
        print(request.POST['email'])
        print(request.POST['password'])
        if user != None:
            login(request, user)
            return redirect('home')
        else:
            return render(request, "login.html", {"warning": "email or password is incorrect"})

    return render(request, "login.html")


def forgot_password(request):
    if request.method == 'POST':
        try:
            resset = request.session['ressetcode']
            code = request.POST['code']
            if code == resset['code']:
                print("correct")
                request.session['validcode'] = True
                return redirect('ressetpassword')
            else:
                print("wrong")
                return render(request, "verification_code.html", {"warning": "The code you entered is incorrect"})
        except:
            print([i.email for i in User.objects.all()])
            try:
                print(request.POST['email'])
                User.objects.get(email=request.POST['email'])
                print(request.POST['email'])
                code = generate_email_comfirmation_code()
                send_mail(
                    "Password reset code",  # subject
                    f"Hello, you are requesting to reset your password on Afrimart . Use this code to confirm your identity as email owner {code}",
                    'afrimartonlinemarket@gmail.com',
                    [request.POST['email']],
                    fail_silently=False
                )
                print("mail for verification")
                request.session['ressetcode'] = {
                    "code": code,
                    "email": request.POST['email']
                }
                return render(request, "verification_code.html")
            except:
                print("user no dey")
                return render(request, "forgot_password.html", {"warning": 'No account exists with this email'})
    print("redirected")
    return render(request, "forgot_password.html")


def resetpassword(request):
    try:
        if request.session['validcode'] != True:
            return HttpResponse("You are not authorized on this page")
    except:
        return HttpResponse("You are not authorized on this page")
    if request.method == 'POST':
        reset = request.session['ressetcode']
        email = reset['email']
        user = User.objects.get(email=email)
        user.set_password(request.POST['password'])
        user.save()
        send_mail(
            "Password Reset Success",  # subject
            f"Hello {user.first_name} your password has been succesfully reset. Reach out to us on this email in case of any troubles or worries",
            'afrimartonlinemarket@gmail.com',
            [email],
            fail_silently=False
        )
        request.session['validcode'] = False
        return redirect('home')
    return render(request, "resetpassword.html")


def Afrimartcreateshop(request):
    if not request.user.is_authenticated:  # ensuring user is logged in
        return HttpResponse("You must be loggedin before creating a virtual shop")
    if request.method == 'POST':
        user = request.user
        Shop.objects.create(
            user=user,
            Photo=request.FILES['vendorPhoto'],
            Id_card=request.FILES['idCard'],
            Shop_proof=request.FILES['shopProof']
        )
        return render(request, "CreateShop.html", {"success": "success"})
    return render(request, "CreateShop.html")


def Afrimartapprovedvendor(request):
    return render(request, "approvedVendor.html")


def vendordashboard(request):
    return render(request, "vendorDashboard.html")

def PUvendorinfo(request, id=1):
    if not request.user.is_authenticated:
        return redirect('login')
    else:
        try:
            vendor = Vendor.objects.get(id=id)
            if vendor.user!=request.user:
                return HttpResponse('You are not authorised to be on this page')
            else:
                is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
                if is_ajax:
                    if request.method == 'POST':
                        data = json.load(request).get('content')  # collecting message content
                        print(data)
                        Vendor.objects.create(
                            user=request.user,
                            Fullname=data['fullName'],
                            Whatsapp_no=data['whatsapp'],
                            Additional_phone=data['phone'],
                            Shop_name=data['shopName'],
                            Market_location=data['marketLocation'],
                            Stall_number=data['stallNumber'],
                            Shop_description=data['shopDescription'],
                            Profile_picture=data['profileImage']
                        )
                        return JsonResponse({'done': 'done'})
                return render(request, "PUvendorInfo.html")
        except:
            return HttpResponse('This page does not exist')

    # return render(request, "PUvendorInfo.html")