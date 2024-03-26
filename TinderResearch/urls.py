from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from ResearchSwipe.views import *
from Syed.views import StudyCreate, MatchedRecruitees, MatchedRecruiters
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from Aymman.views import get_Recruitee, get_Recruitees, get_studies,get_study, get_Recruitees_aymane,get_studies_aymane
from Mo.views import MatchActionView, RecruiterMatchUpdateView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Jed's API paths from ResearchSwipe
    path('api/signup/', UserSignup.as_view(), name='user_signup'),
    path('api/recruitee/', RecruiteeDetail.as_view(), name='recruitee_detail'),
    path('api/recruiter/', RecruiterDetail.as_view(), name='recruiter_detail'),
    path('api/login/', UserLoginView.as_view(), name='user_login'),
    path('api/user', UserRolesView.as_view(), name='user-roles'),
    path('api/validate_token/', ValidateTokenView.as_view(), name='validate_token'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/dropdown-choices/', DropdownChoicesAPIView.as_view(), name='dropdown-choices'),
    path('api/update-profile-image/', UpdateProfileImageView.as_view(), name='update-profile-image'),
   
    # Ayman paths
    path('api/get-recruitees/', get_Recruitees, name='get_recruitees'),
    path('api/get-recruitee/<int:pk>/', get_Recruitee, name='get_single_recruitee'),
    path('api/get-study/<int:pk>/', get_study, name='get_single_study'),
    path('api/get-studies/', get_studies, name='get_studies'),
    path('api/get-recruitees-aymane/', get_Recruitees_aymane, name='get_Recruitees_aymane'),
    path('api/get-studies-aymane/', get_studies_aymane, name='get_studies_aymane'),

    # Syed Paths
    path('api/studycreate/', StudyCreate.as_view(), name='study-create'),
    path('api/studydelete/<int:study_id>/', StudyCreate.as_view(), name='study_delete'),

    path('api/matchedrecruitees/', MatchedRecruitees.as_view(), name='matched_recruitees'),
    path('api/matchedrecruiters/', MatchedRecruiters.as_view(), name='matched_recruiters'),
    

    #Mo paths
    path('api/recruiter/matches/', RecruiterMatchUpdateView.as_view(), name='recruiter-match-update'),
    path('api/recruitee/matches/', MatchActionView.as_view(), name='matches'),

    # The catch-all pattern for your React frontend should be the last pattern
    re_path(r'^(?!admin|media|static/).*$', TemplateView.as_view(template_name='index.html')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
