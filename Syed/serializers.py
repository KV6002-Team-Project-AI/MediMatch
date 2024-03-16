from rest_framework import serializers
from .models import Study

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Study
        fields = ('user_id', 
                  'study_name',
                 )