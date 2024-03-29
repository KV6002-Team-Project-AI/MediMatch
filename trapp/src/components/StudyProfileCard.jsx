import React, { useState, useEffect } from 'react';
import infoLogo from '../assets/info.png';
import report from '../assets/report.png';
import refresh from '../assets/refresh.png';
import withAuthentication from '../HOCauth';
import ReportUserForm from '../report';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import ZoomIn from '@mui/material/Zoom';

const StudyProfileCard = () => {
  const [currentMatch, setCurrentMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const [uniqueStudyNames, setUniqueStudyNames] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState('Select a Category');
  const [AcceptColor, setAcceptColor] = useState('');
  const [RejectColor, setRejectColor] = useState('');
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);

  const fetchMatches = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        fetch('http://127.0.0.1:8000/api/recruitee/matches/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            const pendingMatches = data.filter(match => match.recruitee_status === 'pending');
            setMatches(pendingMatches);
            const uniqueNames = Array.from(new Set(pendingMatches.map(match => match.study_info.category)));
            setUniqueStudyNames(uniqueNames);
            if (selectedStudy === 'Select a Category' || selectedStudy === '') {
                const firstStudyName = uniqueNames[0] || 'Select a Category';
                setSelectedStudy(firstStudyName);
                const filteredMatches = pendingMatches.filter(match => match.study_info.category === firstStudyName);
                setCurrentMatch(filteredMatches.length > 0 ? filteredMatches[0] : null);
            } else {
                const filteredMatches = pendingMatches.filter(match => match.study_info.category === selectedStudy);
                setCurrentMatch(filteredMatches.length > 0 ? filteredMatches[0] : null);
            }
        })
        .catch(error => console.error('Error:', error));
    }
};

  useEffect(fetchMatches, []);

  const handleAction = (action) => {
    if (!currentMatch) return;

    const token = localStorage.getItem('accessToken');
    fetch('http://127.0.0.1:8000/api/recruitee/matches/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: currentMatch.recruitee.user_id,
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

  const handleAcceptClick = () => {
    setAcceptColor('bg-green-500');
    handleAction('accepted');
    setTimeout(() => setAcceptColor(''), 750);
  };
  
  const handleRejectClick = () => {
    setRejectColor('bg-red-500');
    handleAction('rejected');
    setTimeout(() => setRejectColor(''), 750);
  };
  
  const handleStudySelection = (event) => {
    const selected = event.target.value;
    setSelectedStudy(selected);
    const filteredMatches = matches.filter(match => match.study_info.category === selected);
    setCurrentMatch(filteredMatches.length > 0 ? filteredMatches[0] : null);
  };

  const toggleAdditionalInfo = () => {
    setShowAdditionalInfo(!showAdditionalInfo);
  };

  const handleReportClick = () => {
    setShowReportForm(true);
  };

  const handleRefreshClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/run-command/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('API call failed with status: ' + response.status);
      }
  
      window.location.reload();
    } catch (error) {
      console.error('Failed to execute command:', error);
    }
  };
  
  return ( 
    <>
    <div className={`${AcceptColor || RejectColor} flex flex-col min-h-screen justify-center px-4 items-center transition-colors duration-500`}>
          <div className='flex gap-2'>
        <FormControl variant="outlined" className="w-full" style={{ minWidth: 120 }}>
          <InputLabel id="select-study-label">Select Category</InputLabel>
          <Select
            labelId="select-study-label"
            id="select-study"
            value={selectedStudy}
            onChange={handleStudySelection}
            label="Select Category"
            // Applying minimal custom styling for demonstration
            sx={{
              height: 40, // Adjust the height as needed
              '.MuiOutlinedInput-input': { paddingTop: 0, paddingBottom: 0 },
              '.MuiSelect-select': { paddingTop: '6px', paddingBottom: '6px' }
            }}
          >
            <MenuItem disabled value="Select a Study">
              <em>Select a Category</em>
            </MenuItem>
            {uniqueStudyNames.map((name, index) => (
              <MenuItem key={index} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip
                key='0'
                title='Refresh'
                placement="top"
                TransitionComponent={ZoomIn}
                slotProps={{
                    popper: {
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, -14],
                                },
                            },
                        ],
                    },
                }}
                arrow
                disableInteractive
                enterDelay={100}
                leaveDelay={100}
            >
              <button onClick={handleRefreshClick}>
                  <img src={refresh} alt="refresh" className="w-8 h-6 p-1 bg-gray-300 rounded-md hover:bg-gray-100 transition" />
              </button>
          </Tooltip>
      </div>
          <div className='mt-5 w-full px-3 py-6 bg-white rounded-3xl shadow-lg transform transition-all hover:scale-105 
                          sm:max-w-md sm:mt-5
                          md:max-w-lg md:mt-10 md:mx-0
                          lg:max-w-xl lg:mt-16 lg:mx-0
                          xl:max-w-2xl xl:py-8 xl:mx-0'>
            
        {currentMatch ? (
          <>
          <div className="flex justify-between items-center ">
            <div className="bg-green-200 text-green-800  rounded-full shadow hover:bg-green-300 transition duration-300 ease-in-out text-base md:text-lg flex-1 mx-2 text-center">
              {currentMatch.study_info.start_date}
            </div>
            <div className="bg-yellow-200 text-yellow-800  rounded-full shadow hover:bg-yellow-300 transition duration-300 ease-in-out text-base md:text-lg flex-1 mx-2 text-center">
              {currentMatch.study_info.duration}
            </div>
            <div className="bg-orange-200 text-orange-800  rounded-full shadow hover:bg-orange-300 transition duration-300 ease-in-out text-base md:text-lg flex-1 mx-2 text-center">
              {currentMatch.study_info.work_preference}
            </div>
          </div>

          <div className="text-center mt-3">
            <p className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:md text-gray-800">
              {currentMatch.study_name}
            </p>
          </div>

          <div className="text-center mt-3">
            <p className=" sm:text-md md:xl xl:md text-gray-800">
              {currentMatch.study_info.description}
            </p>
          </div>


          <div className="flex flex-col mt-2 justify-center items-center">
            <h4 className="inline-block bg-red-200 text-red-800 px-2 py-2 rounded-full shadow hover:bg-red-300 transition text-sm leading-none">
              Category: {currentMatch.study_info.category}
            </h4>
          </div>


        <div className="mt-4">
        <h3 className="text-center font-semibold text-md sm:text-xl md:text-2xl">Requirements:</h3>
        <div className="flex overflow-x-auto mt-1 gap-2 mx-2" style={{scrollbarWidth: 'none'}}>
          <div className="bg-green-200 text-green-800 px-4 py-1 rounded-full shadow hover:bg-green-300 transition text-sm sm:text-base md:text-lg whitespace-nowrap" style={{width: 'min-content'}}>
              {currentMatch.study_info.min_age} y.o.
          </div>
          <div className="bg-green-200 text-green-800 px-4 py-1 rounded-full shadow hover:bg-green-300 transition text-sm sm:text-base md:text-lg whitespace-nowrap" style={{width: 'min-content'}}>
              {currentMatch.study_info.max_age} y.o.
          </div>
          <div className="bg-green-200 text-green-800 px-4 py-1 rounded-full shadow hover:bg-green-300 transition text-sm sm:text-base md:text-lg whitespace-nowrap" style={{width: 'min-content'}}>
              {currentMatch.study_info.min_height} cm
          </div>
          <div className="bg-green-200 text-green-800 px-4 py-1 rounded-full shadow hover:bg-green-300 transition text-sm sm:text-base md:text-lg whitespace-nowrap" style={{width: 'min-content'}}>
              {currentMatch.study_info.max_height} cm
          </div>
          <div className="bg-green-200 text-green-800 px-4 py-1 rounded-full shadow hover:bg-green-300 transition text-sm sm:text-base md:text-lg whitespace-nowrap" style={{width: 'min-content'}}>
              {currentMatch.study_info.biological_sex.name}
          </div>
          <div className="bg-green-200 text-green-800 px-4 py-2 rounded-full shadow hover:bg-green-300 transition text-sm sm:text-base md:text-lg whitespace-nowrap" style={{width: 'min-content'}}>
              {currentMatch.study_info.profession.name}
          </div>
        </div>
      </div>
      {currentMatch && (
              <div className='flex flex-col justify-center'>
                  <div className="flex justify-between items-center mt-3">
                    <button onClick={() => handleRejectClick()} className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg shadow hover:bg-red-700 transition transform hover:-translate-y-1 mr-2 flex items-center justify-center text-xs sm:text-sm md:text-base">
                      Reject
                    </button>
                    <Tooltip
                        key='0'
                        title='Report'
                        placement="top"
                        TransitionComponent={ZoomIn}
                        slotProps={{
                            popper: {
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, -4],
                                        },
                                    },
                                ],
                            },
                        }}
                        arrow
                        disableInteractive
                        enterDelay={100}
                        leaveDelay={100}
                    >
                    <button onClick={handleReportClick}>
                        <img src={report} alt="Report" className="w-8 h-8 p-1 bg-amber-400 rounded-md hover:bg-amber-200  transition transform hover:-translate-y-1" />
                    </button>
                    </Tooltip>
                    <button onClick={() => handleAcceptClick()} className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg shadow hover:bg-green-700 transition transform hover:-translate-y-1 ml-2 flex items-center justify-center text-xs sm:text-sm md:text-base">
                      Accept
                    </button>
                  </div>
              </div>
            )}
        </>
        ) 
        :
        (
          
          <div className="text-center">
            <p className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:md text-gray-800">
              No pending matches.
            </p>
          </div>
        )}
      </div>
    </div>
    {/*Start of Jed's report functionality*/}
    {showReportForm && currentMatch && (
      <ReportUserForm
          selectedUser={currentMatch.recruitee.user}
          onClose={() => setShowReportForm(false)}
      />
  )}
  {/*End of Jed's report functionality*/}
  </>
  );
};

export default withAuthentication(StudyProfileCard);

