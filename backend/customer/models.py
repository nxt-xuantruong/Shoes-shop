from django.db import models
from hashlib import md5
# Create your models here.

class Customer(models.Model):
    name = models.CharField(max_length=250)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=250,null=True)
    email= models.EmailField(max_length=250)
    password=models.CharField(max_length=128)
    
    def save(self, *args, **kwargs):
        self.password = md5(self.password.encode()).hexdigest()
        super().save(*args, **kwargs)