from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from . import models
from . import serializers
from social_django.utils import psa

from requests.exceptions import HTTPError
from django.db.models import Q
from django.core import exceptions


@api_view(['POST'])
@permission_classes([AllowAny])
@psa()
def register_by_access_token(request, backend):
    token = request.data.get('access_token')
    user = request.backend.do_auth(token)
    print(request)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response(
            {
                'token': token.key
            },
            status=status.HTTP_200_OK,
            )
    else:
        return Response(
            {
                'errors': {
                    'token': 'Invalid token'
                    }
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

@api_view(['POST'])
def RegisterPassword(request):
    UserName = request.data.get('UserName')
    Password = request.data.get('PassWord')
    try:
        models.User.objects.get(username = UserName)
        return Response({
            'status':False,
            'detail':'username_not_unique'
        })
    except exceptions.ObjectDoesNotExist:
        pass
    NewUser = models.User.objects.create(username = UserName)
    NewUser.set_password(Password)
    NewUser.save()
    Key,_ = Token.objects.get_or_create(user = NewUser)
    return Response({
        'status':True,
        'key':Key.key
    })

@api_view(['POST', 'GET'])
def ManageProfile(request):
    CurrentUser = request.auth.user.Profile
    if request.method == 'POST':
        Serialized = serializers.UserProfileUpdateSerializer(data=request.data, instance=CurrentUser)
        if Serialized.is_valid():
            Serialized.save(Initalized = True)
            return Response({
                'status':True
            })
        else:
            return Response({
                'status':False,
                'detail':'invalid_data'
            })
    if request.method == 'GET':
        Serialized = serializers.UserProfileSerializer(CurrentUser, many=False)
        return Response({
            'status':True,
            'data':Serialized.data
        })

@api_view(['POST'])
def LoginPassword(request):
    UserName = request.data.get('UserName')
    Password = request.data.get('PassWord')
    try:
        User = models.User.objects.get(username = UserName)
    except exceptions.ObjectDoesNotExist:
        return Response({
            'status':False,
            'detail':'invalid_username'
        })
    if User.check_password(Password):
        Key,_ = Token.objects.get_or_create(user = User)
        return Response({
            'status':True,
            'key':Key.key
        })
    else:
        return Response({
            'status':False,
            'detail':'wrong_password'
        })
@api_view(['POST'])
@permission_classes([AllowAny])

def FilterJobs(request):
    Tags = request.data.get('Tags')
    TagList = []
    for Tag in Tags:
        print(Tag['Tag'])
        try:
            TagId = models.Tags.objects.get(Name = Tag['Tag']).id
            TagList.append(TagId)
            print(TagId)
        except exceptions.ObjectDoesNotExist:
            pass
    
    TagJobs = models.JobTagRelations.objects.filter(Tag_id__in = TagList).values_list('Job_id', flat=True)
    JobsMatched = models.Job.objects.filter(id__in = TagJobs)

    AllowsRemote = request.data.get('AllowsRemote')
    if AllowsRemote != None:
        JobsMatched = JobsMatched.filter(AllowsRemote=AllowsRemote)
    Dist = request.data.get('Distance')
    if Dist != None:
        Lat = request.data.get('Lat')
        Lon = request.data.get('Lon')
        JobsMatched = JobsMatched.filter(Q(Lat__lte = Lat+Dist)|Q(AllowsRemote = True))
        JobsMatched = JobsMatched.filter(Q(Lat__gte = Lat-Dist)|Q(AllowsRemote = True))
        JobsMatched = JobsMatched.filter(Q(Lon__lte = Lon+Dist)|Q(AllowsRemote = True))
        JobsMatched = JobsMatched.filter(Q(Lat__gte = Lon-Dist)|Q(AllowsRemote = True))

    Serialized = serializers.JobSerialzier(JobsMatched, many=True)
    

    return Response({
        'status':True,
        'count':0,
        'data':Serialized.data
    
    })

@api_view(['GET', 'POST', 'DELETE'])
def AppplyForJob(request, pk):
    CurrentUser = request.auth.user.Profile
    try:
        Job = models.Job.objects.get(id = pk)
    except exceptions.ObjectDoesNotExist:
        return Response({
            'status':False,
            'detail':'invalid_job_id'
        })
    try:
        Existing = models.Applications.objects.get(Applicant = CurrentUser, Job = Job)
        if request.method == 'DELETE':
            Existing.delete()
            Job.ApplicationCount = Job.ApplicationCount - 1
            Job.save()
            return Response({
                'status':True
            })
        if request.method == 'GET':
            Serialized = serializers.ApplicationSerializer(Existing, many=False)
            return Response({
                'status':True,
                'data':Serialized.data
            })
        return Response({
            'status':False,
            'detail':'already_exists'
        })
    except exceptions.ObjectDoesNotExist:
        if request.method == 'DELETE' or request.method == 'GET':
            return Response({
                'status':False,
                'detail':'application_does_not_exist'
            })
        pass
    ProposedPrice = request.data.get('Proposed')
    if ProposedPrice != None and Job.IsNegotiable == True:
        pass
    else:
        ProposedPrice = Job.Cost
        
    NewApplication = models.Applications.objects.create(Job = Job, Applicant = CurrentUser, Proposal=ProposedPrice)
    Job.ApplicationCount = Job.ApplicationCount + 1
    Job.save()
    return Response({
        'status':True,
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def ViewOrg(request, pk):
    try:
        Org = models.Org.objects.get(id = pk)
    except exceptions.ObjectDoesNotExist:
        pass
    Seralized = serializers.OrgSerializer(Org, many=False)
    return Response({
        'status':False,
        'data':Seralized.data
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def ViewOrgJobs(request, pk):
    try:
        Org = models.Org.objects.get(id = pk)
    except exceptions.ObjectDoesNotExist:
        pass
    Tags = request.data.get('Tags')
    TagList = []
    if Tags != None:
        for Tag in Tags:
            print(Tag['Tag'])
            try:
                TagId = models.Tags.objects.get(Name = Tag['Tag']).id
                TagList.append(TagId)
                print(TagId)
            except exceptions.ObjectDoesNotExist:
                pass
        
        JobIDs = models.JobTagRelations.objects.filter(Tag_id__in = TagList).values_list('Job_id', flat=True)
        Jobs = models.Job.objects.filter(Org = Org, id__in = JobIDs)
    else:
        Jobs = models.Job.objects.filter(Org = Org)
    Sort = request.data.get('Sort')
    if Sort == 'Cost':
        Jobs.order_by("Cost")
    if Sort == '-Cost':
        Jobs.order_by("-Cost")
    Serialized = serializers.JobSerialzier(Jobs, many=True)
    return Response({
        'status':True,
        'data':Serialized.data
    })


@api_view(['GET', 'DELETE', 'POST'])
def ManageOrg(request):
    CurrentUser = request.auth.user.Profile
    if request.method == 'POST':
        try:
            Org = models.Org.objects.get(ManagedBy=CurrentUser)
            Serialized = serializers.OrgCreationSerializer(data=request.data, instance=Org)
            if Serialized.is_valid():
                NewOrg = Serialized.save(ManagedBy = CurrentUser)
                ReSerialized = serializers.OrgSerializer(NewOrg, many=False)
                return Response({
                    'status':True,
                    'data':ReSerialized.data
                })
            else:
                return Response({
                    'status':False,
                    'detail':'invalid_data'
            })
        except exceptions.ObjectDoesNotExist:
            pass
        Serialized = serializers.OrgCreationSerializer(data=request.data)
        if Serialized.is_valid():
            NewOrg = Serialized.save(ManagedBy = CurrentUser)
        else:
            return Response({
                'status':False,
                'detail':'invalid_data'
            })
        ReSerialized = serializers.OrgSerializer(NewOrg, many=False)
        return Response({
            'status':True,
            'data':ReSerialized.data
        })
    if request.method == 'DELETE':
        try:
            Org = models.Org.objects.get(ManagedBy=CurrentUser)
            Org.delete()
            return Response({
                'status':True,
            })
        except exceptions.ObjectDoesNotExist:
            return Response({
                'status':False,
                'detail':'does_not_manage'
            })
    if request.method == 'GET':
        try:
            Org = models.Org.objects.get(ManagedBy=CurrentUser)
            Serialized = serializers.OrgSerializer(Org, many=False)
            return Response({
                'status':True,
                'data':Serialized.data
            })
        except exceptions.ObjectDoesNotExist:
            return Response({
                'status':False,
                'detail':'does_not_manage'
            })

@api_view(['GET', 'POST'])
def ManageOrgJobs(request):
    CurrentUser = request.auth.user.Profile
    try:
        Org = models.Org.objects.get(ManagedBy=CurrentUser)
    except exceptions.ObjectDoesNotExist:
        return Response({
            'status':False,
            'detail':'does_not_manage'
        })
    if request.method == 'POST':
        Name = request.data.get('Name')
        Description = request.data.get('Description')
        Cost = request.data.get('Cost')
        Tags = request.data.get('Tags')
        AllowsRemote = request.data.get('AllowsRemote')
        IsNegotiable = request.data.get('IsNegotiable')
        Lat = request.data.get('Lat')
        Lon = request.data.get('Lon')
        NewJob = models.Job.objects.create(Name = Name, Description = Description, AllowsRemote = AllowsRemote, Cost = Cost, Lat = Lat, Lon = Lon, Org = Org)
        for Tag in Tags:
            try:
                TagMatch = models.Tags.objects.get(Name = Tag["Tag"])
            except exceptions.ObjectDoesNotExist:
                TagMatch = models.Tags.objects.create(Name = Tag["Tag"])
            try:
                models.JobTagRelations.objects.get(Tag=TagMatch, Job=NewJob)
                continue
            except exceptions.ObjectDoesNotExist:
                pass
            models.JobTagRelations.objects.create(Tag=TagMatch, Job=NewJob)
            TagMatch.JobCount = TagMatch.JobCount + 1
            TagMatch.save()
        return Response({
            'status':True,
        })
    if request.method == 'GET':
        Jobs = models.Job.objects.filter(Org = Org)
        Serialized = serializers.JobSerialzier(Jobs, many=True)
        return Response({
            'status':True,
            'data':Serialized.data
        })
    
@api_view(['GET', 'POST', 'DELETE'])
def ManageOrgJob(request, pk):
    CurrentUser = request.auth.user.Profile
    try:
        Org = models.Org.objects.get(ManagedBy=CurrentUser)
        Job = models.Job.objects.get(Org = Org, id = pk)
    except exceptions.ObjectDoesNotExist:
        return Response({
            'status':False,
            'detail':'does_not_manage'
        })
    if request.method == 'GET':
        Applicants = models.Applications.objects.filter(Job = Job)
        Sort = request.GET.get('sort')
        if Sort == 'lcost':
            Applicants = Applicants.order_by('cost')
        if Sort == 'gcost':
            Applicants = Applicants.order_by('-cost')
        if Sort == 'gtime':
            Applicants = Applicants.order_by('id')
        if Sort == 'ltime':
            Applicants = Applicants.order_by('-id')
        Serialized = serializers.ApplicationSerializer(Applicants, many=True)
        return Response({
            'status':True,
            'data':Serialized.data
        })
    if request.method == 'POST':
        try:
            ApplicantId = request.data.get('ApplicantId')
            Applicant = models.Applications.objects.get(Job = Job, id = ApplicantId)
        except exceptions.ObjectDoesNotExist:
            return Response({
                'status':False,
                'detail':'does_not_manage'
            })
        Applicant.Chosen = True
        Applicant.save()
        Job.IsActive = False
        Job.save()
        OtherApplicants = models.Applications.objects.filter(Job = Job).exclude(id=ApplicantId)
        OtherApplicants.update(Chosen=False)
        OtherApplicants.save()       
        Serialized = serializers.ApplicationSerializer(Applicant, many=False)
        return Response({
            'status':True,
            'detail':Serialized.data
        })