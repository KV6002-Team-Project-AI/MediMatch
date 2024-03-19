import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddStudy() {
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
        has_medical_history: false,

        current_medication: '',
        has_current_medication: false,

        medication_history: '',
        has_medication_history: false,

        allergies: '',
        has_allergies: false,

        family_medical_history: '',
        has_family_medical_history: false,

        lifestyle: '',
        has_lifestyle: false,
    });
    
    useEffect(() => {
        fetch('http://localhost:8000/api/dropdown-choices/')
            .then(response => response.json())
            .then(data => setDropdownChoices(data))
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
    
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
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
            navigate('/profile'); // or another appropriate action
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    

    // Render form fields...
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center p-6">
            <div className="max-w-4xl w-full mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">Add Study</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

        <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                    Age
                </label>
                <input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Age"
                    min="1"
                    required
                />
        </div>

{/* Date of Birth Field */}
<div>
    <label htmlFor="date_of_birth" className="block text-gray-700 text-sm font-bold mb-2">
        Date of Birth
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

{/* Biological Sex Field */}
<div>
    <label htmlFor="biological_sex" className="block text-gray-700 text-sm font-bold mb-2">
        Biological Sex
    </label>
    <select
        id="biological_sex"
        name="biological_sex"
        value={formData.biological_sex}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select</option>
        {dropdownChoices.biological_sex_choices &&
            dropdownChoices.biological_sex_choices.map((sex) => (
                <option key={sex.key} value={sex.key}>
                    {sex.value}
                </option>
            ))}
    </select>
</div>



<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="measurement_system">
        Measurement System
    </label>
    <select
        id="measurement_system"
        name="measurement_system"
        value={formData.measurement_system}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
        {dropdownChoices.measurement_system_choices?.map((system) => (
            <option key={system.key} value={system.key}>
                {system.value === 'Metric' ? 'Metric (cm, kg)' : 'Imperial (inches, lbs)'}
            </option>
        ))}
    </select>
</div>


<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
        Height ({formData.measurement_system === 'metric' ? 'cm' : 'inches'})
    </label>
    <input
        id="height"
        name="height"
        type="number"
        value={formData.height}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={`Height in ${formData.measurement_system === 'Metric' ? 'centimeters' : 'inches'}`}
        min="0"
    />
</div>

<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
        Weight ({formData.measurement_system === 'metric' ? 'kg' : 'lbs'})
    </label>
    <input
        id="weight"
        name="weight"
        type="number"
        value={formData.weight}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={`Weight in ${formData.measurement_system === 'Metric' ? 'kilograms' : 'pounds'}`}
        min="0"
    />
</div>


<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hair_color">
        Hair Color
    </label>
    <select
        id="hair_color"
        name="hair_color"
        value={formData.hair_color}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select hair color</option>
        {dropdownChoices.hair_color_choices &&
            dropdownChoices.hair_color_choices.map((color) => (
                <option key={color.key} value={color.key}>
                    {color.value}
                </option>
            ))}
    </select>
</div>


        {/* Profession */}
<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profession">
        Profession
    </label>
    <select
    id="profession"
    name="profession"
    value={formData.profession}
    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
>
    <option value="">Select Profession</option>
    {dropdownChoices.profession_choices &&
        dropdownChoices.profession_choices.map(option => (
            <option key={option.key} value={option.key}>
                {option.value}
            </option>
        ))}
</select>
</div>

        {/* Duration Preference */}
<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration_of_participation">
        Duration of Participation (in weeks)
    </label>
    <select
        id="duration_of_participation"
        name="duration_of_participation"
        value={formData.duration_of_participation}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select Duration</option>
        {dropdownChoices.duration_of_participation_choices &&
            dropdownChoices.duration_of_participation_choices.map(option => (
                <option key={option.key} value={option.key}>
                    {option.value}
                </option>
            ))}
    </select>
</div>

{/* Work Preference */}
<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="work_preference">
        Work Preference
    </label>
    <select
        id="work_preference"
        name="work_preference"
        value={formData.work_preference}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select Work Preference</option>
        {dropdownChoices.work_preference_choices &&
            dropdownChoices.work_preference_choices.map((option) => (
                <option key={option.key} value={option.key}>
                    {option.value}
                </option>
            ))}
    </select>
</div>

{/* Contact Information Field */}
<div>
    <label htmlFor="contact_information" className="block text-gray-700 text-sm font-bold mb-2">
        Contact Information
    </label>
    <input
        id="contact_information"
        name="contact_information"
        type="text"
        value={formData.contact_information}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Phone number, email"
    />
</div>

{/* Emergency Contact Field */}
<div>
    <label htmlFor="emergency_contact" className="block text-gray-700 text-sm font-bold mb-2">
        Emergency Contact
    </label>
    <input
        id="emergency_contact"
        name="emergency_contact"
        type="text"
        value={formData.emergency_contact}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Name, Phone number"
    />
</div>
                    
{/* Conditional Medical History Field */}
<div>
    <label htmlFor="has_medical_history" className="block text-gray-700 text-sm font-bold mb-2">
        Do you have a medical history?
    </label>
    <input
        id="has_medical_history"
        name="has_medical_history"
        type="checkbox"
        checked={formData.has_medical_history}
        onChange={handleChange}
        className="rounded text-blue-500 leading-tight focus:outline-none focus:shadow-outline"
    />
    {formData.has_medical_history && (
        <textarea
            id="medical_history_details"
            name="medical_history_details"
            value={formData.medical_history_details}
            onChange={handleChange}
            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Please provide details of your medical history"
        />
    )}
</div>

{/* Taking Current Medications Field */}
<div>
    <label htmlFor="taking_current_medications" className="block text-gray-700 text-sm font-bold mb-2">
        Are you currently taking any medications?
    </label>
    <input
        id="taking_current_medications"
        name="taking_current_medications"
        type="checkbox"
        checked={formData.taking_current_medications}
        onChange={handleChange}
        className="rounded text-blue-500 leading-tight focus:outline-none focus:shadow-outline"
    />
    {formData.taking_current_medications && (
        <textarea
            id="current_medication_details"
            name="current_medication_details"
            value={formData.current_medication_details}
            onChange={handleChange}
            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Please list your current medications"
        />
    )}
</div>

{/* Has Medication History Field */}
<div>
    <label htmlFor="has_medication_history" className="block text-gray-700 text-sm font-bold mb-2">
        Do you have a history of taking any medications?
    </label>
    <input
        id="has_medication_history"
        name="has_medication_history"
        type="checkbox"
        checked={formData.has_medication_history}
        onChange={handleChange}
        className="rounded text-blue-500 leading-tight focus:outline-none focus:shadow-outline"
    />
    {formData.has_medication_history && (
        <textarea
            id="medication_history_details"
            name="medication_history_details"
            value={formData.medication_history_details}
            onChange={handleChange}
            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Please provide details of your medication history"
        />
    )}
</div>


{/* Has Allergies Field */}
<div>
    <label htmlFor="has_allergies" className="block text-gray-700 text-sm font-bold mb-2">
        Do you have any allergies?
    </label>
    <input
        id="has_allergies"
        name="has_allergies"
        type="checkbox"
        checked={formData.has_allergies}
        onChange={handleChange}
        className="rounded text-blue-500 leading-tight focus:outline-none focus:shadow-outline"
    />
</div>

{/* Allergy Details Field */}
{formData.has_allergies && (
    <div>
        <label htmlFor="allergy_details" className="block text-gray-700 text-sm font-bold mb-2">
            Allergy Details
        </label>
        <textarea
            id="allergy_details"
            name="allergy_details"
            value={formData.allergy_details}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Details of your allergies"
        />
    </div>
)}

{/* Has Family Medical History Field */}
<div>
    <label htmlFor="has_family_medical_history" className="block text-gray-700 text-sm font-bold mb-2">
        Do you have a family medical history?
    </label>
    <input
        id="has_family_medical_history"
        name="has_family_medical_history"
        type="checkbox"
        checked={formData.has_family_medical_history}
        onChange={handleChange}
        className="rounded text-blue-500 leading-tight focus:outline-none focus:shadow-outline"
    />
</div>

{/* Family Medical History Details Field */}
{formData.has_family_medical_history && (
    <div>
        <label htmlFor="family_medical_history_details" className="block text-gray-700 text-sm font-bold mb-2">
            Family Medical History Details
        </label>
        <textarea
            id="family_medical_history_details"
            name="family_medical_history_details"
            value={formData.family_medical_history_details}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Details of your family's medical history"
        />
    </div>
)}

                    
{/* Health Status Field */}
<div>
    <label htmlFor="health_status" className="block text-gray-700 text-sm font-bold mb-2">
        How would you describe your health?
    </label>
    <select
        id="health_status"
        name="health_status"
        value={formData.health_status}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select Health Status</option>
        {dropdownChoices.health_status_choices &&
            dropdownChoices.health_status_choices.map(option => (
                <option key={option.key} value={option.key}>
                    {option.value}
                </option>
            ))}
    </select>
</div>

{/* Lifestyle Factors Field */}
<div>
    <label htmlFor="lifestyle_factors" className="block text-gray-700 text-sm font-bold mb-2">
        Lifestyle Factors
    </label>
    <textarea
        id="lifestyle_factors"
        name="lifestyle_factors"
        value={formData.lifestyle_factors}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Detail your diet, physical activity, smoking, or drinking habits"
    />
</div>

{/* Socioeconomic Status Field */}
<div>
    <label htmlFor="socioeconomic_status" className="block text-gray-700 text-sm font-bold mb-2">
        Socioeconomic Status
    </label>
    <select
        id="socioeconomic_status"
        name="socioeconomic_status"
        value={formData.socioeconomic_status}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select Socioeconomic Status</option>
        {dropdownChoices.socioeconomic_status_choices?.map((option) => (
            <option key={option.key} value={option.key}>
                {option.value}
            </option>
        ))}
    </select>
</div>


{/* Ethnicity Field */}
<div>
    <label htmlFor="ethnicity" className="block text-gray-700 text-sm font-bold mb-2">
        Ethnicity
    </label>
    <select
        id="ethnicity"
        name="ethnicity"
        value={formData.ethnicity}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select Ethnicity</option>
        {dropdownChoices.ethnicity_choices &&
            dropdownChoices.ethnicity_choices.map((ethnicity) => (
                <option key={ethnicity.key} value={ethnicity.key}>
                    {ethnicity.value}
                </option>
            ))}
    </select>
</div>


{/* Nationality Field */}
<div>
    <label htmlFor="nationality" className="block text-gray-700 text-sm font-bold mb-2">
        Nationality
    </label>
    <select
        id="nationality"
        name="nationality"
        value={formData.nationality}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select Nationality</option>
        {dropdownChoices.nationality_choices &&
            dropdownChoices.nationality_choices.map((option) => (
                <option key={option.key} value={option.key}>
                    {option.value}
                </option>
            ))}
    </select>
</div>


                    
  {/* Pregnancy Status Field */}
{formData.biologicalSex === 'female' && (
    <div>
        <label htmlFor="pregnancy_status" className="block text-gray-700 text-sm font-bold mb-2">
            Pregnancy Status
        </label>
        <select
            id="pregnancy_status"
            name="pregnancy_status"
            value={formData.pregnancy_status}
            onChange={handleChange}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
            <option value="">Select Pregnancy Status</option>
            {dropdownChoices.pregnancy_status_choices &&
                dropdownChoices.pregnancy_status_choices.map((status) => (
                    <option key={status.key} value={status.key}>
                        {status.value}
                    </option>
                ))}
        </select>
    </div>
)}


{/* Language Preferences Field */}
<div>
    <label htmlFor="language_preferences" className="block text-gray-700 text-sm font-bold mb-2">
        Language Preferences
    </label>
    <select
        id="language_preferences"
        name="language_preferences"
        value={formData.language_preferences}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select a language</option>
        {dropdownChoices.language_preferences_choices &&
            dropdownChoices.language_preferences_choices.map((language) => (
                <option key={language.key} value={language.key}>
                    {language.value}
                </option>
            ))}
    </select>
</div>

{/* Study Preference Field */}
<div>
    <label htmlFor="study_preference" className="block text-gray-700 text-sm font-bold mb-2">
        Study Preference
    </label>
    <select
        id="study_preference"
        name="study_preference"
        value={formData.study_preference}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select Study Preference</option>
        {dropdownChoices.study_preference_choices &&
            dropdownChoices.study_preference_choices.map((option) => (
                <option key={option.key} value={option.key}>
                    {option.value}
                </option>
            ))}
    </select>
</div>

{/* Interest 1 Field */}
<div>
    <label htmlFor="interest_1" className="block text-gray-700 text-sm font-bold mb-2">
        Interest 1
    </label>
    <select
        id="interest_1"
        name="interest_1"
        value={formData.interest_1}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select Interest</option>
        {dropdownChoices.interest_choices &&
            dropdownChoices.interest_choices.map((option) => (
                <option key={option.key} value={option.key}>
                    {option.value}
                </option>
            ))}
    </select>
</div>

{/* Interest 2 Field */}
<div>
    <label htmlFor="interest_2" className="block text-gray-700 text-sm font-bold mb-2">
        Interest 2
    </label>
    <select
        id="interest_2"
        name="interest_2"
        value={formData.interest_2}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select Interest</option>
        {dropdownChoices.interest_choices &&
            dropdownChoices.interest_choices.map((option) => (
                <option key={option.key} value={option.key}>
                    {option.value}
                </option>
            ))}
    </select>
</div>

{/* Interest 3 Field */}
<div>
    <label htmlFor="interest_3" className="block text-gray-700 text-sm font-bold mb-2">
        Interest 3
    </label>
    <select
        id="interest_3"
        name="interest_3"
        value={formData.interest_3}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select Interest</option>
        {dropdownChoices.interest_choices &&
            dropdownChoices.interest_choices.map((option) => (
                <option key={option.key} value={option.key}>
                    {option.value}
                </option>
            ))}
    </select>
</div>

{/* Interest 4 Field */}
<div>
    <label htmlFor="interest_4" className="block text-gray-700 text-sm font-bold mb-2">
        Interest 4
    </label>
    <select
        id="interest_4"
        name="interest_4"
        value={formData.interest_4}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select Interest</option>
        {dropdownChoices.interest_choices &&
            dropdownChoices.interest_choices.map((option) => (
                <option key={option.key} value={option.key}>
                    {option.value}
                </option>
            ))}
    </select>
</div>

{/* Bio Field */}
<div>
    <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">
        Bio
    </label>
    <textarea
        id="bio"
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Tell us more about yourself"
    />
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

export default AddStudy
