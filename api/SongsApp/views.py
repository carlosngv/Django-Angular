from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Song
from .serializer import SongSerializer
# Create your views here.


class SongViewSet(viewsets.ViewSet):

    def list(self, request): # Retrieves all songs and lists them
        queryset = Song.objects.all()
        serializer = SongSerializer(queryset, many = True)
        return Response(serializer.data)

    def retrieve(self, request, pk = None): # Retrieves song by its ID.
        queryset = Song.objects.all()
        song = get_object_or_404(queryset, pk = pk)
        serializer = SongSerializer(song)
        return Response(serializer.data)

    def create(self, request):
        serializer = SongSerializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response(serializer.data)
    
    def update(self, request, pk = None):
        song = Song.objects.get(pk = pk)
        serializer = SongSerializer(song, data = request.data, partial = True)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response(serializer.data)
    