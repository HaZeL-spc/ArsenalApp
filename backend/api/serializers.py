from .getArticles import searchArticles
from rest_framework import serializers
from .models import Team, Manager


class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = ('id', 'first_name', 'last_name',
                  'year_start', 'year_end', 'image')


class TeamSerializer(serializers.ModelSerializer):
    manager_set = ManagerSerializer(many=True, read_only=True)
    articles = serializers.SerializerMethodField()

    def get_articles(self, instance):
        return searchArticles(instance.slug)

    class Meta:
        model = Team
        fields = ('id', 'name', 'slug', 'manager_set', 'articles')
