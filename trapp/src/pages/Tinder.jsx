import React, { useState } from 'react';
import MobileProfileCard from '../components/MobileProfileCard';
import withAuthentication from '../HOCauth'; // Import the HOC


const Tinder = () => {
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
        <div className='fixed top-16 left-0 right-0 mx-auto mt-4 w-full max-w-screen-md px-4 z-10'>
          <div className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
            <select className="font-semibold py-2 px-2 rounded-lg w-full text-center">
              <option value="Study 1">Study 1</option>
              <option value="Study 2">Study 2</option>
            </select>
          </div>
        </div>

        <div className='mt-10 mx-3 flex-grow flex flex-col items-center justify-center'>
          <MobileProfileCard/>

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

export default withAuthentication(Tinder);
