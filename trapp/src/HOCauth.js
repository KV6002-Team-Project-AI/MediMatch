import React, { useState, useEffect } from 'react';
import { Navigate  } from 'react-router-dom';

const withAuthentication = WrappedComponent => {
  return props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      fetch('http://localhost:8000/api/validate_token/', { // Endpoint to validate the token
        method: 'GET',
        credentials: 'include', // to include the HttpOnly cookie
        headers: {
            'Content-Type': 'application/json'
          },
      })
      .then(response => {
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          throw new Error('Not authenticated');
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          // If the error is 401 Unauthorized, then it's an auth issue
          console.error('Authentication error:', error);
          setIsAuthenticated(false);
        } else {
          // For any other type of error, you might want to handle it differently
          console.error('Network or other error:', error);
          // Possibly set a different state variable to show an error message to the user
        }
      })
    }, []);

    if (isChecking) {
      return <div>Loading...</div>; // Or any loading state you prefer
    }

   // if (!isAuthenticated) {
   //   return <Navigate to="/signin" />;
   // }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthentication;
