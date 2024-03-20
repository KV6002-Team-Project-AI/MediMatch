# Generated by Django 4.2.11 on 2024-03-19 14:02

import ResearchSwipe.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ResearchSwipe', '0007_recruitee_bio_recruitee_interest_1_and_more'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='user',
            managers=[
                ('objects', ResearchSwipe.models.UserManager()),
            ],
        ),
        migrations.AlterField(
            model_name='recruitee',
            name='ethnicity',
            field=models.CharField(blank=True, choices=[('asian', 'Asian or Asian British'), ('indian', 'Indian'), ('pakistani', 'Pakistani'), ('bangladeshi', 'Bangladeshi'), ('chinese', 'Chinese'), ('other_asian', 'Any other Asian background'), ('black', 'Black or Black British'), ('caribbean', 'Caribbean'), ('african', 'African'), ('other_black', 'Any other Black, Black British, or Caribbean background'), ('mixed', 'Mixed or multiple ethnic groups'), ('white', 'White'), ('british', 'English, Welsh, Scottish, Northern Irish or British'), ('irish', 'Irish'), ('gypsy_irish_traveller', 'Gypsy or Irish Traveller'), ('roma', 'Roma'), ('other_white', 'Any other White background'), ('white_caribbean', 'White and Caribbean'), ('white_african', 'White and African'), ('white_asian', 'White and Asian'), ('other_mixed', 'Any other Mixed or multiple ethnic background'), ('other', 'Other ethnic group'), ('arab', 'Arab'), ('any_other', 'Any other ethnic group')], max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]