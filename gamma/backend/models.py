from django.db import models

# Create your models here.
class Post(models.Model):
  nameDisplay = models.CharField(max_length=50)
  nameHandle = models.CharField(max_length=50) # should be a foreign key
  postText = models.CharField(max_length=280)
  datePosted = models.DateField()

  def __str__(self):
    return self.nameHandle + " - " + self.postText