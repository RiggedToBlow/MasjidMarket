from django.contrib import admin

from .models import Product, Student, StudentProduct

# Register your models here.
admin.site.register(Product)
admin.site.register(Student)
admin.site.register(StudentProduct)
