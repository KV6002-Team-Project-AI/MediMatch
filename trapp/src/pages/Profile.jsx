import React from 'react';
import UserProfile from '../components/userProfile';


function Profile() {
    // Dummy data for the dropdown menu
    const researchFields = [
        'Medical and Health', 
        'Social', 
        'Natural', 
        'Engineering and Technology',
        'Business and Management',
        'Humanities and Arts',
        'Agricultural and Environmental',
        'Interdisciplinary',
        'Ethical and Legal',
        'Other'
    ];

    return (
        <UserProfile />
    );
}

export default Profile;
