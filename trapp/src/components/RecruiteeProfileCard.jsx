import React, { useState, useEffect } from 'react';
import profilePic from '../assets/profile-pic.jpg';
import infoLogo from '../assets/info.png';
import summariseLogo from '../assets/summary.png';
import withAuthentication from '../HOCauth';

const RecruiteeProfileCard = () => {
  const [currentMatch, setCurrentMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const [AcceptColor, setAcceptColor] = useState('');
  const [RejectColor, setRejectColor] = useState('');


  const fetchMatches = () => {
    const token = localStorage.getItem('accessToken'); // Retrieve the JWT token from localStorage
    if (token) {
      fetch('http://127.0.0.1:8000/api/recruiter/matches/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        const pendingMatches = data.filter(match => match.study_status === 'pending');
        setMatches(pendingMatches);
        setCurrentMatch(pendingMatches.length > 0 ? pendingMatches[0] : null);
      })
      .catch(error => console.error('Error:', error));
    }
  };

  // Fetch matches on component mount
  useEffect(fetchMatches, []);

  const handleAction = (action) => {
    if (!currentMatch) return;

    const token = localStorage.getItem('accessToken');
    fetch('http://127.0.0.1:8000/api/recruiter/matches/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: currentMatch.recruitee.user.id,
        study_id: currentMatch.study_id,
        action: action,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      fetchMatches(); // Refetch the matches after the action is completed
    })
    .catch(error => console.error('Error:', error));
  };

  // These functions will call the handleAction with the correct status
  const handleAcceptClick = () => {
    setAcceptColor('bg-green-500');
    handleAction('accepted', currentMatch.recruitee.user.id, currentMatch.study_id);
    setTimeout(() => setAcceptColor(''), 750); // Remove the color after some time
  };
  
  const handleRejectClick = () => {
    setRejectColor('bg-red-500');
    handleAction('rejected', currentMatch.recruitee.user.id, currentMatch.study_id);
    setTimeout(() => setRejectColor(''), 750);
  };
  
  return (

    <div className={`${AcceptColor || RejectColor} flex flex-col min-h-screen justify-center px-4 items-center transition-colors duration-500`}>
            {currentMatch && (
                <div className='bg-white justify-center items-center py-1 px-3 rounded-xl'>
                    <p className='text-center'> {`Study ID ${currentMatch.study_id}: ${currentMatch.study_name}`} </p>
                </div>
            )}
          <div className='mt-5 w-full px-3 py-6 bg-white rounded-3xl shadow-lg transform transition-all hover:scale-105 
                          sm:max-w-md sm:mt-5
                          md:max-w-lg md:mt-10 md:mx-0
                          lg:max-w-xl lg:mt-16 lg:mx-0
                          xl:max-w-2xl xl:py-8 xl:mx-0'>
            
            {currentMatch && (
              <div className="flex justify-between items-center">
                  <img src={summariseLogo} alt="Summarize" className="w-10 h-10 p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition" />
                  <img src={profilePic} alt="Person" className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-sm" />
                  <img src={infoLogo} alt="Info" className="w-10 h-10 p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition" />
              </div>
            )}
        {currentMatch ? (
          <>
          <div className="text-center mt-4">
            <p className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:md text-gray-800">
              {`${currentMatch.recruitee.full_name}, ${currentMatch.recruitee.age}`}
            </p>
          </div>

          <div className="mt-4">
          <h3 className="text-center font-semibold text-md sm:text-xl md:text-2xl">Features:</h3>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
              <div className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full shadow hover:bg-blue-300 transition text-sm sm:text-base md:text-lg">
                  {currentMatch.recruitee.age} y.o.
              </div>
              <div className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full shadow hover:bg-blue-300 transition text-sm sm:text-base md:text-lg">
                  {currentMatch.recruitee.height} cm
              </div>
              <div className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full shadow hover:bg-blue-300 transition text-sm sm:text-base md:text-lg">
                  {currentMatch.recruitee.weight} kg
              </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-center font-semibold text-md sm:text-xl md:text-2xl">Interests:</h3>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
              <div className="bg-green-200 text-green-800 px-4 py-2 rounded-full shadow hover:bg-green-300 transition text-sm sm:text-base md:text-lg">
                  {currentMatch.recruitee.interest_1}
              </div>
              <div className="bg-green-200 text-green-800 px-4 py-2 rounded-full shadow hover:bg-green-300 transition text-sm sm:text-base md:text-lg">
                  {currentMatch.recruitee.interest_2}
              </div>
              <div className="bg-green-200 text-green-800 px-4 py-2 rounded-full shadow hover:bg-green-300 transition text-sm sm:text-base md:text-lg">
                  {currentMatch.recruitee.interest_3}
              </div>
          </div>
        </div>
          {currentMatch && (
            <div className="flex justify-between items-center mt-6">
              <button onClick={() => handleRejectClick()} className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition transform hover:-translate-y-1 mr-2 flex items-center justify-center text-xs sm:text-sm md:text-base">
                Reject
              </button>
              <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition transform hover:-translate-y-1 flex items-center justify-center text-xs sm:text-sm md:text-base">
                Refresh
              </button>
              <button onClick={() => handleAcceptClick()} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition transform hover:-translate-y-1 ml-2 flex items-center justify-center text-xs sm:text-sm md:text-base">
                Accept
              </button>
            </div>
          )}
        </>
        ) : (
          <div className="text-center mt-4">
            <p className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:md text-gray-800">
              No pending matches.
            </p>
          </div>
        )}


  
        
      </div>
    </div>
  );
};

export default withAuthentication(RecruiteeProfileCard);

