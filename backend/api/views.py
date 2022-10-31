from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


from .serializers import TeamSerializer
from .models import Team
from .getTable import searchTable


class clubManagersInfo(APIView):

    def get(self, request, slug, * args, **kwargs):
        team = Team.objects.get(slug=slug)
        serializer = TeamSerializer(team)
        return Response(serializer.data)


class premierLeagueTable(APIView):
    def get(self, request, * args, **kwargs):
        response = Response(searchTable(), status=status.HTTP_200_OK)
        return response

