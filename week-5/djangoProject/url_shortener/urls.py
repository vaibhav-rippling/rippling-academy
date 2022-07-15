from django.urls import path
from . import views

urlpatterns = [
    path('url/add/', views.add_url, name="add_url"),
    path('url/delete/', views.delete_url, name="delete_url"),
    path('url/list/', views.list_url, name="list_url"),
    path('<str:short_url_id>/', views.process_url, name="process_url")
]