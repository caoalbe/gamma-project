from django.urls import path
from . import views

urlpatterns = [
  path('get_status/', views.GetStatusView.as_view(), name='status-list'),
  path('post_status/', views.PostStatusView.as_view(), name='status-create'),
  path('get_user/', views.GetAllUserView.as_view(), name='user-list'),
  path('get_user_id/<str:userID>/', views.GetUserIDView.as_view(), name='user-ID'),
  path('get_user_handle/<str:nameHandle>/', views.GetUserHandleView.as_view(), name='user-Handle'),
  path('get_user_login/<str:nameHandle>/<str:password>/', views.GetUserLoginView.as_view(), name='user-login')
]