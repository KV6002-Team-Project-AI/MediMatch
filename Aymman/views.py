from rest_framework import status, views, permissions, generics
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from ResearchSwipe.models import User, Recruitee, Recruiter
from .serializers import UserSerializer, RecruiteeSerializer, RecruiterSerializer, MyAuthTokenSerializer, UserRoleSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
import logging
from ResearchSwipe.datavalidation import *
from rest_framework.views import APIView
from django.core import serializers
import requests
import json
from django.http import HttpResponse
from django.core.serializers.json import DjangoJSONEncoder
import json
from Syed.models import Study


class RecruiteeDetail(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, user, pk=None):
        if user.is_superuser and pk:
            try:
                return Recruitee.objects.get(pk=pk)
            except Recruitee.DoesNotExist:
                return None
        return user.recruitee

    def get(self, request, pk=None, *args, **kwargs):
        if hasattr(request.user, 'is_recruiter') and request.user.is_recruiter:
            return Response({"error": "Recruiter cannot access recruitee details"}, status=status.HTTP_403_FORBIDDEN)

        recruitee = self.get_object(request.user, pk)
        if recruitee is None:
            return Response({"error": "Recruitee not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = RecruiteeSerializer(recruitee)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        if hasattr(request.user, 'is_recruitee') and not request.user.is_recruitee:
            return Response({"error": "User is not a recruitee"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = RecruiteeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        try:
            recruitee = Recruitee.objects.get(user=request.user)
        except Recruitee.DoesNotExist:
            return Response({"error": "Recruitee not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = RecruiteeSerializer(recruitee, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecruiterDetail(views.APIView):
    permission_classes = [permissions.IsAuthenticated]  # Ensure user is authenticated

    def post(self, request, *args, **kwargs):
        if not request.user.is_recruiter:
            return Response({"error": "User is not a recruiter"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = RecruiterSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)  # Associate the recruiter profile with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    





def get_Recruitee(request, pk):
    try:
        recruitee = Recruitee.objects.get(id=pk)
    except Recruitee.DoesNotExist:
        return HttpResponse(json.dumps({'error': 'Recruitee not found'}), content_type="application/json", status=404)
    
    fields = [field.name for field in recruitee._meta.fields if field.get_internal_type() != 'ForeignKey']
    
    recruitee_data = {field: getattr(recruitee, field) for field in fields}
    
    recruitee_data['user'] = str(recruitee.user)  
    
    response_data = json.dumps(recruitee_data, cls=DjangoJSONEncoder)
    
    return HttpResponse(response_data, content_type="application/json")

def get_study(request, pk):
    try:
        Studyy = Study.objects.get(id=pk)
    except Study.DoesNotExist:
        return HttpResponse(json.dumps({'error': 'study not found'}), content_type="application/json", status=404)
    
    fields = [field.name for field in Studyy._meta.fields if field.get_internal_type() != 'ForeignKey']
    
    Study_data = {field: getattr(Studyy, field) for field in fields}
    
    Study_data['user'] = str(Studyy.user)  
    
    response_data = json.dumps(Study_data, cls=DjangoJSONEncoder)
    
    return HttpResponse(response_data, content_type="application/json")

def get_studies(request):
    Study_queryset = Study.objects.all()
    Study_list = []

    for Studies in Study_queryset:
         
        fields = [field.name for field in Studies._meta.fields if field.get_internal_type() != 'ForeignKey']
        
        Study_data = {field: getattr(Studies, field) for field in fields}
   
        Study_data['user'] = str(Studies.user)  
        

        Study_list.append(Study_data)

    response_data = json.dumps(Study_list, cls=DjangoJSONEncoder)
    
    return HttpResponse(response_data, content_type="application/json")

def get_Recruitees(request):
    recruitee_queryset = Recruitee.objects.all()
    recruitee_list = []

    for recruitee in recruitee_queryset:
        
        fields = [field.name for field in recruitee._meta.fields if field.get_internal_type() != 'ForeignKey']
        #
        recruitee_data = {field: getattr(recruitee, field) for field in fields}
   
        recruitee_data['user'] = str(recruitee.user)  
        

        recruitee_list.append(recruitee_data)

    response_data = json.dumps(recruitee_list, cls=DjangoJSONEncoder)
    
    return HttpResponse(response_data, content_type="application/json")

