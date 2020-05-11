from django.views.generic import TemplateView
from django.http import HttpResponseNotAllowed, JsonResponse
from ..models import Product
from ..authenticate import authenticateToken


class ProductsView(TemplateView):
    def post(self, request):
        token = request.POST['token']
        if authenticateToken(token) is None:
            return HttpResponseNotAllowed()

        products = list(Product.objects.all().values())
        print(products)

        return JsonResponse(products, safe=False)
