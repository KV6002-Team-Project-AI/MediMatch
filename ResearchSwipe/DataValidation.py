#Data validation
NATIONALITY_CHOICES = [
    ('afghan', 'Afghan'),
    ('albanian', 'Albanian'),
    ('algerian', 'Algerian'),
    ('american', 'American'),
    ('andorran', 'Andorran'),
    ('angolan', 'Angolan'),
    ('anguillan', 'Anguillan'),
    ('antigua_and_barbuda', 'Citizen of Antigua and Barbuda'),
    ('argentine', 'Argentine'),
    ('armenian', 'Armenian'),
    ('australian', 'Australian'),
    ('austrian', 'Austrian'),
    ('azerbaijani', 'Azerbaijani'),
    ('bahamian', 'Bahamian'),
    ('bahraini', 'Bahraini'),
    ('bangladeshi', 'Bangladeshi'),
    ('barbadian', 'Barbadian'),
    ('belarusian', 'Belarusian'),
    ('belgian', 'Belgian'),
    ('belizean', 'Belizean'),
    ('beninese', 'Beninese'),
    ('bermudian', 'Bermudian'),
    ('bhutanese', 'Bhutanese'),
    ('bolivian', 'Bolivian'),
    ('bosnia_and_herzegovina', 'Citizen of Bosnia and Herzegovina'),
    ('botswanan', 'Botswanan'),
    ('brazilian', 'Brazilian'),
    ('british', 'British'),
    ('british_virgin_islander', 'British Virgin Islander'),
    ('bruneian', 'Bruneian'),
    ('bulgarian', 'Bulgarian'),
    ('burkinan', 'Burkinan'),
    ('burmese', 'Burmese'),
    ('burundian', 'Burundian'),
    ('cambodian', 'Cambodian'),
    ('cameroonian', 'Cameroonian'),
    ('canadian', 'Canadian'),
    ('cape_verdean', 'Cape Verdean'),
    ('cayman_islander', 'Cayman Islander'),
    ('central_african', 'Central African'),
    ('chadian', 'Chadian'),
    ('chilean', 'Chilean'),
    ('chinese', 'Chinese'),
    ('colombian', 'Colombian'),
    ('comoran', 'Comoran'),
    ('congolese_congo', 'Congolese (Congo)'),
    ('congolese_drc', 'Congolese (DRC)'),
    ('cook_islander', 'Cook Islander'),
    ('costa_rican', 'Costa Rican'),
    ('croatian', 'Croatian'),
    ('cuban', 'Cuban'),
    ('cymraes', 'Cymraes'),
    ('cymro', 'Cymro'),
    ('cypriot', 'Cypriot'),
    ('czech', 'Czech'),
    ('danish', 'Danish'),
    ('djiboutian', 'Djiboutian'),
    ('dominican', 'Dominican'),
    ('dominican_republic', 'Citizen of the Dominican Republic'),
    ('dutch', 'Dutch'),
    ('east_timorese', 'East Timorese'),
    ('ecuadorean', 'Ecuadorean'),
    ('egyptian', 'Egyptian'),
    ('emirati', 'Emirati'),
    ('english', 'English'),
    ('equatorial_guinean', 'Equatorial Guinean'),
    ('eritrean', 'Eritrean'),
    ('estonian', 'Estonian'),
    ('ethiopian', 'Ethiopian'),
    ('faroese', 'Faroese'),
    ('fijian', 'Fijian'),
    ('filipino', 'Filipino'),
    ('finnish', 'Finnish'),
    ('french', 'French'),
    ('gabonese', 'Gabonese'),
    ('gambian', 'Gambian'),
    ('georgian', 'Georgian'),
    ('german', 'German'),
    ('ghanaian', 'Ghanaian'),
    ('gibraltarian', 'Gibraltarian'),
    ('greek', 'Greek'),
    ('greenlandic', 'Greenlandic'),
    ('grenadian', 'Grenadian'),
    ('guamanian', 'Guamanian'),
    ('guatemalan', 'Guatemalan'),
    ('guinea_bissau_citizen', 'Citizen of Guinea-Bissau'),
    ('guinean', 'Guinean'),
    ('guyanese', 'Guyanese'),
    ('haitian', 'Haitian'),
    ('honduran', 'Honduran'),
    ('hong_konger', 'Hong Konger'),
    ('hungarian', 'Hungarian'),
    ('icelandic', 'Icelandic'),
    ('indian', 'Indian'),
    ('indonesian', 'Indonesian'),
    ('iranian', 'Iranian'),
    ('iraqi', 'Iraqi'),
    ('irish', 'Irish'),
    ('israeli', 'Israeli'),
    ('italian', 'Italian'),
    ('ivorian', 'Ivorian'),
    ('jamaican', 'Jamaican'),
    ('japanese', 'Japanese'),
    ('jordanian', 'Jordanian'),
    ('kazakh', 'Kazakh'),
    ('kenyan', 'Kenyan'),
    ('kittitian', 'Kittitian'),
    ('kiribati', 'Citizen of Kiribati'),
    ('kosovan', 'Kosovan'),
    ('kuwaiti', 'Kuwaiti'),
    ('kyrgyz', 'Kyrgyz'),
    ('lao', 'Lao'),
    ('latvian', 'Latvian'),
    ('lebanese', 'Lebanese'),
    ('liberian', 'Liberian'),
    ('libyan', 'Libyan'),
    ('liechtenstein', 'Liechtenstein citizen'),
    ('lithuanian', 'Lithuanian'),
    ('luxembourger', 'Luxembourger'),
    ('macanese', 'Macanese'),
    ('macedonian', 'Macedonian'),
    ('malagasy', 'Malagasy'),
    ('malawian', 'Malawian'),
    ('malaysian', 'Malaysian'),
    ('maldivian', 'Maldivian'),
    ('malian', 'Malian'),
    ('maltese', 'Maltese'),
    ('marshallese', 'Marshallese'),
    ('martiniquais', 'Martiniquais'),
    ('mauritanian', 'Mauritanian'),
    ('mauritian', 'Mauritian'),
    ('mexican', 'Mexican'),
    ('micronesian', 'Micronesian'),
    ('moldovan', 'Moldovan'),
    ('monegasque', 'Monegasque'),
    ('mongolian', 'Mongolian'),
    ('montenegrin', 'Montenegrin'),
    ('montserratian', 'Montserratian'),
    ('moroccan', 'Moroccan'),
    ('mosotho', 'Mosotho'),
    ('mozambican', 'Mozambican'),
    ('namibian', 'Namibian'),
    ('nauruan', 'Nauruan'),
    ('nepalese', 'Nepalese'),
    ('new_zealander', 'New Zealander'),
    ('nicaraguan', 'Nicaraguan'),
    ('nigerian', 'Nigerian'),
    ('nigerien', 'Nigerien'),
    ('niuean', 'Niuean'),
    ('north_korean', 'North Korean'),
    ('northern_irish', 'Northern Irish'),
    ('norwegian', 'Norwegian'),
    ('omani', 'Omani'),
    ('pakistani', 'Pakistani'),
    ('palauan', 'Palauan'),
    ('palestinian', 'Palestinian'),
    ('panamanian', 'Panamanian'),
    ('papua_new_guinean', 'Papua New Guinean'),
    ('paraguayan', 'Paraguayan'),
    ('peruvian', 'Peruvian'),
    ('pitcairn_islander', 'Pitcairn Islander'),
    ('polish', 'Polish'),
    ('portuguese', 'Portuguese'),
    ('prydeinig', 'Prydeinig'),
    ('puerto_rican', 'Puerto Rican'),
    ('qatari', 'Qatari'),
    ('romanian', 'Romanian'),
    ('russian', 'Russian'),
    ('rwandan', 'Rwandan'),
    ('salvadorean', 'Salvadorean'),
    ('sammarinese', 'Sammarinese'),
    ('samoan', 'Samoan'),
    ('sao_tomean', 'Sao Tomean'),
    ('saudi_arabian', 'Saudi Arabian'),
    ('scottish', 'Scottish'),
    ('senegalese', 'Senegalese'),
    ('serbian', 'Serbian'),
    ('seychelles_citizen', 'Citizen of Seychelles'),
    ('sierra_leonean', 'Sierra Leonean'),
    ('singaporean', 'Singaporean'),
    ('slovak', 'Slovak'),
    ('slovenian', 'Slovenian'),
    ('solomon_islander', 'Solomon Islander'),
    ('somali', 'Somali'),
    ('south_african', 'South African'),
    ('south_korean', 'South Korean'),
    ('south_sudanese', 'South Sudanese'),
    ('spanish', 'Spanish'),
    ('sri_lankan', 'Sri Lankan'),
    ('st_helenian', 'St Helenian'),
    ('st_lucian', 'St Lucian'),
    ('stateless', 'Stateless'),
    ('sudanese', 'Sudanese'),
    ('surinamese', 'Surinamese'),
    ('swazi', 'Swazi'),
    ('swedish', 'Swedish'),
    ('swiss', 'Swiss'),
    ('syrian', 'Syrian'),
    ('taiwanese', 'Taiwanese'),
    ('tajik', 'Tajik'),
    ('tanzanian', 'Tanzanian'),
    ('thai', 'Thai'),
    ('togolese', 'Togolese'),
    ('tongan', 'Tongan'),
    ('trinidadian', 'Trinidadian'),
    ('tristanian', 'Tristanian'),
    ('tunisian', 'Tunisian'),
    ('turkish', 'Turkish'),
    ('turkmen', 'Turkmen'),
    ('turks_and_caicos_islander', 'Turks and Caicos Islander'),
    ('tuvaluan', 'Tuvaluan'),
    ('ugandan', 'Ugandan'),
    ('ukrainian', 'Ukrainian'),
    ('uruguayan', 'Uruguayan'),
    ('uzbek', 'Uzbek'),
    ('vatican_citizen', 'Vatican citizen'),
    ('vanuatu', 'Citizen of Vanuatu'),
    ('venezuelan', 'Venezuelan'),
    ('vietnamese', 'Vietnamese'),
    ('vincentian', 'Vincentian'),
    ('wallisian', 'Wallisian'),
    ('welsh', 'Welsh'),
    ('yemeni', 'Yemeni'),
    ('zambian', 'Zambian'),
    ('zimbabwean', 'Zimbabwean')
    ]

