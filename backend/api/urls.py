from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings
from . import views
from django.urls import path, include


urlpatterns = [
    path("club/<str:slug>", views.clubManagersInfo.as_view(), name="api-overview"),
    path("league_table", views.premierLeagueTable.as_view(), name="premier_league"),
    
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
