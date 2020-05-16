from django.views.generic import TemplateView
from django.contrib.auth.models import User
from django.http import JsonResponse
from ..models import StudentProduct
from pprint import pprint


class BillView(TemplateView):
    def get(self, request):
        items = StudentProduct.objects.all()

        dic = dict()
        for item in items:
            name = item.student.user.get_full_name()
            if not dic.get(name):
                dic[name] = []
            dic[name].append({  "title": item.product.title,
                                "quantity": item.count})

        return JsonResponse(dic, safe=False)
