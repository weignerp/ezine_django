from django.db.models.signals import pre_save
from django.contrib.auth.models import User
from icecream import ic


def update_user(sender, instance, **kwargs):
    ic("Signal update_user triggered.")
    if not instance.username and instance.email is not None and instance.email != "":
        instance.username = instance.email


pre_save.connect(update_user, sender=User)
