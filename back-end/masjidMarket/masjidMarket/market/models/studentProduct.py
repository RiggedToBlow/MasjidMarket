from django.db import models


class StudentProduct(models.Model):
    class Meta:
        db_table = "student_product"

    student = models.ForeignKey("market.Student", on_delete=models.CASCADE)
    product = models.ForeignKey("market.Product", on_delete=models.CASCADE)
    count = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.student.user.get_full_name()} bought {self.count} of {self.product.title}"
