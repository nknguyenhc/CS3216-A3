from django.urls import path
from . import views

urlpatterns = [
    path('', views.Essay.as_view(), name="essay"),
]
