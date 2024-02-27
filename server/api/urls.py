from django.urls import path
from . import views
urlpatterns = [   
    path('auth/google', views.register_by_access_token),
    path('auth/register', views.RegisterPassword),
    path('auth/login', views.LoginPassword),

    path('profile', views.ManageProfile),

    path('jobs/filter', views.FilterJobs),
    path('jobs/applications/<str:pk>', views.AppplyForJob),

    path('orgs/<str:pk>', views.ViewOrg),
    path('orgs/<str:pk>/jobs', views.ViewOrgJobs),

    path('manage/org', views.ManageOrg),
    path('manage/org/jobs', views.ManageOrgJobs),
    path('manage/org/jobs/<str:pk>', views.ManageOrgJob)
]