import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import infoLogo from '../assets/info.png';
import withAuthentication from '../HOCauth'; // Import the HOC
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Preferences from '../components/Preferences';
import MinMaxTable from '../components/MinMaxTable';

const MatchesRecruitee = ({ userRoles }) => {
    const [matches, setMatches] = useState([]);
    const [noMatch, setNoMatch] = useState(false);
    const [uniqueCategories, setUniqueCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [expandedProfiles, setExpandedProfiles] = useState({}); // State to track expanded profiles
    const [isMdScreen, setIsMdScreen] = useState(false);
    const [hideInfoButton, setHideInfoButton] = useState(false);


    const fetchMatchesData = () => {
        fetch('http://localhost:8000/api/matchedrecruiters/', {
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
            setMatches(data);
            console.log(data);
            // Extract unique study names
            const uniqueNames = Array.from(new Set(data.map(match => match.study_info.category)));
            setUniqueCategories(uniqueNames);
            if (data.length === 0) {
                setNoMatch(true);
            } else {
                setNoMatch(false);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        fetchMatchesData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMdScreen(window.innerWidth >= 768);
        };

        handleResize(); // Call initially to set the state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // If the screen width is medium, expand all profiles
        if (isMdScreen) {
            const newExpandedProfiles = {};
            matches.forEach((match, index) => {
                newExpandedProfiles[index] = true;
            });
            setExpandedProfiles(newExpandedProfiles);
        } else {
            // If the screen width is not medium, collapse all profiles
            setExpandedProfiles({});
        }
    }, [isMdScreen, matches]);

    useEffect(() => {
        // If the screen width is medium, hide the info button
        if (isMdScreen) {
            setHideInfoButton(true);
        } else {
            // If the screen width is not medium, show the info button
            setHideInfoButton(false);
        }
    }, [isMdScreen]);

    // Filter matches based on selected study
    const filteredMatches = selectedCategory ? matches.filter(match => match.study_info.category === selectedCategory) : matches;

    // Function to toggle profile expansion
    const toggleProfileExpansion = (index) => {
        setExpandedProfiles(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleUnmatch = (user_id, study_id) => {
        console.log(study_id); // Log the match_id to the console (optional)

        fetch(`http://localhost:8000/api/recruiter/matches/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({
                user_id: user_id,
                study_id: study_id,
                action: "rejected",
            }),  
        })
        .then(response => {
            if (response.ok) {
                console.log("Match rejected successfully.");
                fetchMatchesData();
            } else {
                console.error("Error rejecting match:", response.statusText);
            }
        })
        .catch(error => {
            // Handle network errors (optional)
            console.error("Network error:", error);
        });
    }    

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

    function truncateString(str) {
        const x = 33
        if (str.length > x) {
          return str.slice(0, x) + '...';
        } else {
          return str;
        }
    }

    return (
        <div className="mx-3 my-20">
            {/* DROP DOWN STUDIES */}
            <div className="grid grid-col pb-4">
                <div className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                    <div className='w-full px-1'>
                        <div className='flex p-2 gap-2 justify-center'>
                            {/* Dropdown menu */}
                            <div className="w-80">
                                <FormControl fullWidth>
                                    <InputLabel id="select-study-label">Select Category</InputLabel>
                                    <Select
                                        labelId="select-category-label"
                                        id="select-category"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        label="Select Category"
                                    >
                                        <MenuItem value="">Select Category</MenuItem>
                                        {uniqueCategories.map((name, index) => (
                                        <MenuItem key={index} value={name}>{truncateString(name)}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!noMatch && 
                <div className="grid grid-cols-1 gap-4"> 
                    {/* MATCHES DISPLAY */}
                    {filteredMatches.map((match, index) => (
                        <div key={index} className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                            {/* Render match details */}
                            <div className='w-full grid grid-cols-1 md:grid-cols-2'>
                                <div>
                                    <div className="flex text-sm text-center gap-2 px-3 pt-2">
                                        <div className="w-full py-0.5 bg-green-200 text-black rounded-md shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                            <span className="font-semibold">Starts: </span>{formatDate(match.study_info.start_date)}
                                        </div>
                                        <div className="w-full py-0.5 bg-blue-200 text-black rounded-md shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                            <span className="font-semibold">Duration:</span> {durationFix(match.study_info.duration)}
                                        </div>
                                    </div>
                                    <div className='flex px-2 w-full mx-2 mt-2 mb-1'>
                                        <div className='flex-col w-full item-center'>
                                            <div className="flex justify-between">
                                                <h2 className="text-xl font-bold">{match.study_name}</h2>
                                            </div>
                                        </div>
                                        {/* Info button */}
                                        {!hideInfoButton && 
                                            <div>
                                                <img
                                                    src={infoLogo}
                                                    alt="info"
                                                    className="w-6 h-6 mx-3 mt-1 hover:bg-gray-200 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                                                    onClick={() => toggleProfileExpansion(index)}
                                                />
                                            </div>
                                        }
                                    </div>
                                    <div className="flex-col mb-2">
                                        <div className="flex justify-between mx-4 mt-4">
                                            <p className="text-sm font-normal">{match.recruiter_info.company_info}</p>
                                            <p className="text-sm">{match.study_info.category}</p>
                                            <p className="text-sm">{match.study_info.work_preference}</p>
                                        </div>
                                        <div>
                                            <h1 className="border-t-2 border-gray-300 py-2 mt-2 text-center font-semibold text-md">Description</h1>
                                            <div className='flex-col mx-4 pb-1 mb-2 text-black gap-2 text-justify '>
                                                <p>{match.study_info.description}</p>
                                            </div>
                                        </div>
                                        {expandedProfiles[index] &&  
                                            <div>
                                                {/* REQUIREMENTS */}
                                                <h1 className='text-center text-md font-semibold border-t-2  border-gray-300 py-2 mt-2 '>Requirements</h1>
                                                <div className='flex px-4 pb-4 justify-between'>
                                                    <MinMaxTable
                                                        minAge={match.study_info.min_age}
                                                        minWeight={match.study_info.min_weight}
                                                        minHeight={match.study_info.min_height}
                                                        maxAge={match.study_info.max_age}
                                                        maxWeight={match.study_info.max_weight}
                                                        maxHeight={match.study_info.max_height}
                                                    />
                                                </div>
                                            </div>
                                        }
                                        {!expandedProfiles[index] &&  
                                            <div>
                                                {/* SMALL BUTTONS */}
                                                <div className='flex mx-2 mb-2 pt-2 text-white gap-2 text-center '>
                                                    <div 
                                                        className='w-full bg-red-500  p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-red-800 transform hover:-translate-y-0.5'
                                                        onClick={() => handleUnmatch(match.recruitee.user.id, match.study_id)}
                                                    >
                                                        Unmatch
                                                    </div>
                                                    <div className='w-full bg-blue-500 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 transform hover:-translate-y-0.5'>
                                                        Contact
                                                    </div>
                                                </div>
                                            </div>
                                        }   
                                    </div>
                                </div>
                                <div className="md:border-l-2">
                                    {/* Render expanded profile if expanded */}
                                    {expandedProfiles[index] && 
                                        <div>
                                            {/* Requirements */}
                                            <h2 className="border-t-2  md:border-t-0 md:mt-0 border-gray-300 pt-2 my-2 text-center font-semibold text-md">Study Preferences</h2>
                                            <div className='flex px-4 pb-4 justify-between h-72 md:h-auto '>
                                                <Preferences
                                                    sex={match.study_info.biological_sex}
                                                    hair={match.study_info.hair_color}
                                                    profession={match.study_info.profession}
                                                    ethnicity={match.study_info.ethnicity}
                                                    nationality={match.study_info.nationality}
                                                    pregnancy={match.study_info.pregnancy_status}
                                                    language={match.study_info.language_preferences}
                                                    activity={match.study_info.activity_level}
                                                    socioeconomic={match.study_info.socioeconomic_status}
                                                    health={match.study_info.health_status}
                                                    medical_history={match.study_info.medical_history}
                                                    medication_history={match.study_info.medication_history}
                                                    current_medication={match.study_info.current_medication}
                                                    family_medication_history={match.study_info.family_medication_history}
                                                    allergies={match.study_info.allergies}
                                                    lifestyle={match.study_info.lifestyle}
                                                />
                                            </div>
                                            {/* BUTTONS */}
                                            {expandedProfiles[index] && 
                                                <div> 
                                                    <div className='flex mx-2 mb-2 text-white gap-2 text-center'>
                                                        <div 
                                                            className='w-full bg-red-500  p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-red-800 transform hover:-translate-y-0.5'
                                                            onClick={() => handleUnmatch(match.recruitee.user.id, match.study_id)}
                                                        >
                                                            Unmatch
                                                        </div>
                                                        <div className='w-full bg-blue-500 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 transform hover:-translate-y-0.5'>
                                                            Contact
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
            {noMatch &&
                <div className="grid grid-col pb-4">
                    <div className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                        <div className='w-full px-1'>
                            <div className='flex p-2 gap-2 justify-between'>
                                <p>No matches. </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default withAuthentication(MatchesRecruitee);