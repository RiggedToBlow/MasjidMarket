import json
from django.views.generic import View
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse, HttpResponse
from ..models import StudentProduct


class BillView(View):
    def post(self, request):
        body = json.loads(request.body.decode())
        username = body.get("username")
        password = body.get("password")

        user = authenticate(username=username, password=password)
        if not (user and user.is_superuser):
            return HttpResponse(status=401)

        items = StudentProduct.objects.all()
        dic = dict()
        for item in items:
            name = item.student.user.get_full_name()
            if not dic.get(name):
                dic[name] = []
            dic[name].append({  "title": item.product.title,
                                "quantity": item.count})

        return JsonResponse(dic, safe=False)
