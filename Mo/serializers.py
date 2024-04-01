"""
Serializers module for the recruitment platform.

This module defines serializers to convert queryset and model instances into JSON so that the data can be rendered into
JSON, XML, or other content types. Serializers also provide deserialization, allowing parsed data to be converted back
into complex types, after first validating the incoming data.

Classes:
- CustomRecruiteeSerializer: Extends the RecruiteeSerializer to include a custom set of fields that represent the recruitee's profile.
- CustomRecruiterSerializer: Extends the RecruiterSerializer to include a custom set of fields specific to recruiters.
- CustomStudySerializer: Extends the StudySerializer to provide a tailored serializer for studies with a specific set of fields.
- ProfileInteractionSerializer: A model serializer for match instances between recruitees and studies. It includes nested serialization for
  study details, recruitee profiles, and recruiter information.

The serializers use the Meta class inherited from the base serializers to customize the fields that are included in the serialized output.
For the ProfileInteractionSerializer, read-only fields are used to fetch information from related models without the need for additional queries.

The CustomRecruiteeSerializer, CustomRecruiterSerializer, and CustomStudySerializer are used within the ProfileInteractionSerializer
to provide detailed information about the study, recruitee, and recruiter involved in a match. This approach allows for a comprehensive
view of match instances, suitable for API responses that require detailed object representation.

Dependencies:
- rest_framework.serializers: Base serializer classes from Django REST Framework.
- .models.Matches: The Matches model from the current application's models.
- ResearchSwipe.serializers.RecruiteeSerializer, RecruiterSerializer: Base serializers for recruitee and recruiter profiles.
- Syed.serializers.StudySerializer: The base serializer for studies.

Usage:
These serializers are intended to be used in views and API endpoints where match data, along with detailed information about
recruitees, recruiters, and studies, need to be serialized or deserialized for HTTP responses or requests.
"""

from rest_framework import serializers
from .models import Matches
from ResearchSwipe.serializers import RecruiteeSerializer, RecruiterSerializer
from Syed.serializers import StudySerializer


class CustomRecruiteeSerializer(RecruiteeSerializer):
    class Meta(RecruiteeSerializer.Meta):
        fields = (
            'user_id',
            'full_name',
            'age',
            'biological_sex',
            'medical_history_details',
            'height',
            'weight',
            'profession',
            'work_preference',
            'health_status',
            'socioeconomic_status',
            'ethnicity',
            'activity_level',
            'study_preference',
            'interest_1',
            'interest_2',
            'interest_3',
            'interest_4',
            'bio',
            'summary'
        )

class CustomRecruiterSerializer(RecruiterSerializer):
    class Meta(RecruiterSerializer.Meta):
        fields = (
            'user_id', 
            'profile_image_url',
            'research_area',
            'company_info'
        )


class ProfileInteractionSerializer(serializers.ModelSerializer):
    study_info = StudySerializer(source='study', read_only=True)
    recruitee_status = serializers.ChoiceField(choices=Matches.STATUS_CHOICES, default='pending')
    study_status = serializers.ChoiceField(choices=Matches.STATUS_CHOICES, default='pending')
    recruitee = CustomRecruiteeSerializer(source='user', read_only=True)
    recruiter_info = CustomRecruiterSerializer(source='recruiter', read_only=True)

    class Meta:
        model = Matches
        fields = ('match_id', 'study_info', 'recruitee_status', 'study_status', 'recruitee', 'recruiter_info')
