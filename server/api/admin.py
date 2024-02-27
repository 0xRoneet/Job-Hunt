from django.contrib import admin
from . import models
# Register your models here.

admin.site.register(models.Tags)
admin.site.register(models.Job)
admin.site.register(models.UserProfile)
admin.site.register(models.Org)
admin.site.register(models.JobTagRelations)
admin.site.register(models.UserTagRelations)
admin.site.register(models.Applications)
