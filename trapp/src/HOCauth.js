import React, { useState, useEffect } from 'react';

const withAuthentication = WrappedComponent => {
  return props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      // Retrieve the token from localStorage
      const jwtToken = localStorage.getItem('accessToken');
      console.log('Retrieved JWT Token from localStorage:', jwtToken); // Logging the token for debugging

      if (jwtToken) {
        fetch('http://localhost:8000/api/validate_token/', { // Endpoint to validate the token
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
          },
        })
        .then(response => {
          console.log('Validation response status:', response.status); // Log the response status
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            response.json().then(data => {
              console.log('Validation error:', data); // Log the response error message
            });
            throw new Error('Not authenticated');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setIsAuthenticated(false);
        });
      } else {
        setIsAuthenticated(false);
      }

      setIsChecking(false);
    }, []);

    if (isChecking) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      // Handle redirection or show message when not authenticated
      return <div>Please log in to view this page.</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthentication;
