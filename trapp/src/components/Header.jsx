import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import puzzleLogo from '../assets/puzzle.png';
import mediMatchLogo from '../assets/MediMatchLogo.png';
import SettingsIcon from '@mui/icons-material/Settings';


function Header() {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    }

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
                    <Link to="/settings" className={`transition duration-200 ease-in-out hover:bg-gray-200 ${location.pathname === '/settings'} rounded-full p-2 mt-1 inline-block`}>
                        <SettingsIcon sx={{ fontSize: 30 }}/>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Header;
