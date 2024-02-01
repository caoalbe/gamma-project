from django.contrib import admin
from .models import Status, User, Following, Like

# Register your models here.
admin.site.register(Status)
admin.site.register(User)
admin.site.register(Following)
admin.site.register(Like)