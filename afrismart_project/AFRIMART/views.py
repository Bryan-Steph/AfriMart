from django.shortcuts import render,redirect, HttpResponse
from django.contrib.auth.models import User
from .models import Profile, Shop
from django.utils.timezone import now
from django.contrib.auth import login, logout,authenticate


def Afrimarthome(request):#home page
    return render(request, "index.html")

def Afrimartaccountcreation(request):
    if request.method=='POST':
        try:
            User.objects.get(email=request.POST['email'])
            return render(request, "registration.html", context={"warning":"An account already exists with this email"})
        except:
            username=f"{request.POST['fullname']} _{request.POST['email']}"
            #creating user
            user = User.objects.create_user(
                password=request.POST['password'],
                first_name=request.POST['fullname'],
                email=request.POST['email'],
                username=username
            )
            Profile.objects.create(
                user=user,
                Phone=request.POST['phone']
            )
            #login created user
            login(request, user)
            return redirect('home')
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