from rest_framework import serializers
from . import models

# serializers turn models into a JSON representation so that they can be parsed by an API user

class BlogEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BlogEntry
        fields = ['blog_id', 'blog_name', 'blog_text', 'pub_date']