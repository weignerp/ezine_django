from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import (
    ProductSerializer,
    OrderSerializer,
    OrderItemSerializer,
    ShippingAddressSerializer,
)

from rest_framework import status


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_order(resquest):
    user = resquest.user
    data = resquest.data

    order_items = data["orderItems"]
    if order_items and len(order_items) == 0:
        return Response(
            {"detail": "No Order Items"}, status=status.HTTP_400_BAD_REQUEST
        )
    else:
        # create order
        # create shipping address
        # create order items and set order to orderItem relationship
        # return success

        order = Order.objects.create(
            user=user,
            paymentMethod=data["paymentMethod"],
            taxPrice=data["taxPrice"],
            shippingPrice=data["shippingPrice"],
            totalPrice=data["totalPrice"],
        )
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data["shippingAddress"]["address"],
            city=data["shippingAddress"]["city"],
            postalCode=data["shippingAddress"]["postalCode"],
            country=data["shippingAddress"]["country"],
            shippingPrice=data["shippingPrice"],
        )
        for i in order_items:
            product = Product.objects.get(_id=i["product"])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i["qty"],
                price=i["price"],
                image=product.image.url,
            )

            # update stock
            product.countInStock -= item.qty
            product.save()
        serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_my_orders(request):
    user = request.user
    order = user.order_set.all()
    serializer = OrderSerializer(order, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_order_by_id(request, order_id):
    user = request.user
    try:
        order = Order.objects.get(_id=order_id)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        return (
            Response({"detail": "Not authorized to view this order."}),
            status.HTTP_400_BAD_REQUEST,
        )
    except Order.DoesNotExist:
        return Response(
            {"detail": "Order does not exist."}, status=status.HTTP_400_BAD_REQUEST
        )
