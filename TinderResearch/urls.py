from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from ResearchSwipe.views import UserSignup, RecruiteeDetail, RecruiterDetail, UserLoginView, UserRolesView, ValidateTokenView, CookieLoggingMiddleware
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView


urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Add your API endpoints here
    path('api/signup/', UserSignup.as_view(), name='user_signup'),
    path('api/recruitee/', RecruiteeDetail.as_view(), name='recruitee_detail'),
    path('api/recruiter/', RecruiterDetail.as_view(), name='recruiter_detail'),
    path('api/login/', UserLoginView.as_view(), name='user_login'),
    path('api/user', UserRolesView.as_view(), name='user-roles'),
    path('api/validate_token/', ValidateTokenView.as_view(), name='validate_token'),
    #path('api/cookie/', CookieLoggingMiddleware.as_view(), name='cookie'),
    
    # ... include your other url patterns here ...

    # The catch-all pattern for your React frontend should be the last pattern
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
