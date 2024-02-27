from django.db import models
from django.contrib.auth.models import User

# Create your models here.
    

class UserProfile(models.Model):
    Initalized = models.BooleanField(default=False)
    FName = models.CharField(max_length=128, null=True, blank=True)
    MName = models.CharField(max_length=128, null=True, blank=True)
    LName = models.CharField(max_length=128, null=True, blank=True)
    DOB = models.DateField(auto_now=False, null=True, blank=True)
    Image = models.ImageField(null=True, blank=True)
    User = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE, related_name='Profile')

class Org(models.Model):
    Name = models.CharField(max_length=128)
    Address = models.CharField(max_length=1024),
    Image = models.ImageField(null=True, blank=True)
    Joined = models.DateTimeField(auto_now_add=True)
    Description = models.CharField(max_length=8192)
    ManagedBy = models.OneToOneField(UserProfile, null=True, blank=True, on_delete=models.SET_NULL)

class Tags(models.Model):
    Name = models.CharField(max_length=256)
    UserCount = models.IntegerField(default=1)
    JobCount = models.IntegerField(default=0)


class Job(models.Model):
    Org = models.ForeignKey(Org, null=True, blank=False, on_delete=models.CASCADE)
    Name = models.CharField(max_length=128)
    Description = models.CharField(max_length=8192)
    Cost = models.IntegerField()
    IsNegotiable = models.BooleanField(default=False)
    Address = models.CharField(max_length=2048, null=True, blank=True)
    Lat = models.FloatField(null=True, blank=True)
    Lon = models.FloatField(null=True, blank=True)
    AllowsRemote = models.BooleanField(default=False)
    ApplicationCount = models.IntegerField(default=0)
    IsActive = models.BooleanField(default=True)

class JobMedia(models.Model):
    Job = models.ForeignKey(Job, on_delete=models.CASCADE)
    Image = models.ImageField()
    File = models.FileField()

class JobTagRelations(models.Model):
    Tag = models.ForeignKey(Tags, null=False, blank=False, on_delete=models.CASCADE, related_name='Jobs')
    Job = models.ForeignKey(Job, null=False, blank=False, on_delete=models.CASCADE, related_name='Tags')
    ProficiencyLevel = models.IntegerField(default=0, null=False, blank=False)
    Years = models.IntegerField(default=0, null=False, blank=False)

class UserTagRelations(models.Model):
    Tag = models.ForeignKey(Tags, null=False, blank=False, on_delete=models.CASCADE)
    Job = models.ForeignKey(UserProfile, null=False, blank=False, on_delete=models.CASCADE)
    ProficiencyLevel = models.IntegerField(default=0, null=False, blank=False)
    Years = models.IntegerField(default=0, null=False, blank=False)

class Applications(models.Model):
    Applicant = models.ForeignKey(UserProfile, null=False, on_delete=models.CASCADE)
    Job = models.ForeignKey(Job, null=False, blank=False, on_delete=models.CASCADE)
    Time = models.DateTimeField(auto_now_add=True, null=True, blank = True)
    Proposal = models.IntegerField(null=True, blank=True)
    Chosen = models.BooleanField(default=None, null=True, blank=True)
    
    