ETHNICITY_CHOICES = [
    ('asian', 'Asian or Asian British'),
    ('indian', 'Indian'),
    ('pakistani', 'Pakistani'),
    ('bangladeshi', 'Bangladeshi'),
    ('chinese', 'Chinese'),
    ('other_asian', 'Any other Asian background'),
    ('black', 'Black or Black British'),
    ('caribbean', 'Caribbean'),
    ('african', 'African'),
    ('other_black', 'Any other Black, Black British, or Caribbean background'),
    ('mixed', 'Mixed or multiple ethnic groups'),
    ('white', 'White'),
    ('british', 'English, Welsh, Scottish, Northern Irish or British'),
    ('irish', 'Irish'),
    ('gypsy_irish_traveller', 'Gypsy or Irish Traveller'),
    ('roma', 'Roma'),
    ('other_white', 'Any other White background'),
    ('white_caribbean', 'White and Caribbean'),
    ('white_african', 'White and African'),
    ('white_asian', 'White and Asian'),
    ('other_mixed', 'Any other Mixed or multiple ethnic background'),
    ('other', 'Other ethnic group'),
    ('arab', 'Arab'),
    ('any_other', 'Any other ethnic group'),
]

ACTIVITY_LEVEL_CHOICES = [
        ('sedentary', 'Sedentary'),
        ('light', 'Light Activity'),
        ('moderate', 'Moderate Activity'),
        ('active', 'Active'),
    ]

