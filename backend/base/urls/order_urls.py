from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path("add", views.add_order, name="add_order_items"),
    path("<int:order_id>", views.get_order_by_id, name="get_order_by_id"),
    path("myorders", views.get_my_orders, name="my_orders"),
    path("", views.get_orders, name="orders"),
]
