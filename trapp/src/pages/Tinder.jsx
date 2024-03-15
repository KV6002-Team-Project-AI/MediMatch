import React from 'react';
import ProfileCard from '../components/ProfileCard';

const Tinder = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen mx-10 mb-20'>
        <div className="w-full max-w-auto mx-auto">
          <div className="flex justify-center p-2 items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
            <select className="font-semibold py-2 px-2 rounded-lg">
              <option value="Study 1">Study 1</option>
              <option value="Study 2">Study 2</option>
            </select>
          </div>
        </div>

        <ProfileCard/>

        <div className="w-full max-w-auto mx-auto">
          <div className='flex text-white gap-2 text-center'>
            <div className='w-full bg-red-600 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-red-800 transform hover:-translate-y-0.5'>
              Reject
            </div>
            <div className='w-full bg-cyan-600 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-cyan-800 transform hover:-translate-y-0.5'>
              Refresh
            </div>
            <div className='w-full bg-green-600 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-green-800 transform hover:-translate-y-0.5'>
              Accept
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tinder;
