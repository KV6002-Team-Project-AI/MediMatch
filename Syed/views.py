from django.shortcuts import render

from rest_framework import status, views, permissions, generics
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .models import Study
from ResearchSwipe.models import User
from .serializers import StudySerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings


# Create your views here.

class StudyCreateAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # This is optional, only if you need to send initial data to your React form
        initial_data = {
            # Include any initial data you want to send, for example:
            # "categories": Category.objects.all().values_list('name', flat=True)
        }
        return Response(initial_data)

    def post(self, request, *args, **kwargs):
        serializer = StudySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Assuming you want to save the user automatically
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)