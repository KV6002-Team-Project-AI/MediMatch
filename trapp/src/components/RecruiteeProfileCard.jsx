import React, { useState } from 'react';
import profilePic from '../assets/profile-pic.jpg';
import infoLogo from '../assets/info.png';
import summariseLogo from '../assets/summary.png';
import withAuthentication from '../HOCauth';

const RecruiteeProfileCard = () => {
  const features = ["Brown Hair", "25 Years old", "1.76 metres"];
  const interests = ['Football', 'Swimming', 'Reading'];

  const [AcceptColor, setAcceptColor] = useState('');
  const [RejectColor, setRejectColor] = useState('');

  const handleAcceptClick = () => {
    setAcceptColor('bg-green-500');
    setTimeout(() => setAcceptColor(''), 750);
  };

  const handleRejectClick = () => {
    setRejectColor('bg-red-500');
    setTimeout(() => setRejectColor(''), 750);
  };

  return (
    <div className={`${AcceptColor || RejectColor} flex flex-col min-h-screen justify-center items-center transition-colors duration-500`}>
      <div className='mt-5 w-full px-3 py-6 bg-white rounded-3xl shadow-lg transform transition-all hover:scale-105 
                      sm:max-w-md sm:mt-5
                      md:max-w-lg md:mt-10 md:mx-0
                      lg:max-w-xl lg:mt-16 lg:mx-0
                      xl:max-w-2xl xl:py-8 xl:mx-0'>
        <div className="flex justify-between items-center">
          <img src={summariseLogo} alt="Summarize" className="w-10 h-10 p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition" />
          <img src={profilePic} alt="Person" className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-sm" />
          <img src={infoLogo} alt="Info" className="w-10 h-10 p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition" />
        </div>
        <div className="text-center mt-4">
          <p className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:md text-gray-800">John Doe</p>
          <p className='mt-2 text-gray-600 text-sm sm:text-base md:text-lg lg:text-lg xl:md'>Welcome to my natural habitat, where I express my interests and features.</p>
        </div>

        <div className="mt-4">
          <h3 className="text-center font-semibold text-md sm:text-xl md:text-2xl">Features:</h3>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {features.map((feature, index) => (
              <span key={index} className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full shadow hover:bg-blue-300 transition text-sm sm:text-base md:text-lg">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-center font-semibold text-lg sm:text-xl md:text-2xl">Interests:</h3>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {interests.map((interest, index) => (
              <span key={index} className="bg-green-200 text-green-800 px-4 py-2 rounded-full shadow hover:bg-green-300 transition text-sm sm:text-base md:text-lg">
                {interest}
              </span>
            ))}
          </div>
        </div>

          <div className="flex justify-between items-center mt-6">
              <button onClick={handleRejectClick} className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition transform hover:-translate-y-1 mr-2 flex items-center justify-center text-xs sm:text-sm md:text-base">
                  Reject
              </button>
              <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition transform hover:-translate-y-1mx-2 flex items-center justify-center text-xs sm:text-sm md:text-base">
                  Refresh
              </button>
              <button onClick={handleAcceptClick} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition transform hover:-translate-y-1 ml-2 flex items-center justify-center text-xs sm:text-sm md:text-base">
                  Accept
              </button>
          </div>
      </div>
    </div>
);
};

export default withAuthentication(RecruiteeProfileCard);

