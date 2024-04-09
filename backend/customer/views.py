from rest_framework import viewsets
from customer.models import Customer
from oauth2_provider.contrib.rest_framework.permissions import TokenMatchesOASRequirements
from oauth2_provider.contrib.rest_framework.authentication import OAuth2Authentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from customer.serializers import CustomerSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response


class CustomerViewSet(viewsets.ModelViewSet):
    """
    This ViewSet automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    authentication_classes = [OAuth2Authentication]
    permission_classes = [TokenMatchesOASRequirements]
    required_alternate_scopes = {
        # "GET": [["product:read"]],
        # "POST": [["customer:create"]],
        "PUT":  [["customer:update"]],
        "DELETE": [["customer:delete"]],
    }

    def get_permissions(self):
        """Returns the permission based on the type of action"""

        if self.action in ['list', 'create','retrieve']:
            return [AllowAny()]

        return [IsAuthenticated()]