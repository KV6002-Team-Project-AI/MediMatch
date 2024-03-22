from django.shortcuts import render
from rest_framework import status, views, permissions
from rest_framework.response import Response
from .models import Study
from ResearchSwipe.models import User
from .serializers import StudySerializer


class StudyCreate(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        studies = Study.objects.all()  # Retrieve all studies from the database
        serializer = StudySerializer(studies, many=True)  # Serialize the queryset
        return Response(serializer.data)  # Return serialized data as response

    def post(self, request, *args, **kwargs):
        serializer = StudySerializer(data=request.data)
        if serializer.is_valid():
            # Assuming you want to save the user automatically
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)