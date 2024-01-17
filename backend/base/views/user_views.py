from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status

# from icecream import ic

from base.serializers import (
    UserSerializer,
    UserSerializerWithToken,
    UserSerializerRegister,
)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        """ user = self.user or self.context["request"].user
        if user.is_authenticated:
             data["username"] = user.username
             data["email"] = user.email
         else:
             pass """
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_users(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data["firstname"]
    user.last_name = data["lastname"]
    user.email = data["email"]

    if "password" in data and data["password"] != "":
        user.password = make_password(data["password"])

    user.save()
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["POST"])
def register_user(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data["firstname"],
            last_name=data["lastname"],
            username=data["username"],
            email=data["email"],
            password=make_password(data["password"]),
        )
        serializer = UserSerializerRegister(user)
        return Response(serializer.data)
    except Exception as e:
        message = {"details": f"User with this email already exists!\n{e}"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
