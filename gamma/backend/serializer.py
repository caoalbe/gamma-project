from rest_framework import serializers
from .models import Post

class UserPostSerializer(serializers.ModelSerializer):
  class Meta:
    model=Post
    fields=('nameDisplay','nameHandle', 'postText', 'datePosted')
