from uuid import uuid4
from django.db import models
from django.utils import timezone

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255)
    slug=models.CharField(max_length=300)
    date = models.DateTimeField(default=timezone.now)
    parent_id=models.IntegerField(default=0)

class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False, unique=True)
    name = models.CharField(max_length=250)
    price = models.FloatField(default=0)
    description=models.TextField(null=True, blank=True)
    thumbnail=models.FileField(upload_to='thumbnail', null=True, blank=True)
    discount=models.IntegerField(default=0)
    number=models.IntegerField(default=0)
    date = models.DateTimeField(default=timezone.now)
    category_id = models.ForeignKey(
        Category, on_delete=models.CASCADE, null=True, blank=True)

class ProductImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False, unique=True)
    image= models.FileField(upload_to='productImage')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images', null=True, blank=True)