from django.shortcuts import render

# Create your views here.
# Handle GET, POST, PUT etc requests here 
from rest_framework import viewsets

from .serializers import BlogEntrySerializer
from .models import BlogEntry

class BlogEntryViewSet(viewsets.ModelViewSet):
    queryset = BlogEntry.objects.all().order_by('blog_name')
    serializer_class = BlogEntrySerializer