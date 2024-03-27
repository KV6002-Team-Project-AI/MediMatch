import React, { useEffect, useState } from 'react';
import UserProfile from '../components/userProfile';
import RecruiterProfile from '../components/RecruiterProfile';
import withAuthentication from '../HOCauth';
import withPageViewTracker from '../withPageViewTracker';

const Profile = ({ userRoles }) => {
    const [userData, setUserData] = useState(null);
    const [dropdownChoices, setDropdownChoices] = useState({});

    useEffect(() => {
        const fetchDropdownChoices = async () => {
            const response = await fetch('http://localhost:8000/api/dropdown-choices/');
            const data = await response.json();
            setDropdownChoices(data);
        };

        const fetchUserInfo = async () => {
            const accessToken = localStorage.getItem('accessToken');
            let userInfoEndpoint = '';

            if (userRoles.is_recruitee) {
                userInfoEndpoint = 'http://localhost:8000/api/recruitee/';
            } else if (userRoles.is_recruiter) {
                userInfoEndpoint = 'http://localhost:8000/api/recruiter/';
            }

            const response = await fetch(userInfoEndpoint, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            setUserData(data);
        };

        fetchDropdownChoices();
        fetchUserInfo();
    }, [userRoles]);

    const onUpdateProfileImage = async (newImage) => {
        // Example logic to send an image update to your backend
        const formData = new FormData();
        formData.append('profile_image', newImage);
    
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await fetch('http://localhost:8000/api/update-profile-image/', { // Adjust the URL based on your API endpoint
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: formData
            });
    
            if (response.ok) {
                const updatedData = await response.json();
                setUserData(updatedData);
                // Refresh the page after the state has been updated
                window.location.reload();
            } else {
                console.error('Failed to update profile image');
            }
        } catch (error) {
            console.error('Error updating profile image:', error);
        }
    };
    
    
    // Function to get readable value
    const getReadableValue = (key, value) => {
        const choice = dropdownChoices[key]?.find(choice => choice.key === value);
        return choice ? choice.value : value;
    };

    return userData ? (
        userRoles.is_recruitee ? (
            <UserProfile user={userData} getReadableValue={getReadableValue} onUpdateProfileImage={onUpdateProfileImage} />
        ) : userRoles.is_recruiter ? (
            <RecruiterProfile user={userData} getReadableValue={getReadableValue} onUpdateProfileImage={onUpdateProfileImage} />
        ) : (
            <div>Loading...</div>
        )
    ) : (
        <div>Loading...</div>
    );
};

const trackingId = 'G-BQGVC0WJND';
export default withAuthentication(withPageViewTracker(Profile, trackingId));
