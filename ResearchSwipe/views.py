from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Recruitee, Recruiter
from .serializers import RecruiteeSerializer, RecruiterSerializer

class RecruiteeSignup(APIView):
    def post(self, request):
        serializer = RecruiteeSerializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.validated_data.pop('user')
            user = User.objects.create_user(**user_data, is_recruitee=True)
            Recruitee.objects.create(user=user, **serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecruiterSignup(APIView):
    def post(self, request):
        serializer = RecruiterSerializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.validated_data.pop('user')
            user = User.objects.create_user(**user_data, is_recruiter=True)
            Recruiter.objects.create(user=user, **serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
