from django.urls import path, include
from rest_framework_nested.routers import NestedSimpleRouter
from rest_framework.routers import DefaultRouter


from product import views

router = DefaultRouter()
router.register(r'products', views.ProductViewSet, basename='products')
router.register(r'category', views.CategoryViewSet, basename='category')

products_router = NestedSimpleRouter(router, r'products', lookup='products')
products_router.register(r'images', views.ProductImageViewSet, basename='products-images')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    path(r'', include(products_router.urls)),
]
