from django.db import models


class Product(models.Model):
    class Meta:
        db_table = 'product'

    title = models.CharField(max_length=256, null=False)
    description = models.CharField(max_length=256, null=False)
    image = models.URLField(max_length=256)
    price = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.title} : {self.price}"
