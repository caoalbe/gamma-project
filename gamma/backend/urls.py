from django.urls import path
from . import views

urlpatterns = [
  path('get_post_data/', views.UserPostGetView.as_view(), name='user-post-list'),
  path('create_post_data/', views.UserPostCreateView.as_view(), name='user-post-create'),
]