import json
from django.views.generic import TemplateView
from django.http import HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest, HttpResponse
from ..authenticate import authenticateToken
from ..models import Product



class BuyView(TemplateView):
    def post(self, request):
        body = json.loads(request.body.decode("utf-8"))

        token = body["token"]
        user = authenticateToken(token)
        if  user is None:
            return HttpResponseNotAllowed()

        items = body["items"]

        totalPrice = 0
        for item in items:
            try:
                product = Product.objects.get(pk=item['id'])
                totalPrice += product.price
                product.quantity -= item['quantity']
                product.save()
            except:
                return HttpResponseBadRequest()

        if user.student.points < totalPrice:
            return HttpResponseBadRequest()

        user.student.points -= totalPrice
        user.student.save()

        return HttpResponse(status=200)
