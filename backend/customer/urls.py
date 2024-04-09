from django.urls import path, include
from customer import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'customers', views.CustomerViewSet, basename='customers')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls))
]