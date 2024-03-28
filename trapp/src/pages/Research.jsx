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
        fetch('http://localhost:8000/api/studycreate/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setStudies(data);
                if (data.length === 0) {
                    setNoStudy(true);
                } else {
                    setNoStudy(false);
                    // Initialize expandedStudies state based on the number of studies
                    setExpandedStudies(new Array(data.length).fill(false));
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    // function getCsrfToken() {
    //     const csrfToken = document.cookie.match(/csrftoken=([^ ;]+)/)[1];
    //     return csrfToken;
    // }

    // const csrfToken = getCsrfToken();

    const handleDelete = (studyId) => {
        const url = `http://localhost:8000/api/studydelete/`;
        const method = 'DELETE';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                navigate('/research'); // or another appropriate action
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    if (!userRoles.is_recruiter && !userRoles.is_superuser) {
        return <div className='mt-20'>You do not have permission to view this page.</div>;
    }

    // Filter studies based on search query
    const filteredStudies = studies.filter(study =>
        Object.values(study).some(attribute =>
            typeof attribute === 'string' && attribute.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

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
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        {/* DISPLAYING STUDIES */}
                        {filteredStudies.map((study, index) => (
                            <div key={index} className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                                <div className='w-full px-1 md:px-2'>

                                    {/* DATES */}
                                    <div className='flex px-1 pb-2 mx-1 justify-center gap-2 pt-2 text-center items-center'>
                                        <p className='w-full text-sm text-black rounded-md bg-emerald-200 py-0.5'>
                                            <span className='font-semibold'>Starts:</span> {formatDate(study.start_date)}
                                        </p>
                                        <p className='w-full text-sm text-black rounded-md bg-blue-200 py-0.5'>
                                            <span className='font-semibold'>Duration:</span> {durationFix(study.duration)}
                                        </p>
                                        <p className='w-full text-sm text-black rounded-md bg-red-200 py-0.5'>
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
                                            {/* PREFERENCES */}
                                            <h1 className='text-center text-lg font-bold mb-2 '>Preferences</h1>
                                            <div className='flex px-2 pb-4 justify-between h-64'>
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
                                    <div className='flex mx-2 mb-2 text-white gap-2 text-center'>
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
                        ))}
                    </div>
                }
            </div>
        </>
    )
}

export default withAuthentication(Research);