HAIR_COLOR_CHOICES = [
        ('black', 'Black'),
        ('brown', 'Brown'),
        ('blonde', 'Blonde'),
        ('ginger', 'Ginger'),
        ('gray', 'Gray'),
        ('white', 'White'),
    ]

SOCIOECONOMIC_STATUS_CHOICES = [
        ('low', 'Low'),
        ('middle', 'Middle'),
        ('high', 'High'),
    ]

HEALTH_STATUS_CHOICES = [
        ('good', 'Good'),
        ('fair', 'Fair'),
        ('poor', 'Poor'),
    ]

MEASUREMENT_CHOICES = [
    ('imperial', 'Imperial'), 
    ('metric', 'Metric'),
]

GROUP_CHOICES = [
    ('group', 'Group'), 
    ('solo', 'Solo'), 
    ('no preference', 'No Preference'),
]

PREGNANCY_STATUS_CHOICES = [
        ('yes', 'Pregnant'),
        ('no', 'Not Pregnant'),
]

LANGUAGE_CHOICES = [
    ('abkhaz', 'Abkhaz'),
    ('afar', 'Afar'),
    ('african_languages', 'African languages'),
    ('albanian_tosk', 'Albanian (Tosk)'),
    ('alsatian', 'Alsatian'),
    ('amharic', 'Amharic'),
    ('arabic', 'Arabic'),
    ('armenian', 'Armenian'),
    ('aymara', 'Aymara'),
    ('azerbaijani', 'Azerbaijani'),
    ('bahasa_indonesian', 'Bahasa Indonesian'),
    ('balochi', 'Balochi'),
    ('bandjabi', 'Bandjabi'),
    ('bangla', 'Bangla'),
    ('bantu_languages', 'Bantu languages'),
    ('bapounou_eschira', 'Bapounou/Eschira'),
    ('basque', 'Basque'),
    ('bateke', 'Bateke'),
    ('belorussian_white_russian', 'Belorussian (White Russian)'),
    ('berber_dialects', 'Berber dialects'),
    ('bosnian', 'Bosnian'),
    ('brahui', 'Brahui'),
    ('breton', 'Breton'),
    ('bubi', 'Bubi'),
    ('bulgarian', 'Bulgarian'),
    ('burushaski', 'Burushaski'),
    ('cantonese', 'Cantonese'),
    ('castilian', 'Castilian'),
    ('catalan', 'Catalan'),
    ('chinese', 'Chinese'),
    ('corsican', 'Corsican'),
    ('creole', 'Creole'),
    ('criuolo', 'Criuolo'),
    ('croatian', 'Croatian'),
    ('cushitic_languages', 'Cushitic languages'),
    ('czech', 'Czech'),
    ('dagbani', 'Dagbani'),
    ('danish', 'Danish'),
    ('dari', 'Dari'),
    ('diaula', 'Diaula'),
    ('dzongkha', 'Dzongkha'),
    ('english', 'English'),
    ('estonian', 'Estonian'),
    ('ewe', 'Ewe'),
    ('faeroese', 'Faeroese'),
    ('fang', 'Fang'),
    ('fanti', 'Fanti'),
    ('farsi', 'Farsi'),
    ('fijian', 'Fijian'),
    ('finnish', 'Finnish'),
    ('flemish', 'Flemish'),
    ('fon', 'Fon'),
    ('french', 'French'),
    ('ga', 'Ga'),
    ('garifuna_carib', 'Garifuna (Carib)'),
    ('georgian', 'Georgian'),
    ('german', 'German'),
    ('greek', 'Greek'),
    ('greenlandic_inuit_dialect', 'Greenlandic (Inuit dialect)'),
    ('guaragigna', 'Guaragigna'),
    ('hansa', 'Hansa'),
    ('hazaragi', 'Hazaragi'),
    ('hindko', 'Hindko'),
    ('hindustani', 'Hindustani'),
    ('hungarian', 'Hungarian'),
    ('ibo', 'Ibo'),
    ('indigenous_languages', 'Indigenous languages'),
    ('italian', 'Italian'),
    ('khmer', 'Khmer'),
    ('kikongo', 'Kikongo'),
    ('kingwana', 'Kingwana'),
    ('kinyarwanda', 'Kinyarwanda'),
    ('kirundi', 'Kirundi'),
    ('kunama', 'Kunama'),
    ('lingala', 'Lingala'),
    ('magyar_hungarian', 'Magyar (Hungarian)'),
    ('malay', 'Malay'),
    ('mandarin', 'Mandarin'),
    ('mayan', 'Mayan'),
    ('monokutuba', 'Monokutuba'),
    ('myene', 'Myene'),
    ('nahua', 'Nahua'),
    ('nepalese_dialects', 'Nepalese dialects'),
    ('nordic_languages', 'Nordic languages'),
    ('orominga', 'Orominga'),
    ('pashtu', 'Pashtu'),
    ('portuguese', 'Portuguese'),
    ('provençal', 'Provençal'),
    ('punjabi', 'Punjabi'),
    ('quechua', 'Quechua'),
    ('russian', 'Russian'),
    ('sami_lapp', 'Sami (Lapp)'),
    ('sangho', 'Sangho'),
    ('sara', 'Sara'),
    ('serbian', 'Serbian'),
    ('setswana', 'Setswana'),
    ('shikomoro', 'Shikomoro'),
    ('sindhi', 'Sindhi'),
    ('siraiki', 'Siraiki'),
    ('slovak', 'Slovak'),
    ('somali', 'Somali'),
    ('spanish', 'Spanish'),
    ('swahili', 'Swahili'),
    ('tetum', 'Tetum'),
    ('tibetan', 'Tibetan'),
    ('tigre', 'Tigre'),
    ('tigrigna', 'Tigrigna'),
    ('tigrinya', 'Tigrinya'),
    ('tshiluba', 'Tshiluba'),
    ('turkic', 'Turkic'),
    ('turkish', 'Turkish'),
    ('twi', 'Twi'),
    ('ukrainian', 'Ukrainian'),
    ('yoruba', 'Yoruba'),
    ('dialects', 'dialects'),
    ('ethnic_languages', 'ethnic languages'),
    ('local_dialects', 'local dialects'),
    ('other_indigenous_languages', 'other Indigenous languages'),
    ('tribal_languages', 'tribal languages'),
]

