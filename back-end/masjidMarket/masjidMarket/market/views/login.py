import json
from math import ceil
from django.views.generic import View
from django.contrib.auth import authenticate
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import User
from ..authenticate import generateToken
from ..models import Product

class LoginView(View):
    def post(self, request):
        body = json.loads(request.body.decode("utf-8"))
        username = body.get('username')
        password = body.get('password')
        print(username, password)

        user = authenticate(username=username, password=password)
        if user is None:
            print(user)
            return HttpResponse(status=401)

        try:
            points = user.student.points
        except:
            return HttpResponse(status=401)

        token = generateToken(username)

        responseObject = {  "token" : token,
                            "name"  : user.get_full_name(),
                            "points": points,
                            "pages" : ceil(Product.objects.count() / 10)}
        return JsonResponse(responseObject, safe=False)
