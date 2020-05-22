from django.urls import path, re_path
from .views import *
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('', IndexView.as_view()),
    path('login', csrf_exempt(LoginView.as_view())),
    path('product', csrf_exempt(ProductsView.as_view())),
    path('buy', csrf_exempt(BuyView.as_view())),
    path('bill', csrf_exempt(BillView.as_view())),
    re_path(r'^.*', IndexView.as_view())
]
