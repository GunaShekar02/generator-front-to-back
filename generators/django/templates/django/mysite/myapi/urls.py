from django.urls import include, path
from rest_framework import routers
from . import views

# REST Framework router automatically updates URLs to match the database
router = routers.DefaultRouter()
router.register(r'blogEntries', views.BlogEntryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]