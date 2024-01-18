import uuid
from django.db import models

# Create your models here.
class User(models.Model):
  userID = models.UUIDField(
    primary_key = True,
    default = uuid.uuid4,
    editable = False,
    unique=True
  )
  nameHandle = models.CharField(max_length=50, unique=True)
  nameDisplay = models.CharField(max_length=50)

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
  dateTimePosted = models.DateTimeField()

  def __str__(self):
    return self.text

