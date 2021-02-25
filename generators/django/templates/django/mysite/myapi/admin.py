from django.contrib import admin

# Register your models here.
# let the admin site know BlogEntry model exists
from .models import BlogEntry

admin.site.register(BlogEntry)