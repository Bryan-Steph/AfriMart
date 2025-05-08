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
# Create your models here.
