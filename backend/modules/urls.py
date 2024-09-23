from django.urls import path
from . import views

urlpatterns = [
    path('', views.Essay.as_view(), name="essay"),
    path('jardine/', views.JardineEssay.as_view(), name="jardine_essay"),
    path('feedback/', views.GetFeedback.as_view(), name="get_feedback"),
]
