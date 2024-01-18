from rest_framework import serializers
from .models import Status, User

class StatusSerializer(serializers.ModelSerializer):
  class Meta:
    model=Status
    fields=('statusID', 'userID', 'text')


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model=User
    fields=('userID', 'nameHandle', 'nameDisplay')