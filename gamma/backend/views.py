from django.shortcuts import render
from rest_framework.response import Response
from .models import Post
from .serializer import UserPostSerializer
import datetime

from rest_framework import generics, permissions

# Create your views here.

# User Posts(Tweets)
# GET request
class UserPostGetView(generics.CreateAPIView):
  queryset = Post.objects.all()
  http_method_names = ['get']

  def get(self, request, format=None):
    serializer = UserPostSerializer(UserPostGetView.get_queryset(self), many=True)
    return Response(serializer.data)

# POST request
class UserPostCreateView(generics.CreateAPIView):
  queryset = Post.objects.all()
  serializer_class = UserPostSerializer
  # permission_classes = [permissions.IsAuthenticated]
  http_method_names = ['post']

  def post(self, request, format=None):
    serializer = UserPostSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors)



