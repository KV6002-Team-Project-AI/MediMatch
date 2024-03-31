/**
 * Tinder Component
 * 
 * A higher-order component designed to dynamically render either the `RecruiteeProfileCard` 
 * or `StudyProfileCard` based on the user's role within a recruitment platform. This component 
 * leverages the concept of conditional rendering to present a user interface that is tailored 
 * to the specific needs and permissions of the user, whether they are acting as a recruiter 
 * or participating in a study.
 * 
 * The `Tinder` component expects a `userRoles` prop, an object containing the user's roles 
 * within the platform. Based on the `is_recruiter` flag within this object, the component 
 * decides to render the `RecruiteeProfileCard` for users with recruiter privileges and 
 * the `StudyProfileCard` for other users. This allows for a seamless and dynamic user experience 
 * where the interface adapts to the user's role without the need for manual selection or 
 * navigation.
 * 
 * This component is wrapped with the `withAuthentication` higher-order component to ensure that 
 * it is only accessible to authenticated users. The authentication wrapper also provides an 
 * additional layer of security, making sure that sensitive information is only displayed to 
 * users with the appropriate permissions.
 * 
 * Usage:
 * Intended to be used within a recruitment platform that handles different user roles and 
 * requires role-based access control. The component is designed to be scalable and easily 
 * integrated into larger React applications.
 * 
 * Author: Mohamed Etri
 * Contributions: This component integrates `RecruiteeProfileCard` and `StudyProfileCard` 
 * components, facilitating their conditional rendering based on user roles.
 */


import React from 'react';
import RecruiteeProfileCard from '../components/RecruiteeProfileCard';
import withAuthentication from '../HOCauth';
import StudyProfileCard from '../components/StudyProfileCard';



const Tinder = ({ userRoles }) => {
    return userRoles.is_recruiter ? <RecruiteeProfileCard /> : <StudyProfileCard />;
};

export default withAuthentication(Tinder);
