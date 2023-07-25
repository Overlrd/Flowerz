from django.shortcuts import render
from predict.forms import ImageForm


def index(request):
    form = ImageForm()
    return render(request, 'index.html', {
        'form': form
    })
