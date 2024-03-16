import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, TextareaAutosize, Box, Typography } from '@mui/material';

function EditStudy() {
    const [profileData, setProfileData] = useState({
        age: '',
        date_of_birth: '',
        biological_sex: '',
        contact_information: '',
        emergency_contact: '',
        has_medical_history: false,
        medical_history_details: '',
        taking_current_medications: false,
        current_medication_details: '',
        has_medication_history: false,
        medication_history_details: '',
        has_allergies: false,
        allergy_details: '',
        has_family_medical_history: false,
        family_medical_history_details: '',
        measurement_system: 'metric',
        height: '',
        weight: '',
        hair_color: '',
        profession: '',
        duration_of_participation: '',
        work_preference: '',
        health_status: '',
        lifestyle_factors: '',
        socioeconomic_status: '',
        ethnicity: '',
        race: '',
        pregnancy_status: '',
        language_preferences: '',
        participation_history: ''
    });

    useEffect(() => {
        const jwtToken = localStorage.getItem('accessToken');
        fetch('api/recruitee/profile/', {  // Make sure this endpoint is correct for getting the profile data
            headers: {
                'Content-Type': 'application/json',
                ...(jwtToken ? { 'Authorization': `Bearer ${jwtToken}` } : {}), 
            }
        })
        .then(response => response.json())
        .then(data => setProfileData(data))
        .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        setProfileData({
            ...profileData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/recruitee/update/', {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return response.text().then(text => { throw new Error(text || 'Server error') });
          })
          .then(data => {
            console.log('Profile updated successfully:', data);
            localStorage.setItem('profileData', JSON.stringify(data));
            window.location.href = '/profile';
          })
          .catch(error => {
            console.error('Error updating profile:', error);
          });          
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography variant="h6">Edit Recruitee Profile</Typography>
            <TextField
                margin="normal"
                fullWidth
                name="age"
                label="Age"
                type="number"
                value={profileData.age}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                name="date_of_birth"
                label="Date of Birth"
                type="date"
                value={profileData.date_of_birth}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <FormControl fullWidth>
        <InputLabel id="biological-sex-label">Biological Sex</InputLabel>
        <Select
          labelId="biological-sex-label"
          id="biologicalSex"
          name="biologicalSex"
          value={profileData.biologicalSex}
          label="Biological Sex"
          onChange={handleChange}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Contact Information"
        name="contactInformation"
        value={profileData.contactInformation}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Emergency Contact"
        name="emergencyContact"
        value={profileData.emergencyContact}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="hasMedicalHistory"
            checked={profileData.hasMedicalHistory}
            onChange={handleChange}
          />
        }
        label="Has Medical History"
      />

      {profileData.hasMedicalHistory && (
        <TextareaAutosize
          aria-label="Medical History Details"
          name="medicalHistoryDetails"
          placeholder="Medical History Details"
          style={{ width: 200 }}
          minRows={3}
          value={profileData.medicalHistoryDetails}
          onChange={handleChange}
        />
        )}
        <FormControlLabel
                control={
                    <Checkbox
                        checked={profileData.takingCurrentMedications}
                        onChange={handleChange}
                        name="takingCurrentMedications"
                    />
                }
                label="Taking Current Medications"
            />
            {profileData.takingCurrentMedications && (
                <TextField
                    label="Current Medication Details"
                    name="currentMedicationDetails"
                    value={profileData.currentMedicationDetails}
                    onChange={handleChange}
                    fullWidth
                />
            )}

            <FormControlLabel
                control={
                    <Checkbox
                        checked={profileData.hasMedicationHistory}
                        onChange={handleChange}
                        name="hasMedicationHistory"
                    />
                }
                label="Has Medication History"
            />
            {profileData.hasMedicationHistory && (
                <TextField
                    label="Medication History Details"
                    name="medicationHistoryDetails"
                    value={profileData.medicationHistoryDetails}
                    onChange={handleChange}
                    fullWidth
                />
            )}

            <FormControlLabel
                control={
                    <Checkbox
                        checked={profileData.hasAllergies}
                        onChange={handleChange}
                        name="hasAllergies"
                    />
                }
                label="Has Allergies"
            />
            {profileData.hasAllergies && (
                <TextField
                    label="Allergy Details"
                    name="allergyDetails"
                    value={profileData.allergyDetails}
                    onChange={handleChange}
                    fullWidth
                />
            )}
            <FormControlLabel
                control={
                    <Checkbox
                        checked={profileData.hasFamilyMedicalHistory}
                        onChange={handleChange}
                        name="hasFamilyMedicalHistory"
                    />
                }
                label="Has Family Medical History"
            />
            {profileData.hasFamilyMedicalHistory && (
                <TextField
                    label="Family Medical History Details"
                    name="familyMedicalHistoryDetails"
                    value={profileData.familyMedicalHistoryDetails}
                    onChange={handleChange}
                    fullWidth
                    multiline
                />
            )}

            <FormControl fullWidth>
                <InputLabel id="measurement-system-label">Measurement System</InputLabel>
                <Select
                    labelId="measurement-system-label"
                    name="measurementSystem"
                    value={profileData.measurementSystem}
                    onChange={handleChange}
                    label="Measurement System"
                >
                    <MenuItem value="metric">Metric</MenuItem>
                    <MenuItem value="imperial">Imperial</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Height"
                name="height"
                value={profileData.height}
                onChange={handleChange}
                fullWidth
                type="number"
            />

            <TextField
                label="Weight"
                name="weight"
                value={profileData.weight}
                onChange={handleChange}
                fullWidth
                type="number"
            />
            <TextField
                label="Profession"
                name="profession"
                value={profileData.profession}
                onChange={handleChange}
                fullWidth
            />

            <TextField
                label="Duration of Participation (weeks)"
                name="durationOfParticipation"
                value={profileData.durationOfParticipation}
                onChange={handleChange}
                fullWidth
                type="number"
            />

            <FormControl fullWidth>
                <InputLabel id="work-preference-label">Work Preference</InputLabel>
                <Select
                    labelId="work-preference-label"
                    name="workPreference"
                    value={profileData.workPreference}
                    onChange={handleChange}
                    label="Work Preference"
                >
                    <MenuItem value="group">Group</MenuItem>
                    <MenuItem value="solo">Solo</MenuItem>
                    <MenuItem value="no preference">No Preference</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Health Status"
                name="healthStatus"
                value={profileData.healthStatus}
                onChange={handleChange}
                fullWidth
                multiline
            />

            <TextField
                label="Lifestyle Factors"
                name="lifestyleFactors"
                value={profileData.lifestyleFactors}
                onChange={handleChange}
                fullWidth
                multiline
            />
            <TextField
                label="Socioeconomic Status"
                name="socioeconomicStatus"
                value={profileData.socioeconomicStatus}
                onChange={handleChange}
                fullWidth
            />

            <TextField
                label="Ethnicity"
                name="ethnicity"
                value={profileData.ethnicity}
                onChange={handleChange}
                fullWidth
            />

            <TextField
                label="Race"
                name="race"
                value={profileData.race}
                onChange={handleChange}
                fullWidth
            />

            <TextField
                label="Pregnancy Status"
                name="pregnancyStatus"
                value={profileData.pregnancyStatus}
                onChange={handleChange}
                fullWidth
            />

            <TextField
                label="Language Preferences"
                name="languagePreferences"
                value={profileData.languagePreferences}
                onChange={handleChange}
                fullWidth
            />

            <TextField
                label="Participation History"
                name="participationHistory"
                value={profileData.participationHistory}
                onChange={handleChange}
                fullWidth
                multiline
            />


            {/* Add other fields similarly */}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Save Changes
            </Button>
        </Box>
    );
}

export default EditStudy;
