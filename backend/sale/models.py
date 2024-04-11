from django.db import models

# Create your models here.
class Banner(models.Model):
    title = models.CharField(max_length=256)
    image = models.ImageField(upload_to='banner', null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)