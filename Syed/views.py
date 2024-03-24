from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import status, views, permissions
from rest_framework.response import Response
from .models import Study
from ResearchSwipe.models import User
from .serializers import StudySerializer


class StudyCreate(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Get the authenticated user
        User = get_user_model()
        user = request.user
        
        # Filter studies based on the user's ID
        studies = Study.objects.filter(user=user)
        serializer = StudySerializer(studies, many=True)  # Serialize the filtered queryset
        return Response(serializer.data)  # Return serialized data as response

    def post(self, request, *args, **kwargs):
        serializer = StudySerializer(data=request.data)
        if serializer.is_valid():
            # Assuming you want to save the user automatically
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        # Get the authenticated user
        User = get_user_model()
        user = request.user
        
        # Get the study object to delete
        study_id = kwargs.get('study_id')  # Assuming 'study_id' is passed as a parameter in the URL
        study = get_object_or_404(Study, pk=study_id, user=user)

        # Delete the study object, which will cascade delete related objects due to ForeignKey and ManyToManyField relationships
        study.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    
