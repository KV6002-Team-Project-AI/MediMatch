from django.shortcuts import get_object_or_404
from ResearchSwipe.models import User, Recruitee, Recruiter
from .utils import generate_paragraph 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.management import call_command


class GenerateSummariesAPIView(APIView):
    def get(self, request):
        try:
            call_command('summarize_recruitees')  # Replace 'generate_summaries' with the name of your command
            return Response({'message': 'Summaries for recruitees have been successfully updated.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



