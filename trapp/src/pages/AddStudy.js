import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import withAuthentication from '../HOCauth';

    const AddStudy = ({ userRoles }) => {
    const navigate = useNavigate();
    const [dropdownChoices, setDropdownChoices] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        start_date: '',
        expiry_date: '',

        // min max numericals
        min_age: '',
        max_age: '',
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',

        // Select box specific
        category: '',
        sex: '',
        hair_color: '',
        profession: '',
        ethnicity: '',
        nationality: '',
        pregnancy_status: '',
        language_preference: '',
        activity_level: '',
        socioeconomic_status: '',
        duration: '',
        health_status: '',
        work_preference: '',
        termsOfService: false,

        // NLP related
        medical_history: '',
        current_medication: '',
        medication_history: '',
        allergies: '',
        family_medical_history: '',
        lifestyle: '',
    });

    // State variables for toggling display of min-max components
    const [showAge, setShowAge] = useState(false);
    const [showHeight, setShowHeight] = useState(false);
    const [showWeight, setShowWeight] = useState(false);
    const [showSex, setShowSex] = useState(false);
    const [showHairColor, setShowHairColor] = useState(false);
    const [showProfession, setShowProfession] = useState(false);
    const [showEthnicity, setShowEthnicity] = useState(false);
    const [showNationality, setShowNationality] = useState(false);
    const [showPregnancyStatus, setShowPregnancyStatus] = useState(false);
    const [showLanguagePreference, setShowLanguagePreference] = useState(false);
    const [showActivity, setShowActivity] = useState(false);
    const [showSocioeconomic, setShowSocioeconomic] = useState(false);
    const [showHealth, setShowHealth] = useState(false);
    const [showMedicalHistory, setShowMedicalHistory] = useState(false);
    const [showMedicationHistory, setShowMedicationHistory] = useState(false);
    const [showCurrentMedication, setShowCurrentMedication] = useState(false);
    const [showFamilyMedicationHistory, setShowFamilyMedicationHistory] = useState(false);
    const [showAllergies, setShowAllergies] = useState(false);
    const [showLifestyle, setShowLifestyle] = useState(false);
    
    useEffect(() => {
        fetch('http://localhost:8000/api/dropdown-choices/')
            .then(response => response.json())
            .then(data => setDropdownChoices(data))
            // .then(console.log(dropdownChoices.biological_sex_choices))
            .catch(error => console.error('Error fetching dropdown choices:', error));
        // Load existing recruitee data if editing
        fetch('http://localhost:8000/api/studycreate/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.user) { // Check if user data exists in the response
                setFormData({
                    ...data, // Populate form data with existing details
                    informedConsentStatus: false, // Reset certain flags as needed
                });
            }
        })
        .catch(error => console.error('Error fetching recruitee details:', error));
    }, []);

    if (!userRoles.is_recruiter && !userRoles.is_superuser) {
        return <div className='mt-20'>You do not have permission to view this page.</div>;
    }
    
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        if (type === 'checkbox') {
            // Update array based on checkbox state
            if (checked) {
                setFormData({
                    ...formData,
                    [name]: [...formData[name], value],
                });
            } else {
                setFormData({
                    ...formData,
                    [name]: formData[name].filter(item => item !== value),
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert the date of birth from the form data to a Date object
        const dob = new Date(formData.date_of_birth);
        const ageDiffMs = Date.now() - dob.getTime();
        const ageDate = new Date(ageDiffMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);

        const url = 'http://localhost:8000/api/recruitee/';
        const method = formData.user ? 'PUT' : 'POST';

        // Check if age is less than 18
        if (age < 18) {
            alert('You must be at least 18 years old to submit this form.');
            return; // Prevent the form from submitting
        }

        if (!formData.termsOfService) {
            alert('You must agree to the terms of service.');
            return;
        }// Prevent the form from submitting

        const jwtToken = localStorage.getItem('accessToken'); // Retrieve the token from localStorage
        
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            navigate('/research'); // or another appropriate action
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    

    // Render form fields...
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col my-14 justify-center p-6">
            <div className="max-w-4xl w-full mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Add New Study</h2>
                <h3 className="text-lg font-bold mb-4 text-gray-700">General Information</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Study name */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                            Study Name *
                        </label>
                        <input
                            id="studyName"
                            name="studyName"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Study Name"
                            required
                        />
                    </div>
                    {/* Description */}
                    <div>
                        <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Add Description"
                            style={{ maxHeight: '250px' , minHeight: '100px'  }}
                            maxLength={250} // Set maximum word limit to 250
                            required
                        />
                    </div>
                    {/* Study Category */}
                    <div>
                        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                            Category *
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.interest_4}
                            onChange={handleChange}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select Research Field</option>
                            {dropdownChoices.study_preference_choices &&
                                dropdownChoices.study_preference_choices.map((option) => (
                                    <option key={option.key} value={option.key}>
                                        {option.value}
                                    </option>
                                ))}
                        </select>
                    </div>
                    {/* Work Preference */}
                    <div>
                        <label htmlFor="work_preference" className="block text-gray-700 text-sm font-bold mb-2">Type *</label>
                        <select
                            id="work_preference"
                            name="work_preference"
                            value={formData.work}
                            onChange={handleChange}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select Study Type</option>
                            {dropdownChoices.work_preference_choices &&
                                dropdownChoices.work_preference_choices.map((work) => (
                                    <option key={work.key} value={work.key}>
                                        {work.value}
                                    </option>
                                ))}
                        </select>
                    </div>
                    {/* Duration */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Study Duration *</label>
                        <select
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select Duration</option>
                            {dropdownChoices.duration_of_participation_choices &&
                                dropdownChoices.duration_of_participation_choices.map((duration) => (
                                    <option key={duration.key} value={duration.key}>
                                        {duration.value}
                                    </option>
                                ))}
                        </select>
                    </div>
                    {/* Start Date */}
                    <div>
                        <label htmlFor="date_of_birth" className="block text-gray-700 text-sm font-bold mb-2">
                            Start Date *
                        </label>
                        <input
                            id="date_of_birth"
                            name="date_of_birth"
                            type="date"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {/* Expiry Date */}
                    <div>
                        <label htmlFor="date_of_birth" className="block text-gray-700 text-sm font-bold mb-2">
                            Expiry Date *
                        </label>
                        <input
                            id="date_of_birth"
                            name="date_of_birth"
                            type="date"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <h3 className="text-lg font-bold mb-4 text-gray-700">Study Preferences</h3>
                    <p className='text-red-600 text-sm'>*Please ignore boxes if there is no preference.</p>

                    {/* Checkbox for Age */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Does this study have age preferences?
                        </label>
                        <input
                            type="checkbox"
                            checked={showAge}
                            onChange={() => setShowAge(!showAge)}
                        />
                    </div>
                    {/* Min Max Age */}
                    {showAge && (
                        <div className='flex space-x-4 w-full'>
                            <div className='w-full'>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                                    Minimum Age
                                </label>
                                <input
                                    id="ageMin"
                                    name="min_age"
                                    type="number"
                                    value={formData.min_age}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Minimum age"
                                    min="1"
                                    max="99"
                                    required
                                />
                            </div>
                            <div className='w-full'>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                                    Maximum Age
                                </label>
                                <input
                                    id="ageMax"
                                    name="max_age"
                                    type="number"
                                    value={formData.max_age}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Maximum age"
                                    min="1"
                                    max="99"
                                    required
                                />
                            </div>
                        </div>
                    )}
                    {/* Checkbox for Weight */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Does this study have weight preferences?
                        </label>
                        <input
                            type="checkbox"
                            checked={showWeight}
                            onChange={() => setShowWeight(!showWeight)}
                        />
                    </div>
                    {/* Min Max Weight */}
                    {showWeight && (
                        <div className='flex space-x-4 w-full'>
                            <div className='w-full'>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                                    Minimum Weight
                                </label>
                                <input
                                    id="weightMin"
                                    name="min_weight"
                                    type="number"
                                    value={formData.min_weight}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Minimum weight"
                                    min="1"
                                />
                            </div>
                            <div className='w-full'>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                                    Maximum Weight
                                </label>
                                <input
                                    id="weightMax"
                                    name="max_weight"
                                    type="number"
                                    value={formData.max_weight}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Maximum weight"
                                    min="1"
                                />
                            </div>
                        </div>
                    )}

                    {/* Checkbox for Height */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Does this study have height preferences?
                        </label>
                        <input
                            type="checkbox"
                            checked={showHeight}
                            onChange={() => setShowHeight(!showHeight)}
                        />
                    </div>
                    {/* Min Max Height */}
                    {showHeight && (
                        <div className='flex space-x-4 w-full'>
                            <div className='w-full'>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                                    Minimum Height
                                </label>
                                <input
                                    id="heightMin"
                                    name="min_height"
                                    type="number"
                                    value={formData.min_height}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Minimum height"
                                    min="1"
                                    required
                                />
                            </div>
                            <div className='w-full'>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                                    Maximum Height
                                </label>
                                <input
                                    id="heightMax"
                                    name="max_height"
                                    type="number"
                                    value={formData.max_height}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Maximum height"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* checkboxes */}

                    {/* Sex */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study have sex preferences?</label>
                        <input
                            type="checkbox"
                            checked={showSex}
                            onChange={() => setShowSex(!showSex)}
                        />
                        {showSex &&
                            dropdownChoices.biological_sex_choices &&
                            dropdownChoices.biological_sex_choices.map((sex) => (
                                <div key={sex.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`sex_${sex.key}`}
                                        name="sex"
                                        value={sex.key}
                                        checked={formData.sex ? formData.sex.includes(sex.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`sex_${sex.key}`} className="text-sm">
                                        {sex.value}
                                    </label>
                                </div>
                            ))}
                    </div>
                    {/* Hair Color */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study have hair color preferences?</label>
                        <input
                            type="checkbox"
                            checked={showHairColor}
                            onChange={() => setShowHairColor(!showHairColor)}
                        />
                        {showHairColor &&
                            dropdownChoices.hair_color_choices &&
                            dropdownChoices.hair_color_choices.map((hair) => (
                                <div key={hair.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`hair_${hair.key}`}
                                        name="hair"
                                        value={hair.key}
                                        checked={formData.hair ? formData.hair.includes(hair.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`hair_${hair.key}`} className="text-sm">
                                        {hair.value}
                                    </label>
                                </div>
                            ))}
                    </div>

                    {/* Profession */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study have profession preferences?</label>
                        <input
                            type="checkbox"
                            checked={showProfession}
                            onChange={() => setShowProfession(!showProfession)}
                        />
                        {showProfession &&
                            dropdownChoices.profession_choices &&
                            dropdownChoices.profession_choices.map((profession) => (
                                <div key={profession.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`profession_${profession.key}`}
                                        name="profession"
                                        value={profession.key}
                                        checked={formData.profession ? formData.profession.includes(profession.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`profession_${profession.key}`} className="text-sm">
                                        {profession.value}
                                    </label>
                                </div>
                            ))}
                    </div>

                    {/* Ethnicity */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study have ethnicity preferences?</label>
                        <input
                            type="checkbox"
                            checked={showEthnicity}
                            onChange={() => setShowEthnicity(!showEthnicity)}
                        />
                        {showEthnicity &&
                            dropdownChoices.ethnicity_choices &&
                            dropdownChoices.ethnicity_choices.map((ethnicity) => (
                                <div key={ethnicity.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`ethnicity_${ethnicity.key}`}
                                        name="ethnicity"
                                        value={ethnicity.key}
                                        checked={formData.ethnicity ? formData.ethnicity.includes(ethnicity.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`ethnicity_${ethnicity.key}`} className="text-sm">
                                        {ethnicity.value}
                                    </label>
                                </div>
                            ))}
                    </div>

                    {/* Nationality */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study have nationality preferences?</label>
                        <input
                            type="checkbox"
                            checked={showNationality}
                            onChange={() => setShowNationality(!showNationality)}
                        />
                        {showNationality &&
                            dropdownChoices.nationality_choices &&
                            dropdownChoices.nationality_choices.map((nationality) => (
                                <div key={nationality.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`nationality_${nationality.key}`}
                                        name="nationality"
                                        value={nationality.key}
                                        checked={formData.nationality ? formData.nationality.includes(nationality.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`nationality_${nationality.key}`} className="text-sm">
                                        {nationality.value}
                                    </label>
                                </div>
                            ))}
                    </div>

                    {/* Pregnancy Status */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study have pregnancy preferences?</label>
                        <input
                            type="checkbox"
                            checked={showPregnancyStatus}
                            onChange={() => setShowPregnancyStatus(!showPregnancyStatus)}
                        />
                        {showPregnancyStatus &&
                            dropdownChoices.pregnancy_status_choices &&
                            dropdownChoices.pregnancy_status_choices.map((pregnancy) => (
                                <div key={pregnancy.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`pregnancy_${pregnancy.key}`}
                                        name="pregnancy"
                                        value={pregnancy.key}
                                        checked={formData.pregnancy ? formData.pregnancy.includes(pregnancy.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`pregnancy_${pregnancy.key}`} className="text-sm">
                                        {pregnancy.value}
                                    </label>
                                </div>
                            ))}
                    </div>

                    {/* Language Preference */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study have language preferences?</label>
                        <input
                            type="checkbox"
                            checked={showLanguagePreference}
                            onChange={() => setShowLanguagePreference(!showLanguagePreference)}
                        />
                        {showLanguagePreference &&
                            dropdownChoices.language_preferences_choices &&
                            dropdownChoices.language_preferences_choices.map((language) => (
                                <div key={language.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`language_${language.key}`}
                                        name="language"
                                        value={language.key}
                                        checked={formData.language ? formData.language.includes(language.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`language_${language.key}`} className="text-sm">
                                        {language.value}
                                    </label>
                                </div>
                            ))}
                    </div>

                    {/* Activity Level */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study have activity preferences?</label>
                        <input
                            type="checkbox"
                            checked={showActivity}
                            onChange={() => setShowActivity(!showActivity)}
                        />
                        {showActivity &&
                            dropdownChoices.activity_level_choices &&
                            dropdownChoices.activity_level_choices.map((activity) => (
                                <div key={activity.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`activity_${activity.key}`}
                                        name="activity"
                                        value={activity.key}
                                        checked={formData.activity ? formData.activity.includes(activity.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`activity_${activity.key}`} className="text-sm">
                                        {activity.value}
                                    </label>
                                </div>
                            ))}
                    </div>

                    {/* Socioeconomic Status */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study have socioeconomic preferences?</label>
                        <input
                            type="checkbox"
                            checked={showSocioeconomic}
                            onChange={() => setShowSocioeconomic(!showSocioeconomic)}
                        />
                        {showSocioeconomic &&
                            dropdownChoices.socioeconomic_status_choices &&
                            dropdownChoices.socioeconomic_status_choices.map((socioeconomic) => (
                                <div key={socioeconomic.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`socioeconomic_${socioeconomic.key}`}
                                        name="socioeconomic"
                                        value={socioeconomic.key}
                                        checked={formData.socioeconomic ? formData.socioeconomic.includes(socioeconomic.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`socioeconomic_${socioeconomic.key}`} className="text-sm">
                                        {socioeconomic.value}
                                    </label>
                                </div>
                            ))}
                    </div>

                    {/* Health Status */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study have health preferences?</label>
                        <input
                            type="checkbox"
                            checked={showHealth}
                            onChange={() => setShowHealth(!showHealth)}
                        />
                        {showHealth &&
                            dropdownChoices.health_status_choices &&
                            dropdownChoices.health_status_choices.map((health) => (
                                <div key={health.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`health_${health.key}`}
                                        name="health"
                                        value={health.key}
                                        checked={formData.health ? formData.health.includes(health.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`health_${health.key}`} className="text-sm">
                                        {health.value}
                                    </label>
                                </div>
                            ))}
                    </div>

                    

                    {/* Medical History */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study require medical history?</label>
                        <input
                            type="checkbox"
                            checked={showMedicalHistory}
                            onChange={() => setShowMedicalHistory(!showMedicalHistory)}
                        />
                        {showMedicalHistory &&
                            dropdownChoices.medical_history_choices &&
                            dropdownChoices.medical_history_choices.map((medical_history) => (
                                <div key={medical_history.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`medical_history_${medical_history.key}`}
                                        name="medical_history"
                                        value={medical_history.key}
                                        checked={formData.medical_history ? formData.medical_history.includes(medical_history.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`medical_history_${medical_history.key}`} className="text-sm">
                                        {medical_history.value}
                                    </label>
                                </div>
                            ))}
                    </div>

                    {/* Medication History */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study require medication history?</label>
                        <input
                            type="checkbox"
                            checked={showMedicationHistory}
                            onChange={() => setShowMedicationHistory(!showMedicationHistory)}
                        />
                        {showMedicationHistory &&
                            dropdownChoices.medication_history_choices &&
                            dropdownChoices.medication_history_choices.map((medication) => (
                                <div key={medication.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`medication_${medication.key}`}
                                        name="medication"
                                        value={medication.key}
                                        checked={formData.medication ? formData.medication.includes(medication.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`medication_${medication.key}`} className="text-sm">
                                        {medication.value}
                                    </label>
                                </div>
                            ))}
                    </div>

                    {/* Current Medication */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study require current medication?</label>
                        <input
                            type="checkbox"
                            checked={showCurrentMedication}
                            onChange={() => setShowCurrentMedication(!showCurrentMedication)}
                        />
                        {showCurrentMedication &&
                            dropdownChoices.current_medication_choices &&
                            dropdownChoices.current_medication_choices.map((current_medication) => (
                                <div key={current_medication.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`current_medication_${current_medication.key}`}
                                        name="current_medication"
                                        value={current_medication.key}
                                        checked={formData.current_medication ? formData.current_medication.includes(current_medication.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`current_medication_${current_medication.key}`} className="text-sm">
                                        {current_medication.value}
                                    </label>
                                </div>
                            ))}
                    </div>

                    {/* Family Medication History */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study require family medication history?</label>
                        <input
                            type="checkbox"
                            checked={showFamilyMedicationHistory}
                            onChange={() => setShowFamilyMedicationHistory(!showFamilyMedicationHistory)}
                        />
                        {showFamilyMedicationHistory &&
                            dropdownChoices.family_medication_history_choices &&
                            dropdownChoices.family_medication_history_choices.map((family_medication) => (
                                <div key={family_medication.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`family_medication_${family_medication.key}`}
                                        name="family_medication"
                                        value={family_medication.key}
                                        checked={formData.family_medication ? formData.family_medication.includes(family_medication.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`family_medication_${family_medication.key}`} className="text-sm">
                                        {family_medication.value}
                                    </label>
                                </div>
                            ))}
                    </div>

                    {/* Allergies */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study have allergy preferences? </label>
                        <input
                            type="checkbox"
                            checked={showAllergies}
                            onChange={() => setShowAllergies(!showAllergies)}
                        />
                        {showAllergies &&
                            dropdownChoices.allergies_choices &&
                            dropdownChoices.allergies_choices.map((allergies) => (
                                <div key={allergies.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`allergies_${allergies.key}`}
                                        name="allergies"
                                        value={allergies.key}
                                        checked={formData.allergies ? formData.allergies.includes(allergies.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`allergies_${allergies.key}`} className="text-sm">
                                        {allergies.value}
                                    </label>
                                </div>
                            ))}
                    </div>

                    {/* Lifestyle */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study have lifestyle preferences? </label>
                        <input
                            type="checkbox"
                            checked={showLifestyle}
                            onChange={() => setShowLifestyle(!showLifestyle)}
                        />
                        {showLifestyle &&
                            dropdownChoices.lifestyle_choices &&
                            dropdownChoices.lifestyle_choices.map((lifestyle) => (
                                <div key={lifestyle.key} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`lifestyle_${lifestyle.key}`}
                                        name="lifestyle"
                                        value={lifestyle.key}
                                        checked={formData.lifestyle ? formData.lifestyle.includes(lifestyle.key) : false}
                                        onChange={handleChange}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor={`lifestyle_${lifestyle.key}`} className="text-sm">
                                        {lifestyle.value}
                                    </label>
                                </div>
                            ))}
                    </div>


                    {/* Terms of Service Agreement Field */}
                    <div>
                        <label htmlFor="termsOfService" className="block text-gray-700 text-sm font-bold mb-2">
                            Agree to Terms of Service
                        </label>
                        <div className="flex items-start">
                            <input
                                id="termsOfService"
                                name="termsOfService"
                                type="checkbox"
                                checked={formData.termsOfService}
                                onChange={handleChange}
                                className="rounded text-blue-500 leading-tight focus:outline-none focus:shadow-outline mt-1"
                            />
                            <label htmlFor="termsOfService" className="ml-2 text-gray-600">
                                I agree to the <a href="/terms-of-service" className="text-blue-500 hover:underline">Terms of Service</a>.
                            </label>
                        </div>
                    </div>


                    {/* Submit Button */}
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withAuthentication(AddStudy);
