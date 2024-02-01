from rest_framework import serializers
from .models import Status, User, Following, Like

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model=User
    fields=('userID', 'nameHandle', 'nameDisplay', 'pfp', 'banner', 'bio', 'dateTimeJoined')


class StatusSerializer(serializers.ModelSerializer):

  media1 = serializers.ImageField(required=False)

  class Meta:
    model=Status
    fields=('statusID', 'userID', 'text', 'media1', 'dateTimePosted')

class FollowingSerializer(serializers.ModelSerializer):
  class Meta:
    model=Following
    fields=('start', 'end')

class LikeSerializer(serializers.ModelSerializer):
  class Meta:
    model=Like
    fields=('statusID', 'viewerID')