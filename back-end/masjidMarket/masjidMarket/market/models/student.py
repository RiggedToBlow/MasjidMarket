from django.contrib.auth.models import User
from django.db import models
from .product import Product
from .studentProduct import StudentProduct


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    points = models.PositiveIntegerField()
    items = models.ManyToManyField(Product, through=StudentProduct, blank=True)

    def __str__(self):
        return f"{str(self.user)} : {self.points}"
