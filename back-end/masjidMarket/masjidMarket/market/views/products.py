import json
from django.views.generic import View
from django.http import HttpResponse, JsonResponse
from ..models import Product
from ..authenticate import authenticateToken


class ProductsView(View):
    def post(self, request):
        body = json.loads(request.body.decode("utf-8"))
        try:
            token = body.get('token')
            if authenticateToken(token) is None:
                return HttpResponse(status=401)
        except:
            return HttpResponse(status=401)

        products = list(Product.objects.all().values())

        return JsonResponse(products, safe=False)