PROFESSION_CHOICES = [
    ('accountant', 'Accountant'),
    ('actor', 'Actor'),
    ('actress', 'Actress'),
    ('air_traffic_controller', 'Air Traffic Controller'),
    ('architect', 'Architect'),
    ('artist', 'Artist'),
    ('attorney', 'Attorney'),
    ('banker', 'Banker'),
    ('bartender', 'Bartender'),
    ('barber', 'Barber'),
    ('bookkeeper', 'Bookkeeper'),
    ('builder', 'Builder'),
    ('businessman', 'Businessman'),
    ('businesswoman', 'Businesswoman'),
    ('businessperson', 'Businessperson'),
    ('butcher', 'Butcher'),
    ('carpenter', 'Carpenter'),
    ('cashier', 'Cashier'),
    ('chef', 'Chef'),
    ('coach', 'Coach'),
    ('dental_hygienist', 'Dental Hygienist'),
    ('dentist', 'Dentist'),
    ('designer', 'Designer'),
    ('developer', 'Developer'),
    ('dietician', 'Dietician'),
    ('doctor', 'Doctor'),
    ('economist', 'Economist'),
    ('editor', 'Editor'),
    ('electrician', 'Electrician'),
    ('engineer', 'Engineer'),
    ('farmer', 'Farmer'),
    ('filmmaker', 'Filmmaker'),
    ('fisherman', 'Fisherman'),
    ('flight_attendant', 'Flight Attendant'),
    ('jeweler', 'Jeweler'),
    ('judge', 'Judge'),
    ('lawyer', 'Lawyer'),
    ('mechanic', 'Mechanic'),
    ('musician', 'Musician'),
    ('nutritionist', 'Nutritionist'),
    ('nurse', 'Nurse'),
    ('optician', 'Optician'),
    ('painter', 'Painter'),
    ('pharmacist', 'Pharmacist'),
    ('photographer', 'Photographer'),
    ('physician', 'Physician'),
    ('physicians_assistant', "Physician's Assistant"),
    ('pilot', 'Pilot'),
    ('plumber', 'Plumber'),
    ('police_officer', 'Police Officer'),
    ('politician', 'Politician'),
    ('professor', 'Professor'),
    ('programmer', 'Programmer'),
    ('psychologist', 'Psychologist'),
    ('receptionist', 'Receptionist'),
    ('salesman', 'Salesman'),
    ('salesperson', 'Salesperson'),
    ('saleswoman', 'Saleswoman'),
    ('secretary', 'Secretary'),
    ('singer', 'Singer'),
    ('surgeon', 'Surgeon'),
    ('teacher', 'Teacher'),
    ('therapist', 'Therapist'),
    ('translator', 'Translator'),
    ('undertaker', 'Undertaker'),
    ('unemployed', 'Unemployed'),
    ('veterinarian', 'Veterinarian'),
    ('videographer', 'Videographer'),
    ('waiter', 'Waiter'),
    ('waitress', 'Waitress'),
    ('writer', 'Writer'),
]

