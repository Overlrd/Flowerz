from django.urls import path 
from . import views
urlpatterns = [
    path("", view=views.index, name="index"),
    path("flower/<str:name>/<int:wiki_only>", view = views.get_flower_object, name="flower")
]
