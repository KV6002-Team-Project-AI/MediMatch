import React, { useState, useEffect } from 'react';
import withAuthentication from './HOCauth'; // Import the HOC

function UserStatus() {
  const [userRoles, setUserRoles] = useState({
    isRecruitee: false,
    isRecruiter: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const jwtToken = localStorage.getItem('accessToken');
    console.log('JWT Token from localStorage:', jwtToken);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}: You are not authorized to view this data.`);
            }

            const data = await response.json();
            setUserRoles({
                isRecruitee: data.is_recruitee,
                isRecruiter: data.is_recruiter,
                isLoading: false,
                error: null,
            });
        } catch (error) {
            setUserRoles({
                isRecruitee: false,
                isRecruiter: false,
                isLoading: false,
                error: error.message,
            });
        }
    };

    fetchUserData();
  }, []);

  if (userRoles.isLoading) {
    return <div>Loading...</div>;
  }

  if (userRoles.error) {
    return <div>Error: {userRoles.error}</div>;
  }

  return (
    <div>
      <h1>User Status</h1>
      <p>Is Recruitee: {userRoles.isRecruitee ? 'Yes' : 'No'}</p>
      <p>Is Recruiter: {userRoles.isRecruiter ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default withAuthentication(UserStatus);