SEX_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]

DURATION_CHOICES = [
        ('0', 'Less than 1 week'),
        ('1', '1 week'),
        ('2', '2 weeks'),
        ('3', '3 weeks'),
        ('4', '4 weeks'),
        ('5', 'More than 4 weeks'),
    ]

STUDY_PREFERENCE_CHOICES = [
    ('cohort_study', 'Cohort study'),
    ('controlled_studies', 'Controlled studies'),
    ('cross_sectional_studies', 'Cross sectional studies'),
    ('systematic_review', 'Systematic review'),
    ('clinical_trials', 'Clinical trials'),
    ('experiment', 'Experiment'),
    ('case_series', 'Case series'),
    ('case_studies', 'Case studies'),
    ('correlation', 'Correlation'),
    ('interventional_studies', 'Interventional studies'),
    ('analytical_study', 'Analytical study'),
    ('research', 'Research'),
    ('design', 'Design'),
    ('descriptive_study', 'Descriptive study'),
    ('ecology', 'Ecology'),
    ('epidemiological_studies', 'Epidemiological studies'),
    ('preventive_healthcare', 'Preventive healthcare'),
    ('qualitative_research', 'Qualitative research'),
    ('randomized_controlled_trials', 'Randomized controlled trials'),
    ('observation', 'Observation'),
    ('genetic', 'Genetic'),
    ('references', 'References'),
    ('longitudinal_studies', 'Longitudinal studies'),
]

