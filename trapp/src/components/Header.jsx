import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import puzzleLogo from '../assets/puzzle.png';
import mediMatchLogo from '../assets/MediMatchLogo.png';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [userRoles, setUserRoles] = useState({ isRecruitee: false, isRecruiter: false });

    useEffect(() => {
        // API call to fetch user roles
        fetch('/api/user', {
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

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    <Link to="/" className="flex items-center">
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
                                <MenuItem onClick={handleClose} component={Link} to="/recruitee-profile-edit">Recruitee Profile Edit</MenuItem>
                            )}
                            {userRoles.isRecruiter && (
                                <MenuItem onClick={handleClose} component={Link} to="/recruiter-profile-edit">Recruiter Profile Edit</MenuItem>
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
