from django.urls import path 
from . import views
urlpatterns = [
    path("", view=views.index, name="index"),
    path("query/<str:q>", view=views.search, name="query")
]
