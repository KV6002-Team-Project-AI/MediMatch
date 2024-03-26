import React from 'react';
import RecruiteeProfileCard from '../components/RecruiteeProfileCard';
import withAuthentication from '../HOCauth'; // Import the HOC
import StudyProfileCard from '../components/StudyProfileCard';

const Tinder = ({ userRoles }) => {
    return userRoles.is_recruiter ? <RecruiteeProfileCard /> : <StudyProfileCard />;
};

export default withAuthentication(Tinder);
