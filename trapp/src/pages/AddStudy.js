import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import withAuthentication from '../HOCauth';

const AddStudy = ({ userRoles }) => {
    const navigate = useNavigate();
    const [dropdownChoices, setDropdownChoices] = useState({});
    const [formData, setFormData] = useState({
        user: JSON.parse(localStorage.getItem('userInfo')).id,
        name: '',
        description: '',
        category: '',
        work_preference: '',
        duration: '',
        start_date: '',
        expiry_date: '',
        isExpired: false,

        // min max numericals
        min_age: 1,
        max_age: 120,
        min_height: 1,
        max_height: 400,
        min_weight: 1,
        max_weight: 400,

        // Select box specific
        biological_sex: [],
        hair_color: [],
        profession: [],
        ethnicity: [],
        nationality: [],
        pregnancy_status: [],
        language_preference: [],
        activity_level: [],
        socioeconomic_status: [],
        health_status: [],
        termsOfService: false,

        // NLP related
        medical_history: [],
        medication_history: [],
        current_medication: [],
        family_medication_history: [],
        allergies: [],
        lifestyle: [],
    });

    // State variables for toggling display of components
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
        .catch(error => console.error('Error fetching study details:', error));

        console.log(formData)
        // 
        if (!showAge) {
            setFormData(prevFormData => ({
                ...prevFormData,
                min_age: 1,
                max_age: 120
            }));
        } 
        if (!showWeight) {
            setFormData(prevFormData => ({
                ...prevFormData,
                min_weight: 1,
                max_weight: 400
            }));
        }
        if (!showHeight) {
            setFormData(prevFormData => ({
                ...prevFormData,
                min_height: 1,
                max_height: 400
            }));
        }

        if (!showSex) {
            setFormData(prevFormData => ({
                ...prevFormData,
                biological_sex: []
            }));
        }
        if (!showHairColor) {
            setFormData(prevFormData => ({
                ...prevFormData,
                hair_color: []
            }));
        }
        if (!showProfession) {
            setFormData(prevFormData => ({
                ...prevFormData,
                profession: []
            }));
        }
        if (!showEthnicity) {
            setFormData(prevFormData => ({
                ...prevFormData,
                ethnicity: []
            }));
        }
        if (!showNationality) {
            setFormData(prevFormData => ({
                ...prevFormData,
                nationality: []
            }));
        }
        if (!showPregnancyStatus) {
            setFormData(prevFormData => ({
                ...prevFormData,
                pregnancy_status: []
            }));
        }
        if (!showLanguagePreference) {
            setFormData(prevFormData => ({
                ...prevFormData,
                language_preference: []
            }));
        }
        if (!showActivity) {
            setFormData(prevFormData => ({
                ...prevFormData,
                activity_level: []
            }));
        }
        if (!showSocioeconomic) {
            setFormData(prevFormData => ({
                ...prevFormData,
                socioeconomic_status: []
            }));
        }
        if (!showHealth) {
            setFormData(prevFormData => ({
                ...prevFormData,
                health_status: []
            }));
        }
        if (!showMedicalHistory) {
            setFormData(prevFormData => ({
                ...prevFormData,
                medical_history: []
            }));
        }
        if (!showMedicationHistory) {
            setFormData(prevFormData => ({
                ...prevFormData,
                medication_history: []
            }));
        }
        if (!showCurrentMedication) {
            setFormData(prevFormData => ({
                ...prevFormData,
                current_medication: []
            }));
        }
        if (!showFamilyMedicationHistory) {
            setFormData(prevFormData => ({
                ...prevFormData,
                family_medication_history: []
            }));
        }
        if (!showAllergies) {
            setFormData(prevFormData => ({
                ...prevFormData,
                allergies: []
            }));
        }
        if (!showLifestyle) {
            setFormData(prevFormData => ({
                ...prevFormData,
                lifestyle: []
            }));
        }

    }, [
        showAge,
        showWeight,
        showHeight,
        showSex,  
        showHairColor,
        showProfession, 
        showEthnicity,
        showNationality,
        showPregnancyStatus,
        showLanguagePreference,
        showActivity,
        showSocioeconomic,
        showHealth,
        showMedicalHistory,
        showMedicationHistory,
        showCurrentMedication,
        showFamilyMedicationHistory,
        showAllergies,
        showLifestyle
    ]);

    if (!userRoles.is_recruiter && !userRoles.is_superuser) {
        return <div className='mt-20'>You do not have permission to view this page.</div>;
    }
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        // Update formData with the new input value
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    
        // Logic to set values to null when show checkboxes are false
        if (!showAge && (name === 'min_age' || name === 'max_age')) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: checked ? prevFormData[name] : ''
            }));
        }
        if (!showWeight && (name === 'min_weight' || name === 'max_weight')) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: checked ? prevFormData[name] : ''
            }));
        }
        if (!showHeight && (name === 'min_height' || name === 'max_height')) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: checked ? prevFormData[name] : ''
            }));
        }
    
        // Validate min and max fields for age, weight, and height
        if (name.includes('min') || name.includes('max')) {
            let type = '';
            if (name.includes('age')) {
                type = 'age';
            } else if (name.includes('weight')) {
                type = 'weight';
            } else if (name.includes('height')) {
                type = 'height';
            }
    
            const minKey = `min_${type}`;
            const maxKey = `max_${type}`;
            const min = formData[minKey];
            const max = formData[maxKey];
            
            // Check if the values are not negative or 0
            if (parseInt(value) <= 0) {
                alert(`${type.charAt(0).toUpperCase() + type.slice(1)} cannot be negative or zero.`);
                setFormData({
                    ...formData,
                    [name]: '' // Reset the value
                });
                return;
            }
        }
    
        // Check if the input field is start_date or expiry_date
        if (name === 'start_date' || name === 'expiry_date') {
            // Parse the dates into Date objects
            const startDate = name === 'start_date' ? new Date(value) : new Date(formData.start_date);
            const expiryDate = name === 'expiry_date' ? new Date(value) : new Date(formData.expiry_date);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Remove the time component
    
            // Check if the start date is prior to today
            if (startDate < today) {
                alert('Start date cannot be set prior to today.');
                setFormData({
                    ...formData,
                    start_date: '' // Reset the start date
                });
                return;
            }
    
            // Calculate the difference in days between start and expiry dates
            const timeDiff =  startDate.getTime() - expiryDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
            // Check if the expiry date is prior to start date
            if (expiryDate > startDate) {
                alert('Study should expire before the start date.');
                setFormData({
                    ...formData,
                    expiry_date: '' // Reset the expiry date
                });
                return;
            }
    
            // Check if the difference between dates is not more than 1 year
            if (daysDiff > 365) {
                alert('The maximum difference between the dates can only amount to 1 year.');
                setFormData({
                    ...formData,
                    [name]: '' // Reset the date
                });
                return;
            }
    
            // Check if the expiry date is today or prior to today
            if (expiryDate <= today) {
                alert('Expiry date cannot be set to today or prior to today.');
                setFormData({
                    ...formData,
                    expiry_date: '' // Reset the expiry date
                });
                return;
            }
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
    
        // Perform validation based on the input field name
        if (name.includes('min') || name.includes('max')) {
            let type = '';
            if (name.includes('age')) {
                type = 'age';
            } else if (name.includes('weight')) {
                type = 'weight';
            } else if (name.includes('height')) {
                type = 'height';
            }
    
            const minValue = parseInt(formData[`min_${type}`]);
            const maxValue = parseInt(formData[`max_${type}`]);
    
            // Perform validation checks
            if (minValue > maxValue) {
                alert(`Minimum ${type} cannot be greater than maximum ${type}.`);
                // Reset the value of the input field
                setFormData({
                    ...formData,
                    [name]: '' // Reset the value
                });
                return;
            } 
            
            if (minValue === maxValue) {
                alert(`Minimum ${type} cannot be the same as maximum ${type}.`);
                // Reset the value of the input field
                setFormData({
                    ...formData,
                    [name]: '' // Reset the value
                });
                return;
            }
        }
    };

    const handleCheckboxChange = (e, preferenceName) => {
        const { value, checked } = e.target;
    
        // Retrieve the existing list of the preference from formData
        const currentPreference = [...formData[preferenceName]];
    
        // If the checkbox is checked, add the selected value to the list as a dictionary
        if (checked) {
            // Create a new object with the name attribute set to the selected value
            const newItem = { name: value };
            // Add the new item to the list
            const updatedPreference = [...currentPreference, newItem];
            // Update the formData state with the updated list
            setFormData(prevFormData => ({
                ...prevFormData,
                [preferenceName]: updatedPreference
            }));
        } else {
            // If the checkbox is unchecked, remove the item from the list
            const updatedPreference = currentPreference.filter(item => item.name !== value);
            // Update the formData state with the updated list
            setFormData(prevFormData => ({
                ...prevFormData,
                [preferenceName]: updatedPreference
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Iterate through formData and set empty arrays or empty strings to null
        const updatedFormData = { ...formData };
        for (const key in updatedFormData) {
            if (Array.isArray(updatedFormData[key]) && updatedFormData[key].length === 0) {
                updatedFormData[key] = [];
            } else if (updatedFormData[key] === '') {
                updatedFormData[key] = '';
            }
        }

        // Submit the updated formData
        console.log(updatedFormData);

        const url = 'http://localhost:8000/api/studycreate/';
        const method = 'POST';
        // formData.user ? 'PUT' : 
        
        if (!updatedFormData.termsOfService) {
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
            body: JSON.stringify(updatedFormData),
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
                            name="name" 
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
                            name="description"
                            value={formData.bio}
                            onChange={handleChange}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Add Description"
                            style={{ maxHeight: '250px' , minHeight: '100px'  }}
                            maxLength={500} // Set maximum word limit to 250
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
                                    <option key={option.key} value={option.value}>
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
                                    <option key={work.key} value={work.value}>
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
                            required
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select Duration</option>
                            {dropdownChoices.duration_of_participation_choices &&
                                dropdownChoices.duration_of_participation_choices.map((duration) => (
                                    <option key={duration.key} value={duration.value}>
                                        {duration.value}
                                    </option>
                                ))}
                        </select>
                    </div>
                    {/* Start Date */}
                    <div>
                        <label htmlFor="start_date" className="block text-gray-700 text-sm font-bold mb-2">
                            Start Date *
                        </label>
                        <input
                            id="start_date"
                            name="start_date"
                            type="date"
                            value={formData.start_date}
                            required
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {/* Expiry Date */}
                    <div>
                        <label htmlFor="expiry_date" className="block text-gray-700 text-sm font-bold mb-2">
                            Expiry Date *
                        </label>
                        <input
                            id="expiry_date"
                            name="expiry_date"
                            type="date"
                            value={formData.expiry_date}
                            onChange={handleChange}
                            required
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
                                Minimum Age *
                            </label>
                            <input
                                id="ageMin"
                                name="min_age"
                                type="number"
                                value={formData.min_age}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Minimum age"
                                min="1"
                                max={(parseInt(formData.max_age) - 1)}
                                required={showAge} 
                            />
                        </div>
                        <div className='w-full'>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                                Maximum Age *
                            </label>
                            <input
                                id="ageMax"
                                name="max_age"
                                type="number"
                                value={formData.max_age}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Maximum age"
                                min={parseInt(formData.min_age) + 1}
                                max="120"
                                required={showAge} 
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
                                    Minimum Weight (kg) *
                                </label>
                                <input
                                    id="weightMin"
                                    name="min_weight"
                                    type="number"
                                    value={formData.min_weight}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Minimum weight"
                                    min="1"
                                    max="399"
                                    required={showWeight} 
                                />
                            </div>
                            <div className='w-full'>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                                    Maximum Weight (kg) *
                                </label>
                                <input
                                    id="weightMax"
                                    name="max_weight"
                                    type="number"
                                    value={formData.max_weight}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Maximum weight"
                                    min="2"
                                    max="400"
                                    required={showWeight} 
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
                                    Minimum Height (cm) *
                                </label>
                                <input
                                    id="heightMin"
                                    name="min_height"
                                    type="number"
                                    value={formData.min_height}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Minimum height"
                                    min="1"
                                    max="299"
                                    required={showHeight} 
                                />
                            </div>
                            <div className='w-full'>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                                    Maximum Height (cm) *
                                </label>
                                <input
                                    id="heightMax"
                                    name="max_height"
                                    type="number"
                                    value={formData.max_height}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Maximum height"
                                    min="2"
                                    max="300"
                                    required={showHeight} 
                                />
                            </div>
                        </div>
                    )}

                    {/* checkboxes */}

                    {/* Sex preferences */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Does this study have sex preferences?</label>
                        <input
                            type="checkbox"
                            name='biological_sex'
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
                                        value={sex.value}
                                        checked={formData.biological_sex.some(item => item.name === sex.value)} 
                                        onChange={(e) => handleCheckboxChange(e, 'biological_sex')}
                                        className="mr-2 leading-tight"
                                        required={!formData.biological_sex || formData.biological_sex.length === 0} 
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
                                        name="hair_color"
                                        value={hair.value}
                                        checked={formData.hair_color.some(item => item.name === hair.value)} 
                                        onChange={(e) => handleCheckboxChange(e, 'hair_color')}
                                        className="mr-2 leading-tight"
                                        required={!formData.hair_color || formData.hair_color.length === 0} 
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
                                        value={profession.value}
                                        checked={formData.profession.some(item => item.name === profession.value)} 
                                        onChange={(e) => handleCheckboxChange(e, 'profession')}
                                        className="mr-2 leading-tight"
                                        required={!formData.profession || formData.profession.length === 0}
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
                                        value={ethnicity.value}
                                        checked={formData.ethnicity.some(item => item.name === ethnicity.value)} 
                                        onChange={(e) => handleCheckboxChange(e, 'ethnicity')}
                                        className="mr-2 leading-tight"
                                        required={!formData.ethnicity || formData.ethnicity.length === 0}
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
                                        value={nationality.value}
                                        checked={formData.nationality.some(item => item.name === nationality.value)}
                                        onChange={(e) => handleCheckboxChange(e, 'nationality')}
                                        className="mr-2 leading-tight"
                                        required={!formData.nationality || formData.nationality.length === 0}
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
                                        name="pregnancy_status"
                                        value={pregnancy.value}
                                        checked={formData.pregnancy_status.some(item => item.name === pregnancy.value)}
                                        onChange={(e) => handleCheckboxChange(e, 'pregnancy_status')}
                                        className="mr-2 leading-tight"
                                        required={!formData.pregnancy_status || formData.pregnancy_status.length === 0}
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
                                        name="language_preference"
                                        value={language.value}
                                        checked={formData.language_preference.some(item => item.name === language.value)}
                                        onChange={(e) => handleCheckboxChange(e, 'language_preference')}
                                        className="mr-2 leading-tight"
                                        required={!formData.language_preference || formData.language_preference.length === 0}
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
                                        name="activity_level"
                                        value={activity.value}
                                        checked={formData.activity_level.some(item => item.name === activity.value)}
                                        onChange={(e) => handleCheckboxChange(e, 'activity_level')}
                                        className="mr-2 leading-tight"
                                        required={!formData.activity_level || formData.activity_level.length === 0}
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
                                        name="socioeconomic_status"
                                        value={socioeconomic.value}
                                        checked={formData.socioeconomic_status.some(item => item.name === socioeconomic.value)}
                                        onChange={(e) => handleCheckboxChange(e, 'socioeconomic_status')}
                                        className="mr-2 leading-tight"
                                        required={!formData.socioeconomic_status || formData.socioeconomic_status.length === 0}
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
                                        name="health_status"
                                        value={health.value}
                                        checked={formData.health_status.some(item => item.name === health.value)}
                                        onChange={(e) => handleCheckboxChange(e, 'health_status')}
                                        className="mr-2 leading-tight"
                                        required={!formData.health_status || formData.health_status.length === 0}
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
                                        value={medical_history.value}
                                        checked={formData.medical_history.some(item => item.name === medical_history.value)}
                                        onChange={(e) => handleCheckboxChange(e, 'medical_history')}
                                        className="mr-2 leading-tight"
                                        required={!formData.medical_history || formData.medical_history.length === 0}
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
                                        value={medication.value}
                                        checked={formData.medication_history.some(item => item.name === medication.value)}
                                        onChange={(e) => handleCheckboxChange(e, 'medication_history')}
                                        className="mr-2 leading-tight"
                                        required={!formData.medication_history || formData.medication_history.length === 0}
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
                                        value={current_medication.value}
                                        checked={formData.current_medication.some(item => item.name === current_medication.value)}
                                        onChange={(e) => handleCheckboxChange(e, 'current_medication')}
                                        className="mr-2 leading-tight"
                                        required={!formData.current_medication || formData.current_medication.length === 0}
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
                                        value={family_medication.value}
                                        checked={formData.family_medication_history.some(item => item.name === family_medication.value)}
                                        onChange={(e) => handleCheckboxChange(e, 'family_medication_history')}
                                        className="mr-2 leading-tight"
                                        required={!formData.family_medication_history || formData.family_medication_history.length === 0}
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
                                        value={allergies.value}
                                        checked={formData.allergies.some(item => item.name === allergies.value)}
                                        onChange={(e) => handleCheckboxChange(e, 'allergies')}
                                        className="mr-2 leading-tight"
                                        required={!formData.allergies || formData.allergies.length === 0}
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
                                        value={lifestyle.value}
                                        checked={formData.lifestyle.some(item => item.name === lifestyle.value)}
                                        onChange={(e) => handleCheckboxChange(e, 'lifestyle')}
                                        className="mr-2 leading-tight"
                                        required={!formData.lifestyle || formData.lifestyle.length === 0}
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

                    {/* Buttons */}
                    <div className="flex justify-center mt-4 gap-3">
                        <button
                            type="button"
                            className="w-full text-white font-semibold bg-gray-500 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-gray-600 transform hover:-translate-y-0.5"
                            onClick={() => navigate('/research')} 
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full text-white font-semibold bg-blue-500 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 transform hover:-translate-y-0.5"
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
