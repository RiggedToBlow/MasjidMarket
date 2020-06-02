from django.contrib import admin
from django.urls import path, include
from .market import urls as marketUrls


urlpatterns = [
    path('hellofromtheotherside/', admin.site.urls),
    path('', include(marketUrls))
]
