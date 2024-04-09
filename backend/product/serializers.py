from product.models import Category, Product, ProductImage
from rest_framework import serializers
from django.core.files.uploadedfile import InMemoryUploadedFile



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'date', 'parent_id']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'product']

class ProductSerializer(serializers.ModelSerializer):
    images= ProductImageSerializer(many=True, required=False)
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'discount','description', 'thumbnail', 'date', 'category_id', 'number','images']

    def to_internal_value(self, data):
        data = data.copy()
        try :
            thumbnail = data['thumbnail']
            if not isinstance(thumbnail, InMemoryUploadedFile): 
                 del data['thumbnail']
        except KeyError: 
            print ('thumbnail not found')

        try :
            images = data['images']
            del data['images']
            result = super().to_internal_value(data)
            id = self.instance.id if self.instance else None
            alternative_images = []
            for image in images:
                if id is not None and isinstance(image, InMemoryUploadedFile):
                    alternative_images.append({
                        'product_id': id,
                        'image': image
                    })
                elif isinstance(image, InMemoryUploadedFile):
                    alternative_images.append({
                        'image': image
                    })
            if len(alternative_images) > 0:
                result["images"] = alternative_images;        

        except KeyError: 
            print ('images not found')
        return result
        
    
    def update(self, instance, validated_data):
        images = validated_data.get('images');
        if images is not None:
            created_images = ProductImage.objects.bulk_create([ProductImage(**image) for image in images])
            instance.images.set(created_images)
            del validated_data['images'];
        return super().update(instance, validated_data)
    
    def create(self, validated_data):
        images = validated_data.get('images');
        if images is not None:
            del validated_data['images'];
        result =  super().create(validated_data)
        if images is not None:
            created_images = ProductImage.objects.bulk_create([ProductImage(**{'image': image['image'], 'product': result}) for image in images])
            result.images.set(created_images)
        
        return result


