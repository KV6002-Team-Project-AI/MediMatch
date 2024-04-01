/**
 * RecruiteeProfileCard Component
 * 
 * This React component renders a profile card for recruitees in a recruitment platform, 
 * allowing recruiters to view detailed information about candidates, including their 
 * interests, features, and summary. It supports actions such as accepting or rejecting 
 * candidates, refreshing the list of matches, and reporting a user with a screenshot of 
 * their profile.
 * 
 * The component leverages Material-UI for the UI elements and html2canvas for capturing 
 * screenshots. It fetches data from a REST API to simulate fetching matches and handling 
 * actions on those matches. The state management is done using React's useState hook, 
 * and side effects, such as API calls, are handled using the useEffect hook.
 * 
 * The UI is divided into several sections, including a study selection dropdown, a 
 * summary button with toggle functionality, accept and reject actions with color feedback, 
 * and a report functionality that captures a screenshot of the recruitee's profile.
 * 
 * Endpoint: api/recruiter/matches/
 * 
 * Features:
 * - Fetch and display recruitee matches from a REST API
 * - Dynamically update the UI based on user interactions
 * - Select a study to filter matches
 * - Toggle between the summary view and detailed view of a recruitee
 * - Accept or reject recruitee with visual feedback
 * - Refresh matches list
 * - Report a recruitee with a screenshot of their profile
 * 
 * Note:
 * This code was primarily authored by Mohamed Etri, with specific functionalities contributed by Jed 
 * (report functionality) and Syed (Some UI elements).
 * 
 * Usage:
 * The component is intended to be used in a recruitment platform where recruiters need to 
 * evaluate candidates quickly and efficiently. It assumes the existence of an API endpoint 
 * for fetching and posting match data, and it requires Material-UI and html2canvas libraries.
 * 
 * @author Mohamed Etri
 * Contributions by: Jed (Report functionality), Syed (Some UI elements)
 */

import React, { useState, useEffect } from 'react';
import profilePic from '../assets/profile-pic.jpg';
import summariseLogo from '../assets/summary.png';
import report from '../assets/report.png';
import refresh from '../assets/refresh.png';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import ZoomIn from '@mui/material/Zoom';
import DisplayFeatures from './DisplayFeatures';
import DisplayInterests from './DisplayInterests';

import withAuthentication from '../HOCauth';
// Start of Jed's report functionality
import ReportUserForm from '../report';
import axios from 'axios';
import html2canvas from 'html2canvas';
// End of Jed's report functionality

