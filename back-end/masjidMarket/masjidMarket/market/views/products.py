import json
from django.views.generic import TemplateView
from django.http import HttpResponseNotAllowed, JsonResponse
from ..models import Product
from ..authenticate import authenticateToken


class ProductsView(TemplateView):
    def post(self, request):
        body = json.loads(request.body.decode("utf-8"))

        token = body['token']
        if authenticateToken(token) is None:
            return HttpResponseNotAllowed()

        products = list(Product.objects.all().values())

        return JsonResponse(products, safe=False)
