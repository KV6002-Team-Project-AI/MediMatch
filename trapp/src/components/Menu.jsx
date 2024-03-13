import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Badge from '@mui/material/Badge';

function Menu() {
  const location = useLocation();
  const [notification, setNotification] = useState(true);

  const toggleNotifications = (newNotification) => () => {
    setNotification(newNotification);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white shadow-md pt-3 z-20 h-16">
      <ul className="flex justify-around items-center text-md font-medium">
        <li>
          <Link to="/" className={`transition duration-200 ease-in-out hover:bg-gray-200 ${location.pathname === '/' ? 'text-red-600' : ''} rounded-full p-2 inline-block w-20 text-center`}>
            Tinder
          </Link>
        </li>
        <li>
          <Link to="/browse" className={`transition duration-200 ease-in-out hover:bg-gray-200 ${location.pathname === '/browse' ? 'text-red-600' : ''} rounded-full p-2 inline-block w-20 text-center`}>
            Browse
          </Link>
        </li>
        <li>
          <Link to="/research" className={`transition duration-200 ease-in-out hover:bg-gray-200 ${location.pathname === '/add-study' ? 'text-red-600' : ''} rounded-full p-2 inline-block w-20 text-center`}>
            Research
          </Link>
        </li>
        <li onClick={toggleNotifications(true)}>
          <Link to="/matches" className={`transition duration-200 ease-in-out hover:bg-gray-200 ${location.pathname === '/matches' ? 'text-red-600' : ''} rounded-full p-2 inline-block w-20 text-center`}>
            <Badge 
              color="error"
              invisible={notification}
              size="small"
              overlap="circular" 
              variant="dot"
            >
                <p>Matches</p>
            </Badge>
          </Link>
        </li>
        <li>
          <Link to="/profile" className={`transition duration-200 ease-in-out hover:bg-gray-200 ${location.pathname === '/profile' ? 'text-red-600' : ''} rounded-full p-2 inline-block w-20 text-center`}>
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
