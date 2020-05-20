import json
from django.views.generic import View
from django.http import HttpResponse, JsonResponse
from ..authenticate import authenticateToken
from ..models import Product
from ..models import StudentProduct



class BuyView(View):
    def post(self, request):
        body = json.loads(request.body.decode("utf-8"))

        token = body.get("token")
        user = authenticateToken(token)
        if token is None or user is None:
            return HttpResponse(status=401)


        items = body.get("items")
        if items is None:
            return HttpResponse(status=400)


        totalPrice = sum(Product.objects.get(pk=item['id']).price * item['quantity'] for item in items)
        if user.student.points < totalPrice:
            return JsonResponse({ "points":user.student.points,
                                  "done": False}, status=400)

        user.student.points -= totalPrice
        for item in items:
            product = Product.objects.get(pk=item['id'])
            try:
                stupro = StudentProduct.objects.get(student=user.student, product=product)
                stupro.count += item['quantity']
                stupro.save()
            except:
                StudentProduct(student=user.student,
                            product=product,
                            count=item['quantity']).save()
            product.save()
        user.student.save()

        return JsonResponse({ "points": user.student.points,
                              "done" : True},status=200)
