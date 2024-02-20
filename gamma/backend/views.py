from rest_framework.response import Response
from .models import Status, User, Following, Like
from .serializer import StatusSerializer, UserSerializer, FollowingSerializer, LikeSerializer
from rest_framework import generics
import uuid

# request --> http body
# kwargs --> url parameter
class UserView(generics.GenericAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  http_method_names = ['get', 'post', 'put']

  def get(self, request, *args, **kwargs):
    try:
      userID = kwargs.get('userID', None)
      nameHandle = kwargs.get('nameHandle', None)
      password = kwargs.get('password', None)

      output = None
      if password and nameHandle:
        output = User.objects.filter(nameHandle=nameHandle, password=password)
      elif userID:
        output = User.objects.filter(userID=userID)
      elif nameHandle:
        output = User.objects.filter(nameHandle=nameHandle)
      else:
        output = User.objects.all()

      return Response(UserSerializer(output, many=True).data)
    
    except User.DoesNotExist:
      return Response({'error': 'User not found'})
    
  def put(self, request, *args, **kwargs):
    try:
      userID = request.data["userID"]

      target = User.objects.get(userID=userID)
      updatedUser = UserSerializer(target, data=request.data, partial=True)
      if not updatedUser.is_valid():
        return Response(updatedUser.errors)
      
      updatedUser.save()
      return Response(updatedUser.data)
    
    except Exception as e:
      return Response({'error': 'Error updating user'})
    
  def post(self, request, *args, **kwargs):
    newUser = UserSerializer(data=request.data)

    if not newUser.is_valid():
      return Response(newUser.errors)
    
    newUser.save(password = request.data["password"])
    return Response(newUser.data)


class StatusView(generics.GenericAPIView):
  queryset = Status.objects.all()
  serializer_class = StatusSerializer
  http_method_names = ['get', 'post']

  def get(self, request, *args, **kwargs):
    statusID = kwargs.get('statusID', None)
    replyID = kwargs.get('replyID', None)
    nameHandle = kwargs.get('nameHandle', None)

    if statusID:
      output = Status.objects.filter(statusID=statusID)
    elif replyID:
      output = Status.objects.filter(replyID=replyID)
    elif nameHandle:
      output = Status.objects.filter(userID__nameHandle=nameHandle)
    else:
      output = Status.objects.all()
    output = output.order_by('-dateTimePosted')

    return Response(StatusSerializer(output, many=True).data)
  
  def post(self, request, *args, **kwargs):
    newStatus = StatusSerializer(data=request.data)

    if not newStatus.is_valid():
      return Response(newStatus.errors)
    
    newStatus.save()
    return Response(newStatus.data)


class FollowingView(generics.GenericAPIView):
  queryset = Following.objects.all()
  serializer_class = FollowingSerializer
  http_method_names = ['get', 'post', 'delete']

  def get(self, request, *args, **kwargs):
    try:
      start = kwargs.get('start', None)
      end = kwargs.get('end', None)

      output = None
      if start and end:
        output = Following.objects.filter(start=start, end=end)
      elif start:
        output = Following.objects.filter(start=start)
      elif end:
        output = Following.objects.filter(end=end)

      return Response(FollowingSerializer(output, many=True).data)
    
    except Following.DoesNotExist:
      return Response({'error': 'Following not found'})
    
  def post(self, request, *args, **kwargs):
    newFollowing = FollowingSerializer(data=request.data)
    if not newFollowing.is_valid():
      return Response(newFollowing.errors)
    
    newFollowing.save()
    return Response(newFollowing.data)

  def delete(self, request, *args, **kwargs):
    try:
      start = request.data["start"]
      end = request.data["end"]

      if (start is None or end is None):
        return Response(status=400)

      toDelete = Following.objects.filter(start=uuid.UUID(start), end=uuid.UUID(end))
      toDelete.delete()
      return Response(status=200)
    
    except Following.DoesNotExist:
      return Response(status=404)
    

class LikeView(generics.GenericAPIView):
  queryset = Like.objects.all()
  http_method_names = ['get', 'post', 'delete']

  def get(self, request, *args, **kwargs):
    try:
      viewerID = kwargs.get('viewerID', None)
      statusID = kwargs.get('statusID', None)

      output = None
      if viewerID and statusID:
        output = Like.objects.filter(statusID=statusID, viewerID=viewerID)
      elif statusID:
        output = Like.objects.filter(statusID=statusID)

      return Response(LikeSerializer(output, many=True).data)
       
    except Like.DoesNotExist:
      return Response({'error': 'Like not found'})
    
  def post(self, request, *args, **kwargs):
    newLike = LikeSerializer(data=request.data)
    if not newLike.is_valid():
      return Response(newLike.errors)
    
    newLike.save()
    return Response(newLike.data)
  
  def delete(self, request, *args, **kwargs):
    try:
      viewerID = request.data["viewerID"]
      statusID = request.data["statusID"]

      if (viewerID is None or statusID is None):
        return Response(status=400)
      
      toDelete = Like.objects.filter(statusID=uuid.UUID(statusID), viewerID=uuid.UUID(viewerID))
      toDelete.delete()
      return Response(status=200)

    except Like.DoesNotExist:
      return Response(status=404)