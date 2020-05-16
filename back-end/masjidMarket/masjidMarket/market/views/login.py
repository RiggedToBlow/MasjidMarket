import jwt
import json
from django.views.generic import TemplateView
from django.contrib.auth import authenticate
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import User
from ..authenticate import generateToken


class LoginView(TemplateView):
    def post(self, request):
        body = json.loads(request.body.decode("utf-8"))
        username = body.get('username')
        password = body.get('password')

        user = authenticate(username=username, password=password)
        if user is None:
            return HttpResponse(status=405)

        try:
            points = user.student.points
        except:
            return HttpResponse(status=400)

        token = generateToken(username)

        responseObject = {  "token": token,
                            "name" : user.get_full_name(),
                            "points": points}
        return JsonResponse(responseObject, safe=False)
