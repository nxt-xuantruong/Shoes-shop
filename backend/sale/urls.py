from django.urls import path, include
from rest_framework_nested.routers import NestedSimpleRouter
from rest_framework.routers import DefaultRouter


from sale import views

router = DefaultRouter()
router.register(r'banners', views.BannerViewSet, basename='banners')



# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),

]
