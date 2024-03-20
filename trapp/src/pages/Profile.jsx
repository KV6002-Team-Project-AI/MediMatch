import React, { useEffect, useState } from 'react';
import UserProfile from '../components/userProfile';
import withAuthentication from '../HOCauth';

const Profile = ({ userRoles }) => {
    const [recruiteeInfo, setRecruiteeInfo] = useState(null);
    const [dropdownChoices, setDropdownChoices] = useState({});

    useEffect(() => {
        const fetchDropdownChoices = async () => {
            const response = await fetch('http://localhost:8000/api/dropdown-choices/');
            const data = await response.json();
            setDropdownChoices(data);
        };

        const fetchRecruiteeInfo = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:8000/api/recruitee/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            setRecruiteeInfo(data);
        };

        fetchDropdownChoices();
        fetchRecruiteeInfo();
    }, []);

    // Function to get readable value
    const getReadableValue = (key, value) => {
        const choice = dropdownChoices[key]?.find(choice => choice.key === value);
        return choice ? choice.value : value;
    };

    return recruiteeInfo ? (
        <UserProfile user={recruiteeInfo} getReadableValue={getReadableValue} />
    ) : (
        <div>Loading...</div>
    );
};

export default withAuthentication(Profile);
