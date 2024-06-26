/**
 * Menu component responsible for displaying the application menu.
 * It dynamically renders menu items based on the user's role and admin mode.
 * It also provides functionality for toggling admin mode and displaying notifications.
 *
 * @author Syed Wajahat Quadri <w21043564>
 * @author Mohammed Etri <w21015706>
 * @author Jed Bywater <>
 */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import withAuthentication from '../HOCauth';
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // Icon for the admin button

function Menu({ userRoles }) {
  const location = useLocation();
  const [adminMode, setAdminMode] = useState(false); // State to manage admin mode

  // Function to toggle admin mode, stops event propagation to prevent unintended menu toggling
  const toggleAdminMode = (event) => {
    event.stopPropagation(); // Prevent event from affecting other click handlers
    setAdminMode(!adminMode); // Toggle the visibility of the admin menu
  };

  // Regular menu items
  const menuItems = [
    { name: 'MediMatch', icon: <HomeIcon />, path: '/tinder' },
    { name: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
  ];

  if (userRoles.is_recruiter || userRoles.is_superuser) {
    menuItems.splice(1, 0, { name: 'Research', icon: <InsightsIcon />, path: '/research' });
    menuItems.splice(2, 0, { name: 'Matches', icon: <FavoriteIcon />, path: '/matches' });
  } 
  else if (userRoles.is_recruitee || userRoles.is_superuser) {
    menuItems.splice(1, 0, { name: 'Matches', icon: <FavoriteIcon />, path: '/matches/recruitee' });
  }

  // Admin menu items
  const adminItems = [
    { name: 'Data', icon: <InsightsIcon />, path: '/charts' },
    { name: 'User Management', icon: <AccountCircleIcon />, path: '/dashboard' },
    { name: 'Admin Creation', icon: <AdminPanelSettingsIcon />, path: '/admin/create' },
  ];

  // The Admin button, only shown to superusers
  const adminButton = userRoles.is_superuser ? (
    <li onClick={toggleAdminMode} className="flex-shrink cursor-pointer">
      <AdminPanelSettingsIcon />
      <span className="hidden sm:inline ml-1">Admin</span>
    </li>
  ) : null;

  // Decide which menu items to display based on adminMode
  const displayedMenuItems = adminMode ? adminItems : menuItems;

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white shadow-md pt-3 z-20 h-16">
      <ul className="flex justify-around items-center text-md font-medium">
        {adminButton}
        {displayedMenuItems.map((item) => (
          <li key={item.name} className="flex-shrink">
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


// Wrap your Menu component with the HOC to receive the userRoles prop
export default withAuthentication(Menu, { checkVerification: false });
