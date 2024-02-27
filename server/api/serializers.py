from rest_framework import serializers
from . import models


class OrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Org
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tags
        fields = '__all__'

class JobTagSerializer(serializers.ModelSerializer):
    Tag = TagSerializer(many = False)
    class Meta:
        model = models.JobTagRelations
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = '__all__'

class JobSerialzier(serializers.ModelSerializer):
    Org = OrgSerializer(many = False)
    Tags = JobTagSerializer(many = True)
    class Meta:
        model = models.Job
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    Job = JobSerialzier(many=False)
    Applicant = UserSerializer(many=False)
    class Meta:
        model = models.Applications
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = ['FName', 'MName', 'LName', ]

class OrgCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Org
        fields = ['Name', 'Description', 'Image', 'Address']

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = ['FName', 'MName', 'LName', 'DOB', 'Image']
