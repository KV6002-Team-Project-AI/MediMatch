// Start Of Jeds Code*/}
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthentication = (WrappedComponent, { checkVerification = true } = {}) => {
  return props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRoles, setUserRoles] = useState({ is_recruitee: false, is_recruiter: false, is_superuser: false, is_verified: false });
    const [isChecking, setIsChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const jwtToken = localStorage.getItem('accessToken');
      console.log('Retrieved JWT Token from localStorage:', jwtToken);

      if (jwtToken) {
        fetch('http://localhost:8000/api/validate_token/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
          },
        })
        .then(response => {
          console.log('Validation response status:', response.status);
          if (response.ok) {
            setIsAuthenticated(true);
            // Fetch additional user role and verification status data
            return fetch('http://localhost:8000/api/user', {
              headers: {
                'Authorization': `Bearer ${jwtToken}`
              }
            });
          } else {
            throw new Error('Token validation failed');
          }
        })
        .then(response => response.json())
        .then(data => {
          setUserRoles({
            is_recruitee: data.is_recruitee,
            is_recruiter: data.is_recruiter,
            is_superuser: data.is_superuser,
            is_verified: data.is_verified
          });

          // Redirect based on verification and superuser status, controlled by checkVerification flag
          if (checkVerification && !data.is_verified && !data.is_superuser) {
            navigate('/resend-verification-email');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setIsAuthenticated(false);
          navigate('/');
        });
      } else {
        setIsAuthenticated(false);
        navigate('/');
      }

      setIsChecking(false);
    }, [navigate, checkVerification]);

    if (isChecking) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <div>Please log in to view this page.</div>;
    }

    return <WrappedComponent {...props} userRoles={userRoles} />;
  };
};

export default withAuthentication;
 {/* End Of Jeds Code*/}
