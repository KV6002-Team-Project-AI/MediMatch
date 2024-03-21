import React, { useState } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function UserProfile({ user, getReadableValue, onUpdateProfileImage }) {
  


  const [selectedImage, setSelectedImage] = useState(null);
  const profileImageUrl = user.profile_image_url
  ? new URL(user.profile_image_url, 'http://localhost:8000').href
  : '/static/images/avatar/1.jpg';
  console.log('Selected image file:', selectedImage);
  console.log('Profile image URL:', profileImageUrl);
    const features = [
        user.height ? `${user.height} CM` : '',
        user.weight ? `${user.weight} KG` : '',
        user.biological_sex ? `${getReadableValue('biological_sex_choices', user.biological_sex)}` : ''
    ].filter(Boolean);

    const interests = [
        getReadableValue('interest_choices', user.interest_1),
        getReadableValue('interest_choices', user.interest_2),
        getReadableValue('interest_choices', user.interest_3),
        getReadableValue('interest_choices', user.interest_4)
    ].filter(Boolean);

      const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      onUpdateProfileImage(file);

      // Debugging: Log the object URL for the selected image
      const objectUrl = URL.createObjectURL(file);
      console.log('New image object URL:', objectUrl);
    }
  };
    const navigate = useNavigate(); // Use the navigate function

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleEditProfileClick = () => {
        navigate('/update/recruitee'); // Navigate to the edit profile page
    };

    const id = open && Boolean(anchorEl) ? 'transition-popper' : undefined;

    return (
      <div className="mx-3 my-20">
          <Box className="flex flex-col items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl p-6">
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
                    <Typography variant="h6" className="mb-2">Bio</Typography>
                    <Typography>{user.bio || "Please add a bio."}</Typography>
                </Box>

                <Box className="mt-3 w-full text-center">
                    <Typography variant="h6" className="mb-2">Features</Typography>
                    <Box className="flex gap-2 justify-center flex-wrap">
                        {features.map((feature, index) => (
                            <Box key={index} className="p-2" sx={{ bgcolor: 'info.light', borderRadius: '8px' }}>
                                {feature}
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box className='mt-3 w-full text-center'>
                    <Typography variant="h6" className="mb-2">Interests</Typography>
                    <Box className="flex gap-2 justify-center flex-wrap">
                        {interests.map((interest, index) => (
                            <Box key={index} className="p-2" sx={{ bgcolor: 'success.light', borderRadius: '8px' }}>
                                {interest}
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box className="mt-4 text-center">
                    <Button onClick={handleEditProfileClick} variant="contained">
                        Edit Profile
                    </Button>
                </Box>

                <Popper id={id} open={open} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                                <Typography>Bio: {user.bio}</Typography>
                            </Box>
                        </Fade>
                    )}
                </Popper>
            </Box>
        </div>
    );
}

export default UserProfile;