const RecruiteeProfileCard = () => {
  const [currentMatch, setCurrentMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const [uniqueStudyNames, setUniqueStudyNames] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState('Select a Study');
  const [AcceptColor, setAcceptColor] = useState('');
  const [RejectColor, setRejectColor] = useState('');
  const [showSummary, setShowSummary] = useState(true);

  const fetchMatches = () => {
    const token = localStorage.getItem('accessToken');
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
            const uniqueNames = Array.from(new Set(pendingMatches.map(match => match.study_info.name)));
            setUniqueStudyNames(uniqueNames);
            
            if (selectedStudy === 'Select a Study' || selectedStudy === '') {
                const firstStudyName = uniqueNames[0] || 'Select a Study';
                setSelectedStudy(firstStudyName);
                const filteredMatches = pendingMatches.filter(match => match.study_info.name === firstStudyName);
                setCurrentMatch(filteredMatches.length > 0 ? filteredMatches[0] : null);
            } else {
                const filteredMatches = pendingMatches.filter(match => match.study_info.name === selectedStudy);
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
    fetch('http://127.0.0.1:8000/api/recruiter/matches/', {
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
    handleAction('accepted', currentMatch.recruitee.user_id, currentMatch.study_info.study_id);
    setTimeout(() => setAcceptColor(''), 750);
  };
  

  const handleRejectClick = () => {
    setRejectColor('bg-red-500');
    handleAction('rejected', currentMatch.recruitee.user_id, currentMatch.study_info.study_id);
    setTimeout(() => setRejectColor(''), 750);
  };


  const handleSummaryClick = () => {
    setShowSummary(!showSummary)
  }

  const handleStudySelection = (event) => {
    const selected = event.target.value;
    setSelectedStudy(selected);
    const filteredMatches = matches.filter(match => match.study_info.name === selected);
    setCurrentMatch(filteredMatches.length > 0 ? filteredMatches[0] : null);
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

  const [showReportForm, setShowReportForm] = useState(false);
  const [screenshotData, setScreenshotData] = useState(null);
  //Start of Jed's report functionality
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

return (
  <>
    <div className={`${AcceptColor || RejectColor} flex flex-col min-h-screen justify-center px-4 items-center transition-colors duration-500`}>
      <div className='flex gap-2'>
        <FormControl variant="outlined" className="w-full" style={{ minWidth: 120 }}>
          <InputLabel id="select-study-label">Select Study</InputLabel>
          <Select
            labelId="select-study-label"
            id="select-study"
            value={selectedStudy}
            onChange={handleStudySelection}
            label="Select Study"
            sx={{
              height: 40,
              '.MuiOutlinedInput-input': { paddingTop: 0, paddingBottom: 0 },
              '.MuiSelect-select': { paddingTop: '6px', paddingBottom: '6px' }
            }}
          >
            <MenuItem disabled value="Select a Study">
              <em>Select a Study</em>
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
      <div className='mt-2 w-full p-2 bg-white rounded-xl shadow-lg 
                        sm:max-w-md
                        md:max-w-lg 
                        lg:max-w-xl 
                        xl:max-w-2xl xl:py-8 xl:mx-0'>
        
        {currentMatch && (
          <div className="flex justify-between items-center">
            <Tooltip
                key='0'
                title='Summary'
                placement="top"
                TransitionComponent={ZoomIn}
                slotProps={{
                    popper: {
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, -6],
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
              <button onClick={handleSummaryClick}>
                <img src={summariseLogo} alt="Summarize" className="w-8 h-8 p-1.5 bg-blue-100 rounded-md hover:bg-blue-200 transition" />
              </button>
            </Tooltip>
            <button>
              <img src={profilePic} alt="Person" className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-sm" />
            </button>
                {/*Start of Jed's report functionality*/}
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
                                            offset: [0, -8],
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
                        <img src={report} alt="Report" className="w-8 h-8 p-1.5 bg-amber-400 rounded-md hover:bg-amber-200" />
                    </button>
                    </Tooltip>
                    {/*End of Jed's report functionality*/}
          </div>
        )}
        
        {currentMatch && !showSummary && (
          <>
              <p className='text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:md text-center border-t-2 my-2 py-2'>
                {currentMatch.recruitee.summary}
              </p>
              <div className="flex justify-between items-center mt-6">
                <button onClick={() => handleRejectClick()} className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition transform hover:-translate-y-1 mr-2 flex items-center justify-center text-xs sm:text-sm md:text-base">
                  Reject
                </button>
                <button onClick={() => handleAcceptClick()} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition transform hover:-translate-y-1 ml-2 flex items-center justify-center text-xs sm:text-sm md:text-base">
                  Accept
                </button>
              </div>
              </>
            )}
        {currentMatch ? (
          showSummary && (
          <div id="content-to-capture">
            <div className="text-center mt-1">
              <p className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:md text-gray-800">
                {`${currentMatch.recruitee.full_name}, ${currentMatch.recruitee.age}`}
              </p>
            </div>
 
            <div className="text-center mt-1">
              <p className=" sm:text-md md:xl xl:md text-gray-800">
                {currentMatch.recruitee.bio}
              </p>
            </div>
 
            <div className="mt-1">
              <h3 className="text-center font-semibold text-md sm:text-xl md:text-2xl">Features:</h3>
              <div className="flex flex-wrap justify-center gap-2 mt-1">
              <DisplayFeatures 
                  sex={currentMatch.recruitee.biological_sex}
                  hair={currentMatch.recruitee.hair_color}
                  profession={currentMatch.recruitee.profession}
                  ethnicity={currentMatch.recruitee.ethnicity}
                  nationality={currentMatch.recruitee.nationality}
                  pregnancy={currentMatch.recruitee.pregnancy_status}
                  language={currentMatch.recruitee.language_preferences}
                  activity={currentMatch.recruitee.activity_level}
                  socioeconomic={currentMatch.recruitee.socioeconomic_status}
                  health={currentMatch.recruitee.health_status}
                  medical_history={currentMatch.recruitee.medical_history}
                  medication_history={currentMatch.recruitee.medication_history}
                  current_medication={currentMatch.recruitee.current_medication}
                  family_medication_history={currentMatch.recruitee.family_medication_history}
                  allergies={currentMatch.recruitee.allergies}
                  lifestyle={currentMatch.recruitee.lifestyle}
              />
              </div>
            </div>
 
            <div className="mt-1">
              <h3 className="text-center font-semibold text-md sm:text-xl md:text-2xl">Interests:</h3>
              <div className="flex flex-wrap justify-center gap-2 mt-1">
              <DisplayInterests
                  interest_1={currentMatch.recruitee.interest_1}
                  interest_2={currentMatch.recruitee.interest_2}
                  interest_3={currentMatch.recruitee.interest_3}
                  interest_4={currentMatch.recruitee.interest_4}
              />
              </div>
            </div>
            {currentMatch && (
              <div className='flex flex-col justify-center'>
                  <div className="flex justify-between items-center mt-3">
                    <button onClick={() => handleRejectClick()} className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg shadow hover:bg-red-700 transition transform hover:-translate-y-1 mr-2 flex items-center justify-center text-xs sm:text-sm md:text-base">
                      Reject
                    </button>
                    <button onClick={() => handleAcceptClick()} className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg shadow hover:bg-green-700 transition transform hover:-translate-y-1 ml-2 flex items-center justify-center text-xs sm:text-sm md:text-base">
                      Accept
                    </button>
                  </div>
              </div>
            )}
          </div>
          )
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
                    selectedUser={currentMatch.recruitee.user_id}
                    onClose={() => setShowReportForm(false)}
                    screenshotData={screenshotData}
                />
            )}
    {/*End of Jed's report functionality*/}
  </>
 );
};

export default withAuthentication(RecruiteeProfileCard);

