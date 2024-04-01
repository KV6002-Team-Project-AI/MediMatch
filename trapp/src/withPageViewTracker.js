// Start Of Jeds Code*/}
// withPageViewTracker.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const withPageViewTracker = (WrappedComponent, trackingId) => {
  const TrackPageView = (props) => {
    const location = useLocation();
    const userId =  localStorage.getItem('userInfo').id; 

    useEffect(() => {
      if (typeof window.gtag === 'function') {
        // Set the user ID
        if (userId) {
          window.gtag('set', {'user_id': userId});
        }
        // Track the page view
        window.gtag('config', trackingId, {
          'page_path': location.pathname + location.search,
        });
      }
    }, [location, trackingId, userId]);

    return <WrappedComponent {...props} />;
  };

  return TrackPageView;
};

export default withPageViewTracker;
 {/* End Of Jeds Code*/}
