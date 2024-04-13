from django.urls import path, include
from rest_framework.routers import DefaultRouter


from order import views

router = DefaultRouter()
router.register(r'orders', views.OrderViewSet, basename='orders')
router.register(r'orderitems', views.OrderItemViewSet, basename='orderitems')


# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]