
import React, { useState } from 'react';

function RecruiteeSignup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        personalId: '',
        name: '',
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
        healthStatus: '',
        lifestyleFactors: '',
        socioeconomicStatus: '',
        ethnicity: '',
        race: '',
        pregnancyStatus: '',
        languagePreferences: '',
        participationHistory: '',
        consentFormVersion: '',
        dateOfConsent: '',
        studyIds: '',
        // Any additional fields...
    });

    const handleChange = (e) => {
        const value =
            e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/signup/recruitee/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    username: formData.username,
                    password: formData.password,
                },
                age: formData.age,
                ethnicity: formData.ethnicity,
                height: formData.height,
            }),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then((data) => {
            console.log(data);
            // Handle success
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle errors here
        });
    };

    // Render form fields...
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center p-6">
            <div className="max-w-4xl w-full mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">Recruitee Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Username
    </label>
    <input
        id="username"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Username"
        required
    />
</div>

{/* Password Field */}
<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
    </label>
    <input
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Password"
        required
    />
</div>

{/* Personal ID Field */}
<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="personalId">
        Personal ID
    </label>
    <input
        id="personalId"
        name="personalId"
        type="text"
        value={formData.personalId}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Personal ID"
    />
</div>

{/* Name Field */}
<div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
        Name
    </label>
    <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Full Name"
        required
    />
</div>
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

{/* Informed Consent Status Field */}
<div>
    <label htmlFor="informedConsentStatus" className="block text-gray-700 text-sm font-bold mb-2">
        Informed Consent Status
    </label>
    <input
        id="informedConsentStatus"
        name="informedConsentStatus"
        type="checkbox"
        checked={formData.informedConsentStatus}
        onChange={handleChange}
        className="rounded text-blue-500 leading-tight focus:outline-none focus:shadow-outline"
    />
    <span className="ml-2 text-gray-600">Consent given</span>
</div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="informedConsentStatus">
                            Informed Consent Status
                        </label>
                        <input
                            id="informedConsentStatus"
                            name="informedConsentStatus"
                            type="checkbox"
                            checked={formData.informedConsentStatus}
                            onChange={handleChange}
                            className="rounded text-blue-500 leading-tight"
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

{/* Consent Form Version Field */}
<div>
    <label htmlFor="consentFormVersion" className="block text-gray-700 text-sm font-bold mb-2">
        Consent Form Version
    </label>
    <input
        id="consentFormVersion"
        name="consentFormVersion"
        type="text"
        value={formData.consentFormVersion}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Version of the consent form signed"
    />
</div>

                    
                   {/* Date of Consent Field */}
<div>
    <label htmlFor="dateOfConsent" className="block text-gray-700 text-sm font-bold mb-2">
        Date of Consent
    </label>
    <input
        id="dateOfConsent"
        name="dateOfConsent"
        type="date"
        value={formData.dateOfConsent}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
</div>

{/* Study IDs Field */}
<div>
    <label htmlFor="studyIds" className="block text-gray-700 text-sm font-bold mb-2">
        Study IDs
    </label>
    <input
        id="studyIds"
        name="studyIds"
        type="text"
        value={formData.studyIds}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter study IDs separated by commas"
    />
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
