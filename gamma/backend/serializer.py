from rest_framework import serializers
from .models import Status, User




class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model=User
    fields=('userID', 'nameHandle', 'nameDisplay', 'pfp', 'banner', 'bio')


class StatusSerializer(serializers.ModelSerializer):

  media1 = serializers.ImageField(required=False)

  class Meta:
    model=Status
    fields=('statusID', 'userID', 'text', 'media1', 'dateTimePosted')