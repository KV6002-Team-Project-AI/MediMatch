/**
 * StudyProfileCard Component
 * 
 * This React component is designed to present detailed information about study matches
 * in a recruitment platform context. It allows users to view and interact with potential 
 * study matches based on various criteria, such as category, duration, and preferences.
 * Users can accept or reject matches, and have the option to report a match, which
 * triggers a modal form for further actions.
 * 
 * The component makes use of several hooks for state management, including useState for
 * storing matches, selected study categories, and UI state. It also utilizes useEffect for
 * fetching matches upon component mount. Actions such as accepting, rejecting, and reporting
 * matches are facilitated through event handlers that update the component's state and potentially
 * make API calls to reflect these actions in the backend.
 * 
 * UI elements are primarily based on Material-UI components, offering a consistent and
 * customizable user interface. The component structure includes selection controls for study
 * categories, informational tooltips, and a dynamic table for displaying minimum and maximum
 * requirements for study participation.
 * 
 * Endpoint: api/recruitee/matches/
 * 
 * Usage:
 * This component is intended for use in web applications focused on study recruitment,
 * enabling users (recruiters or recruitees) to manage their study matches efficiently.
 * It requires the Material-UI library for UI components and assumes a backend service
 * for fetching and updating match data.
 * 
 * Author: Mohamed Etri
 * Contributions by: Jed (Report functionality), Syed (Some UI elements)
 */

import React, { useState, useEffect } from 'react';
import report from '../assets/report.png';
import refresh from '../assets/refresh.png';
import withAuthentication from '../HOCauth';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import ZoomIn from '@mui/material/Zoom';
import MinMaxTable from './MinMaxTable';

// Start of Jed's report functionality
import ReportUserForm from '../report';
import axios from 'axios';
import html2canvas from 'html2canvas';
// End of Jed's report functionality


const StudyProfileCard = () => {
  const [currentMatch, setCurrentMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const [uniqueStudyNames, setUniqueStudyNames] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState('Select a Category');
  const [AcceptColor, setAcceptColor] = useState('');
  const [RejectColor, setRejectColor] = useState('');

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
        study_id: currentMatch.study_info.study_id,
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
      fetchMatches();
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


 // Jed's report functionality
 const [showReportForm, setShowReportForm] = useState(false);
 const [screenshotData, setScreenshotData] = useState(null);
 
 const handleReportClick = () => {
     // Identify the element you want to capture
     const element = document.getElementById('content-to-capture');
     if (element) {
         html2canvas(element).then(canvas => {
             // Convert the canvas to a data URL
             const imageData = canvas.toDataURL('image/png');
             // Store the screenshot data in state
             setScreenshotData(imageData);
             // Show the report form
             setShowReportForm(true);
         }).catch(err => {
             console.error('Error capturing screenshot:', err);
         });
     }
 };
   //End of Jed's report functionality
   

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
        <div className='flex gap-2 bg-white p-3 rounded-xl transition-all transform hover:translate-y-1'>
        <FormControl variant="outlined" className="w-full" style={{ minWidth: 120 }}>
          <InputLabel id="select-study-label">Select Category</InputLabel>
          <Select
            labelId="select-study-label"
            id="select-study"
            value={selectedStudy}
            onChange={handleStudySelection}
            label="Select Category"
            sx={{
              height: 40,
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
                  <img src={refresh} alt="refresh" className="w-8 h-7 p-1 bg-gray-300 rounded-md hover:bg-gray-100 transition" />
              </button>
          </Tooltip>
      </div>
          <div className='mt-2 w-full px-2 py-3 bg-white rounded-xl shadow-lg transition transform hover:-translate-y-1
                          sm:max-w-md
                          md:max-w-lg
                          lg:max-w-xl
                          xl:max-w-2xl'>
            
        {currentMatch ? (
          
          <div id="content-to-capture">
           
          <div className="flex justify-between items-center">
            <div className="bg-green-200 text-green-800  rounded-md shadow hover:bg-green-300 transition duration-300 ease-in-out text-base md:text-lg flex-1 mx-1 text-center">
              {currentMatch.study_info.start_date}
            </div>
            <div className="bg-yellow-200 text-yellow-800  rounded-md shadow hover:bg-yellow-300 transition duration-300 ease-in-out text-base md:text-lg flex-1 mx-1 text-center">
              {currentMatch.study_info.duration}
            </div>
            <div className="bg-blue-200 text-blue-800  rounded-md shadow hover:bg-blue-300 transition duration-300 ease-in-out text-base md:text-lg flex-1 mx-1 text-center">
              {currentMatch.study_info.work_preference}
            </div>
          </div>

          <div className="text-center mt-3">
            <p className="font-semibold text-xl md:text-2xl lg:text-3xl text-gray-800">
              {currentMatch.study_info.name}
            </p>
          </div>

          <div className="text-center mt-2">
            <p className="text-sm md:text-lg text-gray-800">
              {currentMatch.study_info.description}
            </p>
          </div>


          <div className="flex flex-col mt-2 justify-center items-center">
            <h4 className="inline-block bg-cyan-200 text-cyan-900 px-4 py-2 rounded-lg shadow hover:bg-cyan-300 transition text-sm leading-none">
              {currentMatch.study_info.category}
            </h4>
          </div>


        <div className="my-2">
        <h3 className="text-center font-semibold text-md sm:text-lg md:text-xl">Requirements:</h3>
            <div className='p-2'>
              <MinMaxTable
                  minAge={currentMatch.study_info.min_age}
                  minWeight={currentMatch.study_info.min_weight}
                  minHeight={currentMatch.study_info.min_height}
                  maxAge={currentMatch.study_info.max_age}
                  maxWeight={currentMatch.study_info.max_weight}
                  maxHeight={currentMatch.study_info.max_height}
              />
            </div>
      </div>
      
      {currentMatch && (
              <div className='flex flex-col justify-center'>
                  <div className="flex justify-between items-center">
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
        </div>
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
          selectedUser={currentMatch.recruiter_info.user_id}
          onClose={() => setShowReportForm(false)}
          screenshotData={screenshotData}
      />
  )}
  {/*End of Jed's report functionality*/}
  </>
  );
};

export default withAuthentication(StudyProfileCard);

