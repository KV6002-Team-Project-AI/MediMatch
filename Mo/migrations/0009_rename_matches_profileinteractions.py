# Generated by Django 4.2.11 on 2024-03-19 16:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Syed', '0003_study_health_status_study_work_preference_and_more'),
        ('ResearchSwipe', '0008_alter_recruitee_ethnicity'),
        ('Mo', '0008_matches_delete_profileinteraction'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Matches',
            new_name='ProfileInteractions',
        ),
    ]