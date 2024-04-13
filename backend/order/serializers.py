from order.models import Order,OrderItem
from rest_framework import serializers


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'name', 'email', 'address', 'note','date','paid', 'customer', 'phone']


class OrderItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OrderItem
        fields = ['id','order', 'product', 'price', 'quantity','size']