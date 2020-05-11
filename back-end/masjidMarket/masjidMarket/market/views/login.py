import jwt
import json
from django.views.generic import TemplateView
from django.contrib.auth import authenticate
from django.http import HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.contrib.auth.models import User
from ..authenticate import generateToken


class LoginView(TemplateView):
    def post(self, request):
        body = json.loads(request.body.decode("utf-8"))
        username = body['username']
        password = body['password']

        user = authenticate(username=username, password=password)
        if user is None:
            return HttpResponseNotAllowed()

        user = User.objects.get(username=username)
        try:
            points = user.student.points
        except:
            return HttpResponseBadRequest()

        token = generateToken(username)

        responseObject = {  "token": token,
                            "points": points}
        return JsonResponse(responseObject, safe=False)
