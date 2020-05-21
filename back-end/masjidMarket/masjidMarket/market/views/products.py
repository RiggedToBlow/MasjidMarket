import json
from django.views.generic import View
from django.http import HttpResponse, JsonResponse
from ..models import Product
from ..authenticate import authenticateToken
from django.core.paginator import Paginator


class ProductsView(View):
    def post(self, request, page_num):
        body = json.loads(request.body.decode("utf-8"))
        try:
            token = body.get('token')
            if authenticateToken(token) is None:
                return HttpResponse(status=401)
        except:
            return HttpResponse(status=401)


        products_list = Product.objects.all()
        paginator = Paginator(products_list, 20)
        if page_num > paginator.num_pages:
            return HttpResponse(status=400)

        products = list()
        for product in list(paginator.page(page_num)):
            products.append({
                "id": product.id,
                "title": product.title,
                "description": product.description,
                "image": product.image,
                "price": product.price })

        return JsonResponse(products, safe=False)
