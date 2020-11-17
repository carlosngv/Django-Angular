from django.db import models

def upload_path(instance, filename):
    return '/'.join(['covers',str(instance.song_name), filename])

class Song(models.Model):
    song_id = models.AutoField(primary_key=True)
    song_name = models.CharField(max_length=100)
    song_description = models.CharField(max_length=125)
    song_cover = models.ImageField(null=True, blank=True, upload_to=upload_path)