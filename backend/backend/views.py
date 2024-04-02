from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from rest_framework.views import APIView
# import braintree


@ensure_csrf_cookie
def single_page_view(request):
    return render(request, "index.html")

# def get_client_token(request):
#     gateway = braintree.BraintreeGateway(
#         braintree.Configuration(
#             environment=braintree.Environment.Sandbox,
#             merchant_id='t5nv7j7m3d2xzm3r',
#             public_key='svm4xvffcx38kxjy',
#             private_key='75fd69ab58c976ae4bcd5b6ee754f24b'
#         )
#     )

#     client_token = gateway.client_token.generate()
#     return JsonResponse({'client_token': client_token})