import uuid
from django.db import models

# Media Stuff
def upload_to(instance, filename):
  return 'images/{filename}'.format(filename=filename)

# Create your models here.
class User(models.Model):
  # is userID necessary if nameHandle is unique?
  userID = models.UUIDField(
    primary_key = True,
    default = uuid.uuid4,
    editable = False,
    unique=True
  )
  nameHandle = models.CharField(max_length=50, unique=True)
  nameDisplay = models.CharField(max_length=50)
  password = models.CharField(max_length=50)
  pfp = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True)
  banner = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True)
  bio = models.CharField(max_length=280, default=None, blank=True, null=True)
  dateTimeJoined = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return "@" + self.nameHandle

class Status(models.Model):
  statusID = models.UUIDField(
    primary_key = True,
    default = uuid.uuid4,
    editable = False,
    unique=True
  )
  userID = models.ForeignKey(User, on_delete=models.CASCADE)
  text = models.CharField(max_length=280)
  media1 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True)
  dateTimePosted = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.text

class Following(models.Model):
  start = models.ForeignKey(User, related_name='start', on_delete=models.CASCADE)
  end = models.ForeignKey(User, related_name='end', on_delete=models.CASCADE)

  def __str__(self):
    return str(self.start) + " -> " + str(self.end)

class Like(models.Model):
  statusID = models.ForeignKey(Status, on_delete=models.CASCADE)
  viewerID = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return str(self.viewerID) + " likes " + str(self.statusID)