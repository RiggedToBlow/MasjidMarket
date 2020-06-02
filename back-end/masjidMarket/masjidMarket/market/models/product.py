from django.db import models

categories = [("إكسسوارات", "Accessories"), ("كتب", "Books"),
                ("ألعاب", "Toys"), ("قرطاسية", "Stationery")]


class Product(models.Model):
    class Meta:
        db_table = 'product'

    title = models.CharField(max_length=256, null=False)
    description = models.CharField(max_length=256, null=False)
    image = models.URLField(max_length=256)
    category = models.CharField(max_length=15, choices=categories, null=False)
    price = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.title} : {self.price}"
