from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .products import products

# Create your views here.


@api_view(["GET"])
def get_routes(request):
    routes = [
        "/api/products",
        "/api/products/create",
        "/api/products/upload",
        "/api/products/<id>/reviews/",
        "/api/products/top",
        "/api/products/<id>/",
        "/api/products/delete/<id>",
        "/api/products/<update>/<id>",
    ]
    return Response(routes)


@api_view(["GET"])
def get_products(request):
    return Response(products)


@api_view(["GET"])
def get_product(request, pk):
    """Return product object

    Args:
        request (_type_): client request
        pk (_type_): product id

    Returns:
        Product: PRoduct object.
    """
    product = None
    for i in products:
        if i["_id"] == pk:
            product = i
            break
    return Response(product)
