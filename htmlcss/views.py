# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'indexThree.html')


def default_map(request):
    # TODO: move this token to Django settings from an environment variable
    # found in the Mapbox account settings and getting started instructions
    # see https://www.mapbox.com/account/ under the "Access tokens" section
    mapbox_access_token = 'pk.eyJ1IjoicGVudGhpdXN4IiwiYSI6ImNrMjIydnpzdDFsM2IzaHFnYXh4NmM2NjQifQ.a0K5OuSAOu7YFt9RrUQNAw'
    return render(request, 'indexThree.html', {'mapbox_access_token': mapbox_access_token})
