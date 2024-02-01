from django.urls import path
from . import views

urlpatterns = [
  path('get_status/', views.GetStatusView.as_view(), name='status-list'),
  path('post_status/', views.PostStatusView.as_view(), name='status-create'),
  path('get_user/', views.GetAllUserView.as_view(), name='user-list'),
  path('get_user_id/<str:userID>/', views.GetUserIDView.as_view(), name='user-ID'),
  path('get_user_handle/<str:nameHandle>/', views.GetUserHandleView.as_view(), name='user-Handle'),
  path('get_user_login/<str:nameHandle>/<str:password>/', views.GetUserLoginView.as_view(), name='user-login'),
  path('get_following_single/<str:start>/<str:end>/', views.GetFollowingViewSingle.as_view(), name='following-get-edge'),
  path('get_following/<str:start>/', views.GetFollowingView.as_view(), name='following-list'),
  path('get_follower/<str:end>/', views.GetFollowerView.as_view(), name='follower-list'),
  path('post_following/', views.PostFollowingView.as_view(), name='following-create'),
  path('delete_following/', views.DeleteFollowingView.as_view(), name='following-delete'),
  path('get_like/<str:statusID>/<str:viewerID>/', views.GetLikeView.as_view(), name='like-get'),
  path('post_like/', views.PostLikeView.as_view(), name='like-create'),
  path('delete_like/', views.DeleteLikeView.as_view(), name='like-delete')
]

