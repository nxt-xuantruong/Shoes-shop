from django.db import models
from product.models import Product
from customer.models import Customer
# Create your models here.
class Order(models.Model):
    name = models.CharField(max_length=250,  blank=True)
    email = models.EmailField( blank=True)
    address = models.CharField(max_length=250,  blank=True)
    phone = models.CharField(max_length=12, null=True, blank=True)
    note = models.CharField(max_length=250, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)
    customer=models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order,related_name='items',on_delete=models.CASCADE)
    product = models.ForeignKey(Product,related_name='order_items',on_delete=models.CASCADE)
    size = models.IntegerField(null=True, blank=True)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)