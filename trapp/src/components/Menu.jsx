import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import withAuthentication from '../HOCauth';

const Menu = ({ userRoles }) => {
  const location = useLocation();
  const [notification, setNotification] = useState(true);

  const toggleNotifications = () => {
    setNotification(!notification);
  };

  const menuItems = [
    { name: 'Tinder', icon: <HomeIcon />, path: '/tinder' },
    { name: 'Matches', icon: <FavoriteIcon />, path: '/matches', badge: true },
    { name: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
  ];
  
  if (!userRoles.is_recruitee && !userRoles.is_superuser) {
    menuItems.splice(1, 0, { name: 'Research', icon: <InsightsIcon />, path: '/research' });
  }

  return (
      <div className="fixed inset-x-0 bottom-0 bg-white shadow-md pt-3 z-20 h-14">
        <ul className="flex justify-around items-center text-md font-medium">
          {menuItems.map((item) => (
            <li key={item.name} onClick={item.badge ? toggleNotifications : undefined} className="flex-shrink">
              <Link to={item.path} className={`transition duration-200 ease-in-out hover:bg-gray-100 ${location.pathname === item.path ? 'text-red-600' : 'text-gray-600'} rounded-lg p-2 inline-flex items-center justify-center`}>
                {item.icon}
                <span className="hidden sm:inline ml-1">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
  );
}

export default withAuthentication(Menu);