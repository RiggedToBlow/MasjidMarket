from django.contrib.auth.models import User
from django.db import models
from .product import Product

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    points = models.PositiveIntegerField()
    items = models.ManyToManyField(Product, blank=True)

    def __str__(self):
        return f"{str(self.user)} : {self.points}"
