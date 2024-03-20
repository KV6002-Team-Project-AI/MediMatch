# Generated by Django 4.2.11 on 2024-03-20 17:13

import ResearchSwipe.models
from django.conf import settings
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('is_recruitee', models.BooleanField(default=False)),
                ('is_recruiter', models.BooleanField(default=False)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', ResearchSwipe.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Recruitee',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('age', models.PositiveIntegerField(blank=True, null=True)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('contact_information', models.TextField(blank=True, null=True)),
                ('emergency_contact', models.TextField(blank=True, null=True)),
                ('has_medical_history', models.BooleanField(default=False)),
                ('medical_history_details', models.TextField(blank=True, null=True)),
                ('taking_current_medications', models.BooleanField(default=False)),
                ('current_medication_details', models.TextField(blank=True, null=True)),
                ('has_medication_history', models.BooleanField(default=False)),
                ('medication_history_details', models.TextField(blank=True, null=True)),
                ('has_allergies', models.BooleanField(default=False)),
                ('allergy_details', models.TextField(blank=True, null=True)),
                ('has_family_medical_history', models.BooleanField(default=False)),
                ('family_medical_history_details', models.TextField(blank=True, null=True)),
                ('bio', models.TextField(blank=True, null=True)),
                ('lifestyle_factors', models.TextField(blank=True, null=True)),
                ('health_status', models.CharField(blank=True, choices=[('good', 'Good'), ('fair', 'Fair'), ('poor', 'Poor')], max_length=50, null=True)),
                ('activity_level', models.CharField(blank=True, choices=[('sedentary', 'Sedentary'), ('light', 'Light Activity'), ('moderate', 'Moderate Activity'), ('active', 'Active')], max_length=50, null=True)),
                ('socioeconomic_status', models.CharField(blank=True, choices=[('low', 'Low'), ('middle', 'Middle'), ('high', 'High')], max_length=50, null=True)),
                ('hair_color', models.CharField(blank=True, choices=[('black', 'Black'), ('brown', 'Brown'), ('blonde', 'Blonde'), ('ginger', 'Ginger'), ('gray', 'Gray'), ('white', 'White')], max_length=50, null=True)),
                ('ethnicity', models.CharField(blank=True, choices=[('asian', 'Asian or Asian British'), ('indian', 'Indian'), ('pakistani', 'Pakistani'), ('bangladeshi', 'Bangladeshi'), ('chinese', 'Chinese'), ('other_asian', 'Any other Asian background'), ('black', 'Black or Black British'), ('caribbean', 'Caribbean'), ('african', 'African'), ('other_black', 'Any other Black, Black British, or Caribbean background'), ('mixed', 'Mixed or multiple ethnic groups'), ('white', 'White'), ('british', 'English, Welsh, Scottish, Northern Irish or British'), ('irish', 'Irish'), ('gypsy_irish_traveller', 'Gypsy or Irish Traveller'), ('roma', 'Roma'), ('other_white', 'Any other White background'), ('white_caribbean', 'White and Caribbean'), ('white_african', 'White and African'), ('white_asian', 'White and Asian'), ('other_mixed', 'Any other Mixed or multiple ethnic background'), ('other', 'Other ethnic group'), ('arab', 'Arab'), ('any_other', 'Any other ethnic group')], max_length=100, null=True)),
                ('work_preference', models.CharField(blank=True, choices=[('group', 'Group'), ('solo', 'Solo'), ('no preference', 'No Preference')], max_length=50, null=True)),
                ('nationality', models.CharField(blank=True, choices=[('afghan', 'Afghan'), ('albanian', 'Albanian'), ('algerian', 'Algerian'), ('american', 'American'), ('andorran', 'Andorran'), ('angolan', 'Angolan'), ('anguillan', 'Anguillan'), ('antigua_and_barbuda', 'Citizen of Antigua and Barbuda'), ('argentine', 'Argentine'), ('armenian', 'Armenian'), ('australian', 'Australian'), ('austrian', 'Austrian'), ('azerbaijani', 'Azerbaijani'), ('bahamian', 'Bahamian'), ('bahraini', 'Bahraini'), ('bangladeshi', 'Bangladeshi'), ('barbadian', 'Barbadian'), ('belarusian', 'Belarusian'), ('belgian', 'Belgian'), ('belizean', 'Belizean'), ('beninese', 'Beninese'), ('bermudian', 'Bermudian'), ('bhutanese', 'Bhutanese'), ('bolivian', 'Bolivian'), ('bosnia_and_herzegovina', 'Citizen of Bosnia and Herzegovina'), ('botswanan', 'Botswanan'), ('brazilian', 'Brazilian'), ('british', 'British'), ('british_virgin_islander', 'British Virgin Islander'), ('bruneian', 'Bruneian'), ('bulgarian', 'Bulgarian'), ('burkinan', 'Burkinan'), ('burmese', 'Burmese'), ('burundian', 'Burundian'), ('cambodian', 'Cambodian'), ('cameroonian', 'Cameroonian'), ('canadian', 'Canadian'), ('cape_verdean', 'Cape Verdean'), ('cayman_islander', 'Cayman Islander'), ('central_african', 'Central African'), ('chadian', 'Chadian'), ('chilean', 'Chilean'), ('chinese', 'Chinese'), ('colombian', 'Colombian'), ('comoran', 'Comoran'), ('congolese_congo', 'Congolese (Congo)'), ('congolese_drc', 'Congolese (DRC)'), ('cook_islander', 'Cook Islander'), ('costa_rican', 'Costa Rican'), ('croatian', 'Croatian'), ('cuban', 'Cuban'), ('cymraes', 'Cymraes'), ('cymro', 'Cymro'), ('cypriot', 'Cypriot'), ('czech', 'Czech'), ('danish', 'Danish'), ('djiboutian', 'Djiboutian'), ('dominican', 'Dominican'), ('dominican_republic', 'Citizen of the Dominican Republic'), ('dutch', 'Dutch'), ('east_timorese', 'East Timorese'), ('ecuadorean', 'Ecuadorean'), ('egyptian', 'Egyptian'), ('emirati', 'Emirati'), ('english', 'English'), ('equatorial_guinean', 'Equatorial Guinean'), ('eritrean', 'Eritrean'), ('estonian', 'Estonian'), ('ethiopian', 'Ethiopian'), ('faroese', 'Faroese'), ('fijian', 'Fijian'), ('filipino', 'Filipino'), ('finnish', 'Finnish'), ('french', 'French'), ('gabonese', 'Gabonese'), ('gambian', 'Gambian'), ('georgian', 'Georgian'), ('german', 'German'), ('ghanaian', 'Ghanaian'), ('gibraltarian', 'Gibraltarian'), ('greek', 'Greek'), ('greenlandic', 'Greenlandic'), ('grenadian', 'Grenadian'), ('guamanian', 'Guamanian'), ('guatemalan', 'Guatemalan'), ('guinea_bissau_citizen', 'Citizen of Guinea-Bissau'), ('guinean', 'Guinean'), ('guyanese', 'Guyanese'), ('haitian', 'Haitian'), ('honduran', 'Honduran'), ('hong_konger', 'Hong Konger'), ('hungarian', 'Hungarian'), ('icelandic', 'Icelandic'), ('indian', 'Indian'), ('indonesian', 'Indonesian'), ('iranian', 'Iranian'), ('iraqi', 'Iraqi'), ('irish', 'Irish'), ('israeli', 'Israeli'), ('italian', 'Italian'), ('ivorian', 'Ivorian'), ('jamaican', 'Jamaican'), ('japanese', 'Japanese'), ('jordanian', 'Jordanian'), ('kazakh', 'Kazakh'), ('kenyan', 'Kenyan'), ('kittitian', 'Kittitian'), ('kiribati', 'Citizen of Kiribati'), ('kosovan', 'Kosovan'), ('kuwaiti', 'Kuwaiti'), ('kyrgyz', 'Kyrgyz'), ('lao', 'Lao'), ('latvian', 'Latvian'), ('lebanese', 'Lebanese'), ('liberian', 'Liberian'), ('libyan', 'Libyan'), ('liechtenstein', 'Liechtenstein citizen'), ('lithuanian', 'Lithuanian'), ('luxembourger', 'Luxembourger'), ('macanese', 'Macanese'), ('macedonian', 'Macedonian'), ('malagasy', 'Malagasy'), ('malawian', 'Malawian'), ('malaysian', 'Malaysian'), ('maldivian', 'Maldivian'), ('malian', 'Malian'), ('maltese', 'Maltese'), ('marshallese', 'Marshallese'), ('martiniquais', 'Martiniquais'), ('mauritanian', 'Mauritanian'), ('mauritian', 'Mauritian'), ('mexican', 'Mexican'), ('micronesian', 'Micronesian'), ('moldovan', 'Moldovan'), ('monegasque', 'Monegasque'), ('mongolian', 'Mongolian'), ('montenegrin', 'Montenegrin'), ('montserratian', 'Montserratian'), ('moroccan', 'Moroccan'), ('mosotho', 'Mosotho'), ('mozambican', 'Mozambican'), ('namibian', 'Namibian'), ('nauruan', 'Nauruan'), ('nepalese', 'Nepalese'), ('new_zealander', 'New Zealander'), ('nicaraguan', 'Nicaraguan'), ('nigerian', 'Nigerian'), ('nigerien', 'Nigerien'), ('niuean', 'Niuean'), ('north_korean', 'North Korean'), ('northern_irish', 'Northern Irish'), ('norwegian', 'Norwegian'), ('omani', 'Omani'), ('pakistani', 'Pakistani'), ('palauan', 'Palauan'), ('palestinian', 'Palestinian'), ('panamanian', 'Panamanian'), ('papua_new_guinean', 'Papua New Guinean'), ('paraguayan', 'Paraguayan'), ('peruvian', 'Peruvian'), ('pitcairn_islander', 'Pitcairn Islander'), ('polish', 'Polish'), ('portuguese', 'Portuguese'), ('prydeinig', 'Prydeinig'), ('puerto_rican', 'Puerto Rican'), ('qatari', 'Qatari'), ('romanian', 'Romanian'), ('russian', 'Russian'), ('rwandan', 'Rwandan'), ('salvadorean', 'Salvadorean'), ('sammarinese', 'Sammarinese'), ('samoan', 'Samoan'), ('sao_tomean', 'Sao Tomean'), ('saudi_arabian', 'Saudi Arabian'), ('scottish', 'Scottish'), ('senegalese', 'Senegalese'), ('serbian', 'Serbian'), ('seychelles_citizen', 'Citizen of Seychelles'), ('sierra_leonean', 'Sierra Leonean'), ('singaporean', 'Singaporean'), ('slovak', 'Slovak'), ('slovenian', 'Slovenian'), ('solomon_islander', 'Solomon Islander'), ('somali', 'Somali'), ('south_african', 'South African'), ('south_korean', 'South Korean'), ('south_sudanese', 'South Sudanese'), ('spanish', 'Spanish'), ('sri_lankan', 'Sri Lankan'), ('st_helenian', 'St Helenian'), ('st_lucian', 'St Lucian'), ('stateless', 'Stateless'), ('sudanese', 'Sudanese'), ('surinamese', 'Surinamese'), ('swazi', 'Swazi'), ('swedish', 'Swedish'), ('swiss', 'Swiss'), ('syrian', 'Syrian'), ('taiwanese', 'Taiwanese'), ('tajik', 'Tajik'), ('tanzanian', 'Tanzanian'), ('thai', 'Thai'), ('togolese', 'Togolese'), ('tongan', 'Tongan'), ('trinidadian', 'Trinidadian'), ('tristanian', 'Tristanian'), ('tunisian', 'Tunisian'), ('turkish', 'Turkish'), ('turkmen', 'Turkmen'), ('turks_and_caicos_islander', 'Turks and Caicos Islander'), ('tuvaluan', 'Tuvaluan'), ('ugandan', 'Ugandan'), ('ukrainian', 'Ukrainian'), ('uruguayan', 'Uruguayan'), ('uzbek', 'Uzbek'), ('vatican_citizen', 'Vatican citizen'), ('vanuatu', 'Citizen of Vanuatu'), ('venezuelan', 'Venezuelan'), ('vietnamese', 'Vietnamese'), ('vincentian', 'Vincentian'), ('wallisian', 'Wallisian'), ('welsh', 'Welsh'), ('yemeni', 'Yemeni'), ('zambian', 'Zambian'), ('zimbabwean', 'Zimbabwean')], max_length=100, null=True)),
                ('language_preferences', models.CharField(blank=True, choices=[('abkhaz', 'Abkhaz'), ('afar', 'Afar'), ('african_languages', 'African languages'), ('albanian_tosk', 'Albanian (Tosk)'), ('alsatian', 'Alsatian'), ('amharic', 'Amharic'), ('arabic', 'Arabic'), ('armenian', 'Armenian'), ('aymara', 'Aymara'), ('azerbaijani', 'Azerbaijani'), ('bahasa_indonesian', 'Bahasa Indonesian'), ('balochi', 'Balochi'), ('bandjabi', 'Bandjabi'), ('bangla', 'Bangla'), ('bantu_languages', 'Bantu languages'), ('bapounou_eschira', 'Bapounou/Eschira'), ('basque', 'Basque'), ('bateke', 'Bateke'), ('belorussian_white_russian', 'Belorussian (White Russian)'), ('berber_dialects', 'Berber dialects'), ('bosnian', 'Bosnian'), ('brahui', 'Brahui'), ('breton', 'Breton'), ('bubi', 'Bubi'), ('bulgarian', 'Bulgarian'), ('burushaski', 'Burushaski'), ('cantonese', 'Cantonese'), ('castilian', 'Castilian'), ('catalan', 'Catalan'), ('chinese', 'Chinese'), ('corsican', 'Corsican'), ('creole', 'Creole'), ('criuolo', 'Criuolo'), ('croatian', 'Croatian'), ('cushitic_languages', 'Cushitic languages'), ('czech', 'Czech'), ('dagbani', 'Dagbani'), ('danish', 'Danish'), ('dari', 'Dari'), ('diaula', 'Diaula'), ('dzongkha', 'Dzongkha'), ('english', 'English'), ('estonian', 'Estonian'), ('ewe', 'Ewe'), ('faeroese', 'Faeroese'), ('fang', 'Fang'), ('fanti', 'Fanti'), ('farsi', 'Farsi'), ('fijian', 'Fijian'), ('finnish', 'Finnish'), ('flemish', 'Flemish'), ('fon', 'Fon'), ('french', 'French'), ('ga', 'Ga'), ('garifuna_carib', 'Garifuna (Carib)'), ('georgian', 'Georgian'), ('german', 'German'), ('greek', 'Greek'), ('greenlandic_inuit_dialect', 'Greenlandic (Inuit dialect)'), ('guaragigna', 'Guaragigna'), ('hansa', 'Hansa'), ('hazaragi', 'Hazaragi'), ('hindko', 'Hindko'), ('hindustani', 'Hindustani'), ('hungarian', 'Hungarian'), ('ibo', 'Ibo'), ('indigenous_languages', 'Indigenous languages'), ('italian', 'Italian'), ('khmer', 'Khmer'), ('kikongo', 'Kikongo'), ('kingwana', 'Kingwana'), ('kinyarwanda', 'Kinyarwanda'), ('kirundi', 'Kirundi'), ('kunama', 'Kunama'), ('lingala', 'Lingala'), ('magyar_hungarian', 'Magyar (Hungarian)'), ('malay', 'Malay'), ('mandarin', 'Mandarin'), ('mayan', 'Mayan'), ('monokutuba', 'Monokutuba'), ('myene', 'Myene'), ('nahua', 'Nahua'), ('nepalese_dialects', 'Nepalese dialects'), ('nordic_languages', 'Nordic languages'), ('orominga', 'Orominga'), ('pashtu', 'Pashtu'), ('portuguese', 'Portuguese'), ('provençal', 'Provençal'), ('punjabi', 'Punjabi'), ('quechua', 'Quechua'), ('russian', 'Russian'), ('sami_lapp', 'Sami (Lapp)'), ('sangho', 'Sangho'), ('sara', 'Sara'), ('serbian', 'Serbian'), ('setswana', 'Setswana'), ('shikomoro', 'Shikomoro'), ('sindhi', 'Sindhi'), ('siraiki', 'Siraiki'), ('slovak', 'Slovak'), ('somali', 'Somali'), ('spanish', 'Spanish'), ('swahili', 'Swahili'), ('tetum', 'Tetum'), ('tibetan', 'Tibetan'), ('tigre', 'Tigre'), ('tigrigna', 'Tigrigna'), ('tigrinya', 'Tigrinya'), ('tshiluba', 'Tshiluba'), ('turkic', 'Turkic'), ('turkish', 'Turkish'), ('twi', 'Twi'), ('ukrainian', 'Ukrainian'), ('yoruba', 'Yoruba'), ('dialects', 'dialects'), ('ethnic_languages', 'ethnic languages'), ('local_dialects', 'local dialects'), ('other_indigenous_languages', 'other Indigenous languages'), ('tribal_languages', 'tribal languages')], max_length=255, null=True)),
                ('profession', models.CharField(blank=True, choices=[('accountant', 'Accountant'), ('actor', 'Actor'), ('actress', 'Actress'), ('air_traffic_controller', 'Air Traffic Controller'), ('architect', 'Architect'), ('artist', 'Artist'), ('attorney', 'Attorney'), ('banker', 'Banker'), ('bartender', 'Bartender'), ('barber', 'Barber'), ('bookkeeper', 'Bookkeeper'), ('builder', 'Builder'), ('businessman', 'Businessman'), ('businesswoman', 'Businesswoman'), ('businessperson', 'Businessperson'), ('butcher', 'Butcher'), ('carpenter', 'Carpenter'), ('cashier', 'Cashier'), ('chef', 'Chef'), ('coach', 'Coach'), ('dental_hygienist', 'Dental Hygienist'), ('dentist', 'Dentist'), ('designer', 'Designer'), ('developer', 'Developer'), ('dietician', 'Dietician'), ('doctor', 'Doctor'), ('economist', 'Economist'), ('editor', 'Editor'), ('electrician', 'Electrician'), ('engineer', 'Engineer'), ('farmer', 'Farmer'), ('filmmaker', 'Filmmaker'), ('fisherman', 'Fisherman'), ('flight_attendant', 'Flight Attendant'), ('jeweler', 'Jeweler'), ('judge', 'Judge'), ('lawyer', 'Lawyer'), ('mechanic', 'Mechanic'), ('musician', 'Musician'), ('nutritionist', 'Nutritionist'), ('nurse', 'Nurse'), ('optician', 'Optician'), ('painter', 'Painter'), ('pharmacist', 'Pharmacist'), ('photographer', 'Photographer'), ('physician', 'Physician'), ('physicians_assistant', "Physician's Assistant"), ('pilot', 'Pilot'), ('plumber', 'Plumber'), ('police_officer', 'Police Officer'), ('politician', 'Politician'), ('professor', 'Professor'), ('programmer', 'Programmer'), ('psychologist', 'Psychologist'), ('receptionist', 'Receptionist'), ('salesman', 'Salesman'), ('salesperson', 'Salesperson'), ('saleswoman', 'Saleswoman'), ('secretary', 'Secretary'), ('singer', 'Singer'), ('surgeon', 'Surgeon'), ('teacher', 'Teacher'), ('therapist', 'Therapist'), ('translator', 'Translator'), ('undertaker', 'Undertaker'), ('unemployed', 'Unemployed'), ('veterinarian', 'Veterinarian'), ('videographer', 'Videographer'), ('waiter', 'Waiter'), ('waitress', 'Waitress'), ('writer', 'Writer')], max_length=255, null=True)),
                ('duration_of_participation', models.CharField(blank=True, choices=[('0', 'Less than 1 week'), ('1', '1 week'), ('2', '2 weeks'), ('3', '3 weeks'), ('4', '4 weeks'), ('5', 'More than 4 weeks')], max_length=20, null=True)),
                ('biological_sex', models.CharField(blank=True, choices=[('male', 'Male'), ('female', 'Female')], max_length=50, null=True)),
                ('pregnancy_status', models.CharField(blank=True, choices=[('yes', 'Pregnant'), ('no', 'Not Pregnant')], max_length=3, null=True)),
                ('study_preference', models.CharField(blank=True, choices=[('cohort_study', 'Cohort study'), ('controlled_studies', 'Controlled studies'), ('cross_sectional_studies', 'Cross sectional studies'), ('systematic_review', 'Systematic review'), ('clinical_trials', 'Clinical trials'), ('experiment', 'Experiment'), ('case_series', 'Case series'), ('case_studies', 'Case studies'), ('correlation', 'Correlation'), ('interventional_studies', 'Interventional studies'), ('analytical_study', 'Analytical study'), ('research', 'Research'), ('design', 'Design'), ('descriptive_study', 'Descriptive study'), ('ecology', 'Ecology'), ('epidemiological_studies', 'Epidemiological studies'), ('preventive_healthcare', 'Preventive healthcare'), ('qualitative_research', 'Qualitative research'), ('randomized_controlled_trials', 'Randomized controlled trials'), ('observation', 'Observation'), ('genetic', 'Genetic'), ('references', 'References'), ('longitudinal_studies', 'Longitudinal studies')], max_length=100, null=True)),
                ('interest_1', models.CharField(blank=True, choices=[('basketball', 'Basketball'), ('football', 'Football'), ('volleyball', 'Volleyball'), ('marathon_running', 'Marathon running'), ('skiing', 'Skiing'), ('tennis', 'Tennis'), ('cycling', 'Cycling'), ('swimming', 'Swimming'), ('baseball', 'Baseball'), ('mountain_climbing', 'Mountain climbing'), ('chess', 'Chess'), ('playing_a_musical_instrument', 'Playing a musical instrument'), ('reading', 'Reading'), ('writing', 'Writing'), ('sketching', 'Sketching'), ('photography', 'Photography'), ('design', 'Design'), ('blog_writing', 'Blog writing'), ('painting', 'Painting'), ('boardgames', 'Boardgames'), ('creating_and_organizing_a_book_club', 'Creating and organizing a book club'), ('networking_events', 'Networking events'), ('local_meetups', 'Local meetups'), ('volunteering_at_a_charity_center', 'Volunteering at a charity center'), ('public_speaking', 'Public speaking'), ('exploring_other_cultures', 'Exploring other cultures'), ('dancing', 'Dancing'), ('camping', 'Camping'), ('language_classes', 'Language classes'), ('archery', 'Archery'), ('gardening', 'Gardening'), ('stand_up_comedy', 'Stand-up comedy'), ('baking', 'Baking'), ('journaling', 'Journaling'), ('calligraphy', 'Calligraphy'), ('fencing', 'Fencing'), ('theater', 'Theater'), ('yoga', 'Yoga'), ('languages', 'Languages')], max_length=50, null=True)),
                ('interest_2', models.CharField(blank=True, choices=[('basketball', 'Basketball'), ('football', 'Football'), ('volleyball', 'Volleyball'), ('marathon_running', 'Marathon running'), ('skiing', 'Skiing'), ('tennis', 'Tennis'), ('cycling', 'Cycling'), ('swimming', 'Swimming'), ('baseball', 'Baseball'), ('mountain_climbing', 'Mountain climbing'), ('chess', 'Chess'), ('playing_a_musical_instrument', 'Playing a musical instrument'), ('reading', 'Reading'), ('writing', 'Writing'), ('sketching', 'Sketching'), ('photography', 'Photography'), ('design', 'Design'), ('blog_writing', 'Blog writing'), ('painting', 'Painting'), ('boardgames', 'Boardgames'), ('creating_and_organizing_a_book_club', 'Creating and organizing a book club'), ('networking_events', 'Networking events'), ('local_meetups', 'Local meetups'), ('volunteering_at_a_charity_center', 'Volunteering at a charity center'), ('public_speaking', 'Public speaking'), ('exploring_other_cultures', 'Exploring other cultures'), ('dancing', 'Dancing'), ('camping', 'Camping'), ('language_classes', 'Language classes'), ('archery', 'Archery'), ('gardening', 'Gardening'), ('stand_up_comedy', 'Stand-up comedy'), ('baking', 'Baking'), ('journaling', 'Journaling'), ('calligraphy', 'Calligraphy'), ('fencing', 'Fencing'), ('theater', 'Theater'), ('yoga', 'Yoga'), ('languages', 'Languages')], max_length=50, null=True)),
                ('interest_3', models.CharField(blank=True, choices=[('basketball', 'Basketball'), ('football', 'Football'), ('volleyball', 'Volleyball'), ('marathon_running', 'Marathon running'), ('skiing', 'Skiing'), ('tennis', 'Tennis'), ('cycling', 'Cycling'), ('swimming', 'Swimming'), ('baseball', 'Baseball'), ('mountain_climbing', 'Mountain climbing'), ('chess', 'Chess'), ('playing_a_musical_instrument', 'Playing a musical instrument'), ('reading', 'Reading'), ('writing', 'Writing'), ('sketching', 'Sketching'), ('photography', 'Photography'), ('design', 'Design'), ('blog_writing', 'Blog writing'), ('painting', 'Painting'), ('boardgames', 'Boardgames'), ('creating_and_organizing_a_book_club', 'Creating and organizing a book club'), ('networking_events', 'Networking events'), ('local_meetups', 'Local meetups'), ('volunteering_at_a_charity_center', 'Volunteering at a charity center'), ('public_speaking', 'Public speaking'), ('exploring_other_cultures', 'Exploring other cultures'), ('dancing', 'Dancing'), ('camping', 'Camping'), ('language_classes', 'Language classes'), ('archery', 'Archery'), ('gardening', 'Gardening'), ('stand_up_comedy', 'Stand-up comedy'), ('baking', 'Baking'), ('journaling', 'Journaling'), ('calligraphy', 'Calligraphy'), ('fencing', 'Fencing'), ('theater', 'Theater'), ('yoga', 'Yoga'), ('languages', 'Languages')], max_length=50, null=True)),
                ('interest_4', models.CharField(blank=True, choices=[('basketball', 'Basketball'), ('football', 'Football'), ('volleyball', 'Volleyball'), ('marathon_running', 'Marathon running'), ('skiing', 'Skiing'), ('tennis', 'Tennis'), ('cycling', 'Cycling'), ('swimming', 'Swimming'), ('baseball', 'Baseball'), ('mountain_climbing', 'Mountain climbing'), ('chess', 'Chess'), ('playing_a_musical_instrument', 'Playing a musical instrument'), ('reading', 'Reading'), ('writing', 'Writing'), ('sketching', 'Sketching'), ('photography', 'Photography'), ('design', 'Design'), ('blog_writing', 'Blog writing'), ('painting', 'Painting'), ('boardgames', 'Boardgames'), ('creating_and_organizing_a_book_club', 'Creating and organizing a book club'), ('networking_events', 'Networking events'), ('local_meetups', 'Local meetups'), ('volunteering_at_a_charity_center', 'Volunteering at a charity center'), ('public_speaking', 'Public speaking'), ('exploring_other_cultures', 'Exploring other cultures'), ('dancing', 'Dancing'), ('camping', 'Camping'), ('language_classes', 'Language classes'), ('archery', 'Archery'), ('gardening', 'Gardening'), ('stand_up_comedy', 'Stand-up comedy'), ('baking', 'Baking'), ('journaling', 'Journaling'), ('calligraphy', 'Calligraphy'), ('fencing', 'Fencing'), ('theater', 'Theater'), ('yoga', 'Yoga'), ('languages', 'Languages')], max_length=50, null=True)),
                ('measurement_system', models.CharField(choices=[('imperial', 'Imperial'), ('metric', 'Metric')], default='metric', max_length=20)),
                ('height', models.PositiveIntegerField(blank=True, null=True)),
                ('weight', models.PositiveIntegerField(blank=True, null=True)),
                ('participation_history', models.IntegerField(blank=True, default=0, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Recruiter',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('research_area', models.TextField()),
                ('company_info', models.TextField()),
            ],
        ),
    ]
