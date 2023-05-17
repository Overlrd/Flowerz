from django.urls import path
from . import views
urlpatterns = [
    path("", view=views.index, name="index"),
    path("flower/<str:name>/<str:to_return>", view=views.get_flower, name="flower")
]
