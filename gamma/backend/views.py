from rest_framework.response import Response
from .models import Status, User, Following, Like
from .serializer import StatusSerializer, UserSerializer, FollowingSerializer, LikeSerializer

from rest_framework import generics, permissions
import uuid

# Create your views here.
# todo: figure out how to fold these classes together

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

# Following Views
class GetFollowingViewSingle(generics.CreateAPIView):
  queryset = Following.objects.all()
  http_method_names = ['get']

  def get(self, request, start, end, format=None):
    serializer = FollowingSerializer(Following.objects.all().filter(start=start, end=end), many=True)
    return Response(serializer.data)
  
class GetFollowingView(generics.CreateAPIView):
  queryset = Following.objects.all()
  http_method_names = ['get']

  def get(self, request, start, format=None):
    serializer = FollowingSerializer(Following.objects.all().filter(start=start), many=True)
    return Response(serializer.data)

class GetFollowerView(generics.CreateAPIView):
  queryset = Following.objects.all()
  http_method_names = ['get']

  def get(self, request, end, format=None):
    serializer = FollowingSerializer(Following.objects.all().filter(end=end), many=True)
    return Response(serializer.data)

class PostFollowingView(generics.CreateAPIView):
  queryset = Following.objects.all()
  serializer_class = FollowingSerializer
  http_method_names = ['post']

  def post(self, request, format=None):
    serializer = FollowingSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors)
  
  def perform_create(self, serializer):
    serializer.save(creator=self.request.user)

class DeleteFollowingView(generics.DestroyAPIView):
  queryset = Following.objects.all()
  serializer_class = FollowingSerializer
  http_method_names = ['delete']

  def delete(self, request, format=None):
    try:
      Following.objects.filter(start=uuid.UUID(request.data['start']), end=uuid.UUID(request.data['end'])).delete()
      return Response(status=204)
    except Following.DoesNotExist:
      return Response(status=404)

# Like Views
class GetLikeView(generics.CreateAPIView):
  queryset = Like.objects.all()
  http_method_names = ['get']

  def get(self, request, statusID, viewerID, format=None):
    serializer = LikeSerializer(Like.objects.all().filter(statusID=statusID, viewerID=viewerID), many=True)
    return Response(serializer.data)

class GetLikeStatusView(generics.CreateAPIView):
  queryset = Like.objects.all()
  http_method_names = ['get']

  def get(self, request, statusID, format=None):
    serializer = LikeSerializer(Like.objects.all().filter(statusID=statusID), many=True)
    return Response(serializer.data)

class PostLikeView(generics.CreateAPIView):
  queryset = Like.objects.all()
  serializer_class = LikeSerializer
  http_method_names = ['post']

  def post(self, request, format=None):
    serializer = LikeSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors)
  
  def perform_create(self, serializer):
    serializer.save(creator=self.request.user)

class DeleteLikeView(generics.DestroyAPIView):
  queryset = Like.objects.all()
  serializer_class = LikeSerializer
  http_method_names = ['delete']

  def delete(self, request, format=None):
    try:
      Like.objects.filter(statusID=uuid.UUID(request.data['statusID']), viewerID=uuid.UUID(request.data['viewerID'])).delete()
      return Response(status=204)
    except Like.DoesNotExist:
      return Response(status=404)