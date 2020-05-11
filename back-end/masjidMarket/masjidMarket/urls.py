from django.contrib import admin
from django.urls import path, include
from .market import urls as marketUrls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(marketUrls))
]
