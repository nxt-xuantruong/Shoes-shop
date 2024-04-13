from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from oauth2_provider.contrib.rest_framework.permissions import TokenMatchesOASRequirements
from oauth2_provider.contrib.rest_framework.authentication import OAuth2Authentication

from order.models import Order, OrderItem
from order.serializers import OrderSerializer, OrderItemSerializer


class OrderViewSet(viewsets.ModelViewSet):
    """
    This ViewSet automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = [OAuth2Authentication]
    permission_classes = [TokenMatchesOASRequirements]
    required_alternate_scopes = {
        # "GET": [["order:read"]],
        "POST": [["order:create"]],
        "PUT":  [["order:update"]],
        "DELETE": [["order:delete"]],
    }

    def get_permissions(self):
        """Returns the permission based on the type of action"""

        if self.action in ["list", "retrieve","create"]:
            return [AllowAny()]

        return [IsAuthenticated()]
    
    
class OrderItemViewSet(viewsets.ModelViewSet):
    """
    This ViewSet automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    authentication_classes = [OAuth2Authentication]
    permission_classes = [TokenMatchesOASRequirements]
    required_alternate_scopes = {
        # "GET": [["orderitem:read"]],
        "POST": [["orderitem:create"]],
        "PUT":  [["orderitem:update"]],
        "DELETE": [["orderitem:delete"]],
    }

    def get_permissions(self):
        """Returns the permission based on the type of action"""

        if self.action in ["list", "retrieve","create"]:
            return [AllowAny()]

        return [IsAuthenticated()]