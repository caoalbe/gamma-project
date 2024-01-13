from django.urls import path
from . import views

urlpatterns = [
  path('get_status/', views.GetStatusView.as_view(), name='status-list'),
  path('post_status/', views.PostStatusView.as_view(), name='status-create'),
]