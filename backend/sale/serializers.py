from sale.models import Banner
from rest_framework import serializers
from django.core.files.uploadedfile import InMemoryUploadedFile

class BannerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Banner
        fields = ['id','title', 'image', 'date']
