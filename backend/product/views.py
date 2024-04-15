from rest_framework import viewsets
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from oauth2_provider.contrib.rest_framework.permissions import TokenMatchesOASRequirements
from oauth2_provider.contrib.rest_framework.authentication import OAuth2Authentication
from rest_framework.response import Response
from customPagination.pagination import CustomPagination

from product.models import Category, Product, ProductImage
from product.serializers import CategorySerializer, ProductSerializer, ProductImageSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """
    This ViewSet automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = [OAuth2Authentication]
    permission_classes = [TokenMatchesOASRequirements]
    required_alternate_scopes = {
        # "GET": [["product:read"]],
        "POST": [["product:create"]],
        "PUT":  [["product:update"]],
        "DELETE": [["product:delete"]],
    }

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        if request.FILES and len(request.FILES) > 0:
            files = request.FILES.getlist("images[]");
            # files_list = [value for value in request.FILES.dict().values()]
            del data['images[]'];
            data['images'] = files
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()
        if request.FILES and len(request.FILES) > 0:
            files = request.FILES.getlist("images[]");
            # files_list = [value for value in request.FILES.dict().values()]
            del data['images[]'];
            data['images'] = files
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def get_permissions(self):
        """Returns the permission based on the type of action"""

        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        return [IsAuthenticated()]
    
    
class CategoryViewSet(viewsets.ModelViewSet):
    """
    This ViewSet automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = CustomPagination
    authentication_classes = [OAuth2Authentication]
    permission_classes = [TokenMatchesOASRequirements]
    required_alternate_scopes = {
        # "GET": [["category:read"]],
        "POST": [["category:create"]],
        "PUT":  [["category:update"]],
        "DELETE": [["category:delete"]],
    }

    def get_permissions(self):
        """Returns the permission based on the type of action"""

        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        return [IsAuthenticated()]

class ProductImageViewSet(viewsets.ModelViewSet):
    """
    This ViewSet automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    authentication_classes = [OAuth2Authentication]
    permission_classes = [TokenMatchesOASRequirements]
    required_alternate_scopes = {
        # "GET": [["category:read"]],
        "POST": [["product:create"]],
        "PUT":  [["product:update"]],
        "DELETE": [["product:delete"]],
    }

    def get_permissions(self):
        """Returns the permission based on the type of action"""

        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        return [IsAuthenticated()]


             

