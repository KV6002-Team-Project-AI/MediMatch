import { useEffect, useState } from 'react';
import addLogo from '../assets/add.svg'
import { useNavigate } from 'react-router-dom';
import withAuthentication from '../HOCauth';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Tooltip from '@mui/material/Tooltip';
import ZoomIn from '@mui/material/Zoom';
import ZoomOut from '@mui/icons-material/ZoomOut';
import MinMaxTable from '../components/MinMaxTable';
import Preferences from '../components/Preferences';

const Research = ({ userRoles }) => {
    const navigate = useNavigate()
    const [studies, setStudies] = useState([]);
    const [noStudy, setNoStudy] = useState(false);
    const [expandedStudies, setExpandedStudies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [isLgScreen, setIsLgScreen] = useState(false);
    const [hideInfoButton, setHideInfoButton] = useState(false);

    // Date Format function
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    // Duration fix
    function durationFix(duration) {
        if (duration === "Less than 1 week") {
            return "<1 week"
        } else if (duration === "More than 4 weeks") {
            return ">4 weeks"
        } else {
            return duration
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setIsLgScreen(window.innerWidth >= 1024);
        };

        handleResize(); // Call initially to set the state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Filter studies based on search query
    const filteredStudies = studies.filter(study =>
        Object.values(study).some(attribute =>
            typeof attribute === 'string' && attribute.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    useEffect(() => {
        // If the screen width is large, hide the info button
        if (isLgScreen) {
            setHideInfoButton(true);
            // Expand all studies when the screen is large
            setExpandedStudies(new Array(filteredStudies.length).fill(true));
        } else {
            // If the screen width is not large, show the info button
            setHideInfoButton(false);
            // Initialize expandedStudies state based on the number of studies
            // setExpandedStudies(new Array(filteredStudies.length).fill(false));
        }
        
    }, [isLgScreen, filteredStudies]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/studycreate/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudies(data);
                console.log(data);
                if (data.length === 0) {
                    setNoStudy(true);
                } else {
                    setNoStudy(false);
                    // Initialize expandedStudies state based on the number of studies
                    setExpandedStudies(new Array(data.length).fill(false));
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchData();
    }, []);
    
    const fetchDataAfterDelete = async (studyId) => {
        try {
            const url = `http://localhost:8000/api/studyexpire/`;
            const method = 'POST';
    
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({
                    study_id: studyId,
                    isExpired: true,
                }), 
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Success:', data);
    
            // Update studies state by removing the deleted study
            setStudies(prevStudies => prevStudies.filter(study => study.study_id !== studyId));
    
            // Recheck noStudy state after deletion
            if (studies.length === 1) {
                setNoStudy(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
    
    // Function to handle delete
    const handleDelete = (studyId) => {
        fetchDataAfterDelete(studyId);
        handleRefreshClick();
    };

    // HANDLE EDIT
    function handleEdit(studyId) {
        navigate(`/addstudy?study_id=${studyId}`);
    }

    if (!userRoles.is_recruiter && !userRoles.is_superuser) {
        return <div className='mt-20'>You do not have permission to view this page.</div>;
    }

    return (
        <>
            <div className="mx-3 my-20">
                {/* SEARCH BAR */}
                <div className="grid grid-col pb-4">
                    <div className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                        <div className='w-full px-1'>
                            <div className='flex p-2 gap-2 justify-between'>
                                <div className='flex items-center'>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Tooltip
                                    key='0'
                                    title='Add Study'
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
                                    <div className='flex items-center'>
                                        <img src={addLogo} onClick={() => navigate('/addstudy')} alt="add" className='h-7 transition duration-300 ease-in-out hover:bg-gray-100 transform hover:-translate-y-0.5 ' />
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
                {noStudy &&
                    <div className="grid grid-col pb-4">
                        <div className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                            <div className='w-full px-1'>
                                <div className='flex p-2 gap-2 justify-between'>
                                    <p>No studies found. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {!noStudy &&
                    <div className="grid grid-cols-1 gap-4">
                        
                        {/* DISPLAYING STUDIES */}
                        {filteredStudies.map((study, index) => (
                            <div key={index} className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                                <div className='flex flex-col px-1 md:px-2 lg:flex-row lg:gap-2'>
                                    <div className='w-full'>
                                        {/* DATES */}
                                        <div className='flex px-1 py-2 mx-1 mt-1 justify-center gap-2 text-center items-center'>
                                            <p className='text-sm w-full py-0.5 bg-green-200 text-black rounded-md shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg'>
                                                <span className='font-semibold'>Starts:</span> {formatDate(study.start_date)}
                                            </p>
                                            <p className='text-sm w-full py-0.5 bg-blue-200 text-black rounded-md shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg'>
                                                <span className='font-semibold'>Duration:</span> {durationFix(study.duration)}
                                            </p>
                                            <p className='text-sm w-full py-0.5 bg-red-200 text-black rounded-md shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg'>
                                                <span className='font-semibold'>Expires:</span> {formatDate(study.expiry_date)}
                                            </p>
                                        </div>

                                        {/* STUDY INFO CARD */}
                                        <div className='flex p-2 gap-2 justify-between'>
                                            <div className='flex-col'>
                                                <h2 className="text-xl font-bold">{study.name}</h2>
                                                <h3 className='text-md'>{study.work_preference}</h3>
                                            </div>
                                            <div className="flex-col text-right">
                                                <h2>{study.category}</h2>
                                            </div>
                                        </div>
                                        <div className='flex px-2 pb-4 justify-between'>
                                            <div className='flex-col'>
                                                <p className='text-justify'>
                                                    {study.description}
                                                </p>
                                            </div>
                                        </div>
                                        {expandedStudies[index] &&
                                            <div>
                                                {/* REQUIREMENTS */}
                                                <h1 className='text-center text-lg font-bold border-t-2 border-gray-300 py-2 mt-2 '>Requirements</h1>
                                                <div className='flex px-2 pb-4 justify-between'>
                                                    <MinMaxTable
                                                        minAge={study.min_age}
                                                        minWeight={study.min_weight}
                                                        minHeight={study.min_height}
                                                        maxAge={study.max_age}
                                                        maxWeight={study.max_weight}
                                                        maxHeight={study.max_height}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className='w-full lg:border-l-2'>
                                        {expandedStudies[index] &&
                                            <div className='lg:mt-2'>
                                                {/* PREFERENCES */}
                                                <h1 className='text-center text-lg font-bold mb-2 '>Preferences</h1>
                                                <div className='flex px-2 pb-3 justify-between h-72 md:h-auto lg:h-96 lg:ml-2'>
                                                    <Preferences
                                                        sex={study.biological_sex}
                                                        hair={study.hair_color}
                                                        profession={study.profession}
                                                        ethnicity={study.ethnicity}
                                                        nationality={study.nationality}
                                                        pregnancy={study.pregnancy_status}
                                                        language={study.language_preferences}
                                                        activity={study.activity_level}
                                                        socioeconomic={study.socioeconomic_status}
                                                        health={study.health_status}
                                                        medical_history={study.medical_history}
                                                        medication_history={study.medication_history}
                                                        current_medication={study.current_medication}
                                                        family_medication_history={study.family_medication_history}
                                                        allergies={study.allergies}
                                                        lifestyle={study.lifestyle}
                                                    />
                                                </div>

                                            </div>
                                        }
                                        {/* BUTTONS */}
                                        <div className='flex mx-2 mb-3 text-white gap-2 text-center'>
                                            <Tooltip
                                                key={index}
                                                title={expandedStudies[index] ? "Collapse" : "View"}
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
                                                    {!hideInfoButton && ( 
                                                <div
                                                    className={`w-full bg-blue-500 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 transform hover:-translate-y-0.5`}
                                                    onClick={() => setExpandedStudies(prevState => {
                                                        const newState = [...prevState];
                                                        newState[index] = !newState[index];
                                                        return newState;
                                                    })}
                                                >
                                                    {expandedStudies[index] ? <ZoomOut /> : <ZoomInIcon />}
                                                </div>
                                                    )}
                                            </Tooltip>
                                            <Tooltip
                                                key={index}
                                                title="Edit"
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
                                                <div
                                                    className={`w-full bg-gray-500 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-gray-600 transform hover:-translate-y-0.5`}
                                                    onClick={() => handleEdit(study.study_id)}
                                                >
                                                    <EditNoteIcon />
                                                </div>
                                            </Tooltip>
                                            <Tooltip
                                                key={index}
                                                title="Delete"
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
                                                <div
                                                    className={`w-full bg-red-500 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-red-800 transform hover:-translate-y-0.5`}
                                                    onClick={() => handleDelete(study.study_id)}
                                                >
                                                    <DeleteIcon />
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}

export default withAuthentication(Research);