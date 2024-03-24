import React from 'react';
import RecruiteeProfileCard from '../components/RecruiteeProfileCard';
import withAuthentication from '../HOCauth'; // Import the HOC
import StudyProfileCard from '../components/StudyProfileCard';

const Tinder = ({ userRoles }) => {
    if (!userRoles.is_recruiter) {
        return (
            <RecruiteeProfileCard />
        );
    } else if (!userRoles.is_recruitee) {
        return (
            <StudyProfileCard />
        );
    }
};

export default withAuthentication(Tinder);
