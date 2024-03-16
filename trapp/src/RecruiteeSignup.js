
import React, { useState } from 'react';

function RecruiteeSignup() {
    const [formData, setFormData] = useState({
        // Initial state setup
        age: '',
        dateOfBirth: '',
        biologicalSex: '',
        contactInformation: '',
        emergencyContact: '',
        informedConsentStatus: false,
        hasMedicalHistory: false,
        medicalHistoryDetails: '',
        takingCurrentMedications: false,
        currentMedicationDetails: '',
        hasMedicationHistory: false,
        medicationHistoryDetails: '',
        hasAllergies: false,
        allergyDetails: '',
        hasFamilyMedicalHistory: false,
        familyMedicalHistoryDetails: '',
        measurementSystem: 'metric',
        height: '',
        weight: '',
        hairColor: '',
        profession: '',
        durationOfParticipation: '',
        workPreference: 'no preference',
        healthStatus: '',
        lifestyleFactors: '',
        socioeconomicStatus: '',
        ethnicity: '',
        race: '',
        pregnancyStatus: '',
        languagePreferences: '',
        participationHistory: '',
        termsOfService: false
    });

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.termsOfService) {
            alert('You must agree to the terms of service.');
            return;
        }
        const jwtToken = localStorage.getItem('accessToken'); // Retrieve the token from localStorage
        fetch('http://localhost:8000/api/recruitee/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(jwtToken ? { 'Authorization': `Bearer ${jwtToken}` } : {}), // Include the token in the Authorization header if it exists
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
            // Redirect or handle successful signup
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    // Render form fields...
    // Form rendering logic here...

 


    // Render form fields...
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center p-6">
            <div className="max-w-4xl w-full mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">Recruitee Sign Up</h2>
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
                            required
                        />
                    </div>
                    
                    {/* Date of Birth Field */}
<div>
    <label htmlFor="dateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">
        Date of Birth
    </label>
    <input
        id="dateOfBirth"
        name="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
</div>

{/* Biological Sex Field */}
<div>
    <label htmlFor="biologicalSex" className="block text-gray-700 text-sm font-bold mb-2">
        Biological Sex
    </label>
    <select
        id="biologicalSex"
        name="biologicalSex"
        value={formData.biologicalSex}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
        <option value="prefer_not_to_say">Prefer not to say</option>
    </select>
</div>
<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="measurementSystem">
        Measurement System
    </label>
    <select
        id="measurementSystem"
        name="measurementSystem"
        value={formData.measurementSystem}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="metric">Metric (cm, kg)</option>
        <option value="imperial">Imperial (inches, lbs)</option>
    </select>
</div>

<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
        Height ({formData.measurementSystem === 'metric' ? 'cm' : 'inches'})
    </label>
    <input
        id="height"
        name="height"
        type="number"
        value={formData.height}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={`Height in ${formData.measurementSystem === 'metric' ? 'centimeters' : 'inches'}`}
    />
</div>

<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
        Weight ({formData.measurementSystem === 'metric' ? 'kg' : 'lbs'})
    </label>
    <input
        id="weight"
        name="weight"
        type="number"
        value={formData.weight}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={`Weight in ${formData.measurementSystem === 'metric' ? 'kilograms' : 'pounds'}`}
    />
</div>

<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hairColor">
        Hair Color
    </label>
    <select
        id="hairColor"
        name="hairColor"
        value={formData.hairColor}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Select hair color</option>
        <option value="black">Black</option>
        <option value="brown">Brown</option>
        <option value="blonde">Blonde</option>
        <option value="ginger">Ginger</option>
        <option value="gray">Gray</option>
        <option value="white">White</option>
    </select>
</div>


<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profession">
        Profession
    </label>
    <input
        id="profession"
        name="profession"
        type="text"
        value={formData.profession}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Profession"
    />
</div>

<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="durationOfParticipation">
        Duration of Participation (in weeks)
    </label>
    <input
        id="durationOfParticipation"
        name="durationOfParticipation"
        type="number"
        value={formData.durationOfParticipation}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Duration in weeks"
    />
</div>

<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workPreference">
        Work Preference
    </label>
    <select
        id="workPreference"
        name="workPreference"
        value={formData.workPreference}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="group">Group</option>
        <option value="solo">Solo</option>
        <option value="no preference">No Preference</option>
    </select>
</div>
{/* Contact Information Field */}
<div>
    <label htmlFor="contactInformation" className="block text-gray-700 text-sm font-bold mb-2">
        Contact Information
    </label>
    <input
        id="contactInformation"
        name="contactInformation"
        type="text"
        value={formData.contactInformation}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Phone number, email"
    />
</div>

{/* Emergency Contact Field */}
<div>
    <label htmlFor="emergencyContact" className="block text-gray-700 text-sm font-bold mb-2">
        Emergency Contact
    </label>
    <input
        id="emergencyContact"
        name="emergencyContact"
        type="text"
        value={formData.emergencyContact}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Name, Phone number"
    />
</div>
                    
                    {/* Conditional Medical History Field */}
<div>
    <label htmlFor="hasMedicalHistory" className="block text-gray-700 text-sm font-bold mb-2">
        Do you have a medical history?
    </label>
    <input
        id="hasMedicalHistory"
        name="hasMedicalHistory"
        type="checkbox"
        checked={formData.hasMedicalHistory}
        onChange={handleChange}
        className="rounded text-blue-500 leading-tight focus:outline-none focus:shadow-outline"
    />
    {formData.hasMedicalHistory && (
        <textarea
            id="medicalHistoryDetails"
            name="medicalHistoryDetails"
            value={formData.medicalHistoryDetails}
            onChange={handleChange}
            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Please provide details of your medical history"
        />
    )}
</div>

{/* Taking Current Medications Field */}
<div>
    <label htmlFor="takingCurrentMedications" className="block text-gray-700 text-sm font-bold mb-2">
        Are you currently taking any medications?
    </label>
    <input
        id="takingCurrentMedications"
        name="takingCurrentMedications"
        type="checkbox"
        checked={formData.takingCurrentMedications}
        onChange={handleChange}
        className="rounded text-blue-500 leading-tight focus:outline-none focus:shadow-outline"
    />
    {formData.takingCurrentMedications && (
        <textarea
            id="currentMedicationDetails"
            name="currentMedicationDetails"
            value={formData.currentMedicationDetails}
            onChange={handleChange}
            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Please list your current medications"
        />
    )}
</div>

{/* Has Medication History Field */}
<div>
    <label htmlFor="hasMedicationHistory" className="block text-gray-700 text-sm font-bold mb-2">
        Do you have a history of taking any medications?
    </label>
    <input
        id="hasMedicationHistory"
        name="hasMedicationHistory"
        type="checkbox"
        checked={formData.hasMedicationHistory}
        onChange={handleChange}
        className="rounded text-blue-500 leading-tight focus:outline-none focus:shadow-outline"
    />
    {formData.hasMedicationHistory && (
        <textarea
            id="medicationHistoryDetails"
            name="medicationHistoryDetails"
            value={formData.medicationHistoryDetails}
            onChange={handleChange}
            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Please provide details of your medication history"
        />
    )}
</div>

                    
                    {/* Medication History Details Field */}
<div>
    <label htmlFor="medicationHistoryDetails" className="block text-gray-700 text-sm font-bold mb-2">
        Medication History Details
    </label>
    <textarea
        id="medicationHistoryDetails"
        name="medicationHistoryDetails"
        value={formData.medicationHistoryDetails}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Details of your medication history"
    />
</div>

{/* Has Allergies Field */}
<div>
    <label htmlFor="hasAllergies" className="block text-gray-700 text-sm font-bold mb-2">
        Do you have any allergies?
    </label>
    <input
        id="hasAllergies"
        name="hasAllergies"
        type="checkbox"
        checked={formData.hasAllergies}
        onChange={handleChange}
        className="rounded text-blue-500 leading-tight focus:outline-none focus:shadow-outline"
    />
</div>

{/* Allergy Details Field */}
{formData.hasAllergies && (
    <div>
        <label htmlFor="allergyDetails" className="block text-gray-700 text-sm font-bold mb-2">
            Allergy Details
        </label>
        <textarea
            id="allergyDetails"
            name="allergyDetails"
            value={formData.allergyDetails}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Details of your allergies"
        />
    </div>
)}

{/* Has Family Medical History Field */}
<div>
    <label htmlFor="hasFamilyMedicalHistory" className="block text-gray-700 text-sm font-bold mb-2">
        Do you have a family medical history?
    </label>
    <input
        id="hasFamilyMedicalHistory"
        name="hasFamilyMedicalHistory"
        type="checkbox"
        checked={formData.hasFamilyMedicalHistory}
        onChange={handleChange}
        className="rounded text-blue-500 leading-tight focus:outline-none focus:shadow-outline"
    />
</div>

{/* Family Medical History Details Field */}
{formData.hasFamilyMedicalHistory && (
    <div>
        <label htmlFor="familyMedicalHistoryDetails" className="block text-gray-700 text-sm font-bold mb-2">
            Family Medical History Details
        </label>
        <textarea
            id="familyMedicalHistoryDetails"
            name="familyMedicalHistoryDetails"
            value={formData.familyMedicalHistoryDetails}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Details of your family's medical history"
        />
    </div>
)}

                    
                   {/* Health Status Field */}
<div>
    <label htmlFor="healthStatus" className="block text-gray-700 text-sm font-bold mb-2">
        Health Status
    </label>
    <textarea
        id="healthStatus"
        name="healthStatus"
        value={formData.healthStatus}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Describe your general health status"
    />
</div>

{/* Lifestyle Factors Field */}
<div>
    <label htmlFor="lifestyleFactors" className="block text-gray-700 text-sm font-bold mb-2">
        Lifestyle Factors
    </label>
    <textarea
        id="lifestyleFactors"
        name="lifestyleFactors"
        value={formData.lifestyleFactors}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Detail your diet, physical activity, smoking, or drinking habits"
    />
</div>

{/* Socioeconomic Status Field */}
<div>
    <label htmlFor="socioeconomicStatus" className="block text-gray-700 text-sm font-bold mb-2">
        Socioeconomic Status
    </label>
    <input
        id="socioeconomicStatus"
        name="socioeconomicStatus"
        type="text"
        value={formData.socioeconomicStatus}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Describe your occupation, income level, education, etc."
    />
</div>

{/* Ethnicity Field */}
<div>
    <label htmlFor="ethnicity" className="block text-gray-700 text-sm font-bold mb-2">
        Ethnicity
    </label>
    <input
        id="ethnicity"
        name="ethnicity"
        type="text"
        value={formData.ethnicity}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Your ethnic background"
    />
</div>

{/* Race Field */}
<div>
    <label htmlFor="race" className="block text-gray-700 text-sm font-bold mb-2">
        Race
    </label>
    <input
        id="race"
        name="race"
        type="text"
        value={formData.race}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Your race"
    />
</div>

                    
                    {/* Pregnancy Status Field */}
{formData.biologicalSex === 'female' && (
    <div>
        <label htmlFor="pregnancyStatus" className="block text-gray-700 text-sm font-bold mb-2">
            Pregnancy Status
        </label>
        <input
            id="pregnancyStatus"
            name="pregnancyStatus"
            type="text"
            value={formData.pregnancyStatus}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Pregnancy status"
        />
    </div>
)}

{/* Language Preferences Field */}
<div>
    <label htmlFor="languagePreferences" className="block text-gray-700 text-sm font-bold mb-2">
        Language Preferences
    </label>
    <input
        id="languagePreferences"
        name="languagePreferences"
        type="text"
        value={formData.languagePreferences}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Preferred languages"
    />
</div>

{/* Participation History Field */}
<div>
    <label htmlFor="participationHistory" className="block text-gray-700 text-sm font-bold mb-2">
        Participation History
    </label>
    <input
        id="participationHistory"
        name="participationHistory"
        type="text"
        value={formData.participationHistory}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Previous participation in studies"
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

export default RecruiteeSignup;
