from django.urls import path
from .views import RefreshRejectedProfile

urlpatterns = [
    path('refresh_rejected/', RefreshRejectedProfile.as_view(), name='refresh_rejected'),
]
