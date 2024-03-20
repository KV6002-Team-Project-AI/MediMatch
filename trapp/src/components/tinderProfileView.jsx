import React, {useState} from 'react';
import profilePic from '../assets/profile-pic.jpg';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';

function UserProfile({ user }) {
  
  const features = ["Brown Hair", "25 Years old", "1.76 metres"]
  const interests = ["Coding", "Hiking", "Traveling", "Photography"]
  const researchFields = [
    'Medical and Health', 
    'Social', 
    'Natural', 
    'Engineering and Technology',
    'Business and Management',
    'Humanities and Arts',
    'Agricultural and Environmental',
    'Interdisciplinary'
  ]
  const trivialInfo = ['Diabetes II', 'Asthma', 'Dust Allergy']

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [placement, setPlacement] = React.useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;
  
  return (
    <div className="mx-3 my-20">
      <div className="flex flex-col items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl p-6">
        <img src={profilePic} alt="Profile Picture" className="h-32 w-32 rounded-full mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
          <div className="border-t border-gray-200 mt-6 w-full">
            <div className="py-2">
              <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">Personal Information</h3>
              <div className="flex items-center mb-2">
                <span className="text-gray-600 mr-2">Bio:</span>
                <p className="text-gray-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-600 mr-2">Age:</span>
                <p className="text-gray-800">30</p>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-600 mr-2">Sex:</span>
                <p className="text-gray-800">Male</p>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-600 mr-2">Nationality:</span>
                <p className="text-gray-800">USA</p>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Race:</span>
                <p className="text-gray-800">Caucasian</p>
              </div>
              <div className="text-center">
                <div>
                <Popper 
                  id={id} 
                  placement='top'
                  open={open} 
                  anchorEl={anchorEl} 
                  transition
                  modifiers={[
                    {
                      name: 'flip',
                      enabled: true,
                      options: {
                        altBoundary: true,
                        rootBoundary: 'viewport',
                        padding: 8,
                      }
                    }
                  ]}
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Box sx={{ border: 1, p: 1, my: 1, bgcolor: 'background.paper' }}>
                        BIO: <br/>
                        AGE: <br/>
                      </Box>
                    </Fade>
                  )}
                </Popper>
                </div>
              </div>
            </div>
          </div>
          <div className='border-t border-gray-200 mt-3 w-full'>
            <div className="pt-2 pb-1">
              <h3 className="text-center text-lg font-semibold mb-2 text-gray-800">Features</h3>
              <div className="flex gap-2 justify-center pb-2 flex-wrap overflow-x-auto">
                {features.map((feature, index) => (
                    <div key={index} className="bg-blue-100 text-blue-800 p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                        {feature}
                    </div>
                ))}                    
              </div>
              <h3 className="text-center text-lg font-semibold mb-2 text-gray-800">Interests</h3>
              <div className="flex gap-2 justify-center flex-wrap overflow-x-auto">
                {interests.map((interest, index) => (
                    <div key={index} className="bg-green-100 text-green-800 p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                        {interest}
                    </div>
                ))}
              </div>
              <h3 className="text-center text-lg font-semibold my-2 text-gray-800">Research</h3>
              <div className="flex gap-2 justify-center flex-wrap overflow-x-auto">
                {researchFields.map((research, index) => (
                    <div key={index} className="bg-yellow-100 text-yellow-800 p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg text-nowrap">
                        {research}
                    </div>
                ))}
              </div>
              <h3 className="text-center text-lg font-semibold my-2 text-gray-800">Trivial</h3>
              <div className="flex gap-2 justify-center flex-wrap overflow-x-auto">
                {trivialInfo.map((trivial, index) => (
                    <div key={index} className="bg-purple-100 text-purple-800 p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                        {trivial}
                    </div>
                ))}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}


export default UserProfile;
