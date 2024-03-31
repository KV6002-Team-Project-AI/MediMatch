import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import puzzleLogo from '../assets/puzzle.png';
import mediMatchLogo from '../assets/MediMatchLogo.png';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

/**
 * Header component responsible for displaying the application header.
 * It includes navigation links, user settings, and logout functionality.
 *
 * @author Syed Wajahat Quadri <w21043564>
 * @author Mohammed Etri <>
 * @author Jed Bywater <>
 */
function Header() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [userRoles, setUserRoles] = useState({ isRecruitee: false, isRecruiter: false });

    /**
     * Fetches user roles from the backend upon component mount.
     */
    useEffect(() => {
        fetch('http://localhost:8000/api/user', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setUserRoles({
                isRecruitee: data.is_recruitee,
                isRecruiter: data.is_recruiter
            });
        })
        .catch(error => console.error('Error fetching user roles:', error));
    }, []);

    /**
     * Handles opening the user settings menu.
     * @param {Event} event - The event triggering the menu opening.
     */
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * Handles closing the user settings menu.
     */
    const handleClose = () => {
        setAnchorEl(null);
    };

    /**
     * Handles user logout action.
     * Clears authentication tokens and redirects to the sign-in page.
     */
    const handleLogout = () => {
        fetch('/api/logout/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: localStorage.getItem('refreshToken') })
        })
        .then(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            handleClose();  // Close the settings menu
            navigate('/signin');  // Redirect to sign-in page
        })
        .catch(error => console.error('Error during logout:', error));
    };

    return (
        <div className="fixed inset-x-0 top-0 bg-white shadow-md pt-1.5 h-16 z-10">
            <ul className="flex justify-between items-center text-sm font-medium px-4 gap-1">
                <li>
                    <Link to="/tinder" className="flex items-center">
                        <img src={puzzleLogo} alt="Puzzle Logo" className="h-8 w-8" />
                        <img src={mediMatchLogo} alt="MediMatch Logo" className="h-12 w-auto" />
                    </Link>
                </li>
                <li>
                    <div>
                        <SettingsIcon sx={{ fontSize: 30 }} onClick={handleMenu} className="cursor-pointer" />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {userRoles.isRecruitee && (
                                <MenuItem onClick={handleClose} component={Link} to="/update/recruitee">Recruitee Profile Edit</MenuItem>
                            )}
                            {userRoles.isRecruiter && (
                                <MenuItem onClick={handleClose} component={Link} to="/update/recruiter">Recruiter Profile Edit</MenuItem>
                            )}
                            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                        </Menu>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Header;
