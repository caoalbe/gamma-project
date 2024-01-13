from django.shortcuts import render
from rest_framework.response import Response
from .models import Status
from .serializer import StatusSerializer
import datetime

from rest_framework import generics, permissions

# Create your views here.

# User Status(Tweets)
# GET request
class GetStatusView(generics.CreateAPIView):
  queryset = Status.objects.all()
  http_method_names = ['get']

  def get(self, request, format=None):
    serializer = StatusSerializer(Status.objects.all(), many=True)
    return Response(serializer.data)

# POST request
class PostStatusView(generics.CreateAPIView):
  queryset = Status.objects.all()
  serializer_class = StatusSerializer
  # permission_classes = [permissions.IsAuthenticated]
  http_method_names = ['post']

  def post(self, request, format=None):
    serializer = StatusSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors)
