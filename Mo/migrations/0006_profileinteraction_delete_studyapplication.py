# Generated by Django 4.2.11 on 2024-03-19 00:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Syed', '0003_study_health_status_study_work_preference_and_more'),
        ('ResearchSwipe', '0008_alter_recruitee_ethnicity'),
        ('Mo', '0005_studyapplication_delete_profileinteraction'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProfileInteraction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.BooleanField(default=False, help_text='True for accepted, False for rejected')),
                ('recruitee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='interactions', to='ResearchSwipe.recruitee')),
                ('study', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='interactions', to='Syed.study')),
            ],
            options={
                'unique_together': {('study', 'recruitee')},
            },
        ),
        migrations.DeleteModel(
            name='StudyApplication',
        ),
    ]