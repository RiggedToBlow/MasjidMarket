from django.views.generic import TemplateView
from django.contrib.auth import authenticate
from django.http import HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.models import User
from ..authenticate import generateToken
import jwt


class LoginView(TemplateView):
    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is None:
            return HttpResponseNotAllowed()

        user = User.objects.get(username=username)
        points = user.student.points

        token = generateToken(username)

        responseObject = {  "token": token,
                            "points": points}
        return JsonResponse(responseObject, safe=False)
