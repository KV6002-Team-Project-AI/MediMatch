 // Start Of Jeds Code*/}
import React, { useState } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

function RecruiterProfile({ user, getReadableValue, onUpdateProfileImage }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const profileImageUrl = user.profile_image_url
        ? new URL(user.profile_image_url, 'http://localhost:8000').href
        : '/static/images/avatar/1.jpg';

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedImage(file);
            onUpdateProfileImage(file);
        }
    };

    const handleEditProfileClick = () => {
        navigate('/update/recruiter');
    };

    return (
        <div className="mx-3 my-20">
            <Box className="flex flex-col items-center bg-white shadow-md hover:bg-gray-100 rounded-2xl p-6">
                <Avatar
                    src={selectedImage ? URL.createObjectURL(selectedImage) : profileImageUrl}
                    sx={{ width: 128, height: 128 }}
                />
                <input
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="profile-image-input"
                />
                <label htmlFor="profile-image-input">
                    <Button size="small" component="span">
                        <EditIcon />
                    </Button>
                </label>
                <Typography variant="h5" className="mt-4">{user.full_name}</Typography>
                <Typography variant="subtitle1">{user.email}</Typography>

                <Box className="mt-6 w-full text-center">
                    <Typography variant="h6" className="mb-2">Company Information</Typography>
                    <Typography>{user.company ? `Company: ${user.company}` : 'No company information'}</Typography>
                    <Typography>{user.research_area ? `Research Area: ${user.research_area}` : 'No research area specified'}</Typography>
                    <Typography>{user.company_info ? `Company Info: ${user.company_info}` : 'No company info provided'}</Typography>
                </Box>

                <Box className="mt-4 text-center">
                    <Button onClick={handleEditProfileClick} variant="contained">
                        Edit Profile
                    </Button>
                </Box>
            </Box>
        </div>
    );
}

export default RecruiterProfile;
 {/* End Of Jeds Code*/}