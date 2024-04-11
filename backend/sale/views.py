from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from oauth2_provider.contrib.rest_framework.permissions import TokenMatchesOASRequirements
from oauth2_provider.contrib.rest_framework.authentication import OAuth2Authentication
from sale.models import Banner
from sale.serializers import BannerSerializer
# Create your views here.
class BannerViewSet(viewsets.ModelViewSet):
    """
    This ViewSet automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer
    authentication_classes = [OAuth2Authentication]
    permission_classes = [TokenMatchesOASRequirements]
    required_alternate_scopes = {
        # "GET": [["category:read"]],
        "POST": [["banner:create"]],
        "PUT":  [["banner:update"]],
        "DELETE": [["banner:delete"]],
    }

    def get_permissions(self):
        """Returns the permission based on the type of action"""

        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        return [IsAuthenticated()]