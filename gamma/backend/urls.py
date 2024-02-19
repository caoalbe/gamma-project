from django.urls import path
from . import views

urlpatterns = [
  path('get_status/', views.StatusView.as_view(), name='status-list'),
  path('get_status_statusID/<str:statusID>/', views.StatusView.as_view(), name='status-ID'),
  path('get_status_replyID/<str:replyID>/', views.StatusView.as_view(), name='status-reply-ID'),
  path('get_status_handle/<str:nameHandle>/', views.StatusView.as_view(), name='status-author-handle'),
  path('post_status/', views.StatusView.as_view(), name='status-create'),
  path('get_user/', views.UserView.as_view(), name='user-list'),
  path('get_user_id/<str:userID>/', views.UserView.as_view(), name='user-ID'),
  path('get_user_handle/<str:nameHandle>/', views.UserView.as_view(), name='user-Handle'),
  path('get_user_login/<str:nameHandle>/<str:password>/', views.UserView.as_view(), name='user-login'),
  path('put_user/', views.UserView.as_view(), name="modify user"),
  path('post_user/', views.UserView.as_view(), name="create user"),
  path('get_following_single/<str:start>/<str:end>/', views.FollowingView.as_view(), name='following-get-edge'),
  path('get_following/<str:start>/', views.FollowingView.as_view(), name='following-list'),
  path('get_follower/<str:end>/', views.FollowingView.as_view(), name='follower-list'),
  path('post_following/', views.FollowingView.as_view(), name='following-create'),
  path('delete_following/', views.FollowingView.as_view(), name='following-delete'),
  path('get_like/<str:statusID>/<str:viewerID>/', views.LikeView.as_view(), name='like-get'),
  path('get_like_status/<str:statusID>/', views.LikeView.as_view(), name='like-status'),
  path('post_like/', views.LikeView.as_view(), name='like-create'),
  path('delete_like/', views.LikeView.as_view(), name='like-delete')
]

