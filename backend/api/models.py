from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.text import slugify


def upload_to(instance, filename):
    print(instance, filename)
    return 'images/{filename}'.format(filename=filename)


class Team(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True, null=True, blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Team, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Manager(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    year_start = models.IntegerField()
    year_end = models.IntegerField()
    image = models.ImageField(
        _("Image"), upload_to=upload_to, default='images/default.jpg')
    team = models.ForeignKey(
        Team, on_delete=models.CASCADE, blank=True, null=True)