INTEREST_CHOICES = [
    ('basketball', 'Basketball'),
    ('football', 'Football'),
    ('volleyball', 'Volleyball'),
    ('marathon_running', 'Marathon running'),
    ('skiing', 'Skiing'),
    ('tennis', 'Tennis'),
    ('cycling', 'Cycling'),
    ('swimming', 'Swimming'),
    ('baseball', 'Baseball'),
    ('mountain_climbing', 'Mountain climbing'),
    ('chess', 'Chess'),
    ('playing_a_musical_instrument', 'Playing a musical instrument'),
    ('reading', 'Reading'),
    ('writing', 'Writing'),
    ('sketching', 'Sketching'),
    ('photography', 'Photography'),
    ('design', 'Design'),
    ('blog_writing', 'Blog writing'),
    ('painting', 'Painting'),
    ('boardgames', 'Boardgames'),
    ('creating_and_organizing_a_book_club', 'Creating and organizing a book club'),
    ('networking_events', 'Networking events'),
    ('local_meetups', 'Local meetups'),
    ('volunteering_at_a_charity_center', 'Volunteering at a charity center'),
    ('public_speaking', 'Public speaking'),
    ('exploring_other_cultures', 'Exploring other cultures'),
    ('dancing', 'Dancing'),
    ('camping', 'Camping'),
    ('language_classes', 'Language classes'),
    ('archery', 'Archery'),
    ('gardening', 'Gardening'),
    ('stand_up_comedy', 'Stand-up comedy'),
    ('baking', 'Baking'),
    ('journaling', 'Journaling'),
    ('calligraphy', 'Calligraphy'),
    ('fencing', 'Fencing'),
    ('theater', 'Theater'),
    ('yoga', 'Yoga'),
    ('languages', 'Languages'),
]

#End of data validation