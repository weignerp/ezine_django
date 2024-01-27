from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Review, Order, OrderItem, ShippingAddress


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_orderItems(self, object):
        orderItems = object.orderitem_set.all()
        serializer = OrderItemSerializer(orderItems, many=True)
        return serializer.data

    def get_shippingAddress(self, object):
        try:
            shipping_address = ShippingAddressSerializer(
                object.shippingaddress, many=False
            ).data
        except ValueError:
            return None
        return shipping_address

    def get_user(self, object):
        try:
            user = UserSerializer(object.user, many=False).data
        except ValueError:
            return None
        return user


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "_id",
            "isAdmin",
            "username",
            "email",
            "first_name",
            "last_name",
            "name",
        ]

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = ""
        sep = ""
        if obj.is_authenticated is False:
            return name

        if obj.first_name is not None:
            name = obj.first_name
            sep = " "

        if obj.last_name is not None:
            name = name + sep + obj.last_name

        if name == "":
            name = obj.username

        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "_id", "isAdmin", "username", "email", "name", "token"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class UserSerializerRegister(UserSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "_id",
            "isAdmin",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "name",
            "token",
        ]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
