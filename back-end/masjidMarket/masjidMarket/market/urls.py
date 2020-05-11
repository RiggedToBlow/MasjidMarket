from django.urls import path
from .views import *
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('login', csrf_exempt(LoginView.as_view())),
    path('product', csrf_exempt(ProductsView.as_view())),
    path('buy', csrf_exempt(BuyView.as_view()))
]
