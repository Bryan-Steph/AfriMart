from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    Phone= models.IntegerField()


class Shop(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name="myshops")
    Photo=models.FileField(upload_to='shop_owner_photos')
    Id_card =models.FileField(upload_to='shop_owner_IDs')
    Shop_proof = models.FileField(upload_to='shop_owner_proofs')
    def approve(self):#approving virtual shop creation
        Vendor.objects.create(
            user=self.user
        )

class Vendor(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE, related_name="my_vendor_profile")
    Fullname=models.CharField(max_length=50, default='fullname')
    Whatsapp_no=models.IntegerField(default=677777777)
    Additional_phone=models.IntegerField(default=677777777)
    Shop_name=models.CharField(max_length=50, default='shopname')
    Market_location=models.CharField(max_length=50, default='location')
    Stall_number=models.CharField(max_length=50, blank=True, null=True, default='stall')
    Shop_description=models.TextField(default='description')
    Profile_picture=models.ImageField(null=True, blank=True, upload_to="VendorImage")
    Category=models.JSONField(default=dict)

class Products(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name="myproducts")
    Title=models.CharField(max_length=50)
    Description=models.TextField()
    Category= models.CharField(max_length=50)
    Price=models.DecimalField(decimal_places=2, max_digits=20)
    Original_price=models.DecimalField(decimal_places=2, max_digits=20)
    Product_condition=models.CharField(max_length=50)
    Variants=models.JSONField()
    Inventory= models.JSONField()
    Status=models.CharField(max_length=50)
    Visibility=models.CharField(max_length=50)
    Tags=models.CharField(max_length=50)
    Collections=models.CharField(max_length=50)
    Type=models.CharField(max_length=50)

class ProductImages(models.Model):
    product=models.ForeignKey(Products, on_delete=models.CASCADE, related_name="images")
    Image=models.ImageField(upload_to='products')
# Create your models here.
