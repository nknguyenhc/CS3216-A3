from django.urls import path
from . import views
from .views import GoogleLogin

urlpatterns = [
    path('stripe/<str:plan_type>/create-checkout-session',
         views.StripeCheckoutView.as_view()),
    path('register', views.UserRegister.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user'),
    path('google-login', GoogleLogin.as_view(), name='google-login'),
]
