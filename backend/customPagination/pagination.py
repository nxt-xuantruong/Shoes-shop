from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        if self.request.GET.get('full_data') == 'true':
            return Response({
                'count': self.page.paginator.count,
                'results': data
            })
        return super().get_paginated_response(data)

    def paginate_queryset(self, queryset, request, view=None):
        self.request = request
        if self.request.GET.get('full_data') == 'true':
            return None  # Trả về None để không thực hiện phân trang
        return super().paginate_queryset(queryset, request, view)
