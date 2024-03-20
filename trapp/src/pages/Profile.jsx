import React from 'react';
import UserProfile from '../components/userProfile';
import withAuthentication from '../HOCauth'; // Import the HOC



const Profile = ({ userRoles }) => {
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
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Retrieve user info

    return (
        <UserProfile user={userInfo} />
    );
}

export default withAuthentication(Profile);
