from rest_framework.response import Response
from .models import Status, User
from .serializer import StatusSerializer, UserSerializer

from rest_framework import generics, permissions

# Create your views here.

# User Views
class GetAllUserView(generics.CreateAPIView):
  queryset = User.objects.all()
  http_method_names = ['get']

  def get(self, request, format=None):
    serializer = UserSerializer(User.objects.all(), many=True)
    return Response(serializer.data)

class GetUserIDView(generics.CreateAPIView):
  queryset = User.objects.all()
  http_method_names = ['get']

  def get(self, request, userID, format=None):
    try:
      serializer = UserSerializer(User.objects.filter(userID=userID), many=True)
      return Response(serializer.data)
    except User.DoesNotExist:
      return Response({'error': 'User not found'})
    
class GetUserHandleView(generics.CreateAPIView):
  queryset = User.objects.all()
  http_method_names = ['get']

  def get(self, request, nameHandle, format=None):
    try:
      serializer = UserSerializer(User.objects.filter(nameHandle=nameHandle), many=True)
      return Response(serializer.data)
    except User.DoesNotExist:
      return Response({'error': 'User not found'})
    
class GetUserLoginView(generics.CreateAPIView):
  queryset = User.objects.all()
  http_method_names = ['get']

  def get(self, request, nameHandle, password, format=None):
    try:
      serializer = UserSerializer(User.objects.filter(nameHandle=nameHandle, password=password), many=True)
      return Response(serializer.data)
    except User.DoesNotExist:
      return Response({'error': 'User not found'})

# Status(Tweets) Views
class GetStatusView(generics.CreateAPIView):
  queryset = Status.objects.all()
  http_method_names = ['get']

  def get(self, request, format=None):
    serializer = StatusSerializer(Status.objects.all(), many=True)
    return Response(serializer.data)
  
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

  def perform_create(self, serializer):
    serializer.save(creator=self.request.user)