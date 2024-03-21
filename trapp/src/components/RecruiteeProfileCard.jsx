import React, { useState } from 'react'
import profilePic from '../assets/profile-pic.jpg'
import infoLogo from '../assets/info.png'
import summarise from '../assets/summary.png'
import withAuthentication from '../HOCauth';

const RecruiteeProfileCard = () => {


    const features = ["Brown Hair", "25 Years old", "1.76 metres"];
    const interests = ['Football', 'Swimming', 'Reading'];
  
      // State to manage the background color
    const [AcceptColor, setAcceptColor] = useState('');
    const [RejectColor, setRejectColor] = useState('');



    // Function to change the background color temporarily
    const handleAcceptClick = () => {
      setAcceptColor('bg-green-400'); // Set the background color to green
      setTimeout(() => setAcceptColor(''), 750); // Reset the background color after 2 seconds
    };

    const handleRejectClick = () => {
      setRejectColor('bg-red-400'); // Set the background color to red
      setTimeout(() => setRejectColor(''), 750); // Reset the background color after 2 seconds
    };

    return (
      <>
      <div className={`${AcceptColor || RejectColor} flex flex-col min-h-screen justify-content`}>
        <div className='fixed top-16 left-0 right-0 mx-auto mt-4 w-full max-w-screen-md x-4 z-10'>
          <div className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
            <select className="font-semibold py-2 px-2 rounded-lg w-full text-center">
              <option value="Study 1">Study 1</option>
              <option value="Study 2">Study 2</option>
            </select>
          </div>
        </div>

        <div className='mt-10 mx-3 flex-grow flex flex-col items-center justify-center'>
        <div className='my-3 w-full max-w-screen-md mx-auto'>
          <div className="flex flex-col justify-center p-2 items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl relative">
            <img src={summarise} alt="summarise" className=" w-7 h-7 hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-0.5 absolute top-2 left-2" />
            <img src={infoLogo} alt="info" className="w-7 h-7 hover:bg-gray-200 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-0.5 absolute top-2 right-2"/>
            <img src={profilePic} alt="Person" className="w-20 h-20 rounded-full"/>
            <p className="font-medium text-lg text-gray-800">John Doe</p>
            <p className='text-center font-normal mt-3'>Welcome to my natural habitat, where I can speak no more than this.</p>
    
            <hr className="border-gray-400 w-full" />
    
            <div className="font-semibold justify-center mt-3 mb-3 underline underline-offset-2">Features: </div>
            <div className="flex gap-2">
              {features.map((feature, index) => (
                <div key={index} className="bg-blue-100 w-full text-blue-800 p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                  {feature}
                </div>
              ))}
            </div>
    
            <hr className="border-gray-400 w-full mt-3" />
    
            <div className="font-semibold justify-center mt-3 mb-3 underline underline-offset-2">Interests: </div>
            <div className="flex gap-2">
              {interests.map((interests, index) => (
                <div key={index} className="bg-green-100 w-full text-green-800 p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                  {interests}
                </div>
              ))}
            </div>
          </div>
        </div>
          <div className="w-full max-w-screen-md mx-auto">
            <div className='flex text-white gap-2 text-center'>
              <button onClick={handleRejectClick} className='w-full bg-red-600 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-red-800 transform hover:-translate-y-0.5'>
                Reject
              </button>
              <button className='w-full bg-cyan-600 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-cyan-800 transform hover:-translate-y-0.5'>
                Refresh
              </button>
              <button onClick={handleAcceptClick} className='w-full bg-green-600 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-green-800 transform hover:-translate-y-0.5'>
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
      </>   
    );
  };
  

export default withAuthentication(RecruiteeProfileCard);
