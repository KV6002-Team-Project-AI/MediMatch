import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const withAuthentication = WrappedComponent => {
  return props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const navigate = useNavigate(); // Get the navigate function

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
          } else {
            response.json().then(data => {
              console.log('Validation error:', data);
            });
            throw new Error('Not authenticated');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setIsAuthenticated(false);
          navigate('/'); // Redirect to landing page
        });
      } else {
        setIsAuthenticated(false);
        navigate('/'); // Redirect to landing page when no token is found
      }

      setIsChecking(false);
    }, [navigate]);

    if (isChecking) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      // This block might be unnecessary because of the redirect
      return <div>Please log in to view this page.</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthentication;

