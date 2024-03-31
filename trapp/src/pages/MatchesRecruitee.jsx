import { useState, useEffect } from "react";
import infoLogo from '../assets/info.png';
import withAuthentication from '../HOCauth'; // Import the HOC
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Preferences from '../components/Preferences';
import MinMaxTable from '../components/MinMaxTable';

/**
 * MatchesRecruitee Page responsible for displaying matched recruiters to recruitees.
 * It fetches data about matched recruiters from the backend and allows recruitees to view and interact with them.
 * Recruitees can unmatch recruiters and view details of the studies including start date, duration, description, and requirements.
 *
 * @author Syed Wajahat Quadri <w21043564>
 * @param {object} userRoles - Object containing user roles information.
 * @returns {JSX.Element} Returns the JSX for the MatchesRecruitee Page.
 */
const MatchesRecruitee = ({ userRoles }) => {
    // State variables
    const [matches, setMatches] = useState([]); // Store matched recruiters
    const [noMatch, setNoMatch] = useState(false); // Track if there are no matches
    
    const [uniqueCategories, setUniqueCategories] = useState([]); // Store unique study categories
    const [selectedCategory, setSelectedCategory] = useState(''); // Track selected category

    const [uniqueType, setUniqueType] = useState([]); // Store unique study types
    const [selectedType, setSelectedType] = useState(''); // Track selected type
    const [filteredMatches, setFilteredMatches] = useState([]); // Store filtered matches

    const [expandedProfiles, setExpandedProfiles] = useState({}); // State to track expanded profiles
    const [isMdScreen, setIsMdScreen] = useState(false); // Track screen size for responsive design
    const [hideInfoButton, setHideInfoButton] = useState(false); // Track whether to hide info button

    // Function to fetch matches data from the backend
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
            // Extract unique study categories
            const uniqueCat = Array.from(new Set(data.map(match => match.study_info.category)));
            setUniqueCategories(uniqueCat);

            // Extract unique study types
            const uniqueTy = Array.from(new Set(data.map(match => match.study_info.work_preference)));
            setUniqueType(uniqueTy);

            // Set noMatch state based on data length
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

    // Fetch matches data on component mount
    useEffect(() => {
        fetchMatchesData();
    }, []);

    // Handle screen resize to adjust layout
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

    // Expand or collapse profiles based on screen size
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

    // Hide or show the info button based on screen size
    useEffect(() => {
        if (isMdScreen) {
            setHideInfoButton(true);
        } else {
            setHideInfoButton(false);
        }
        
    }, [isMdScreen]);
    
    // Filter matches based on selected category and type
    useEffect(() => {
        const filteredMatchesByCategory = selectedCategory ? matches.filter(match => match.study_info.category === selectedCategory) : matches;
        const filteredMatchesByType = selectedType ? filteredMatchesByCategory.filter(match => match.study_info.work_preference === selectedType) : filteredMatchesByCategory;
        setFilteredMatches(filteredMatchesByType);
    }, [selectedCategory, selectedType, matches]);

    // Function to toggle profile expansion
    const toggleProfileExpansion = (index) => {
        setExpandedProfiles(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    // Function to handle unmatching
    const handleUnmatch = (user_id, study_id) => {
        fetch(`http://localhost:8000/api/recruitee/matches/`, {
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
                handleRefreshClick();
            } else {
                console.error("Error rejecting match:", response.statusText);
            }
        })
        .catch(error => {
            console.error("Network error:", error);
        });
    }    

    // Function to handle refreshing the page
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

    // Date Format function
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    // Duration fix function
    function durationFix(duration) {
        if (duration === "Less than 1 week") {
            return "<1 week"
        } else if (duration === "More than 4 weeks") {
            return ">4 weeks"
        } else {
            return duration
        }
    }

    // Function to truncate long strings
    function truncateString(str) {
        const x = 33
        if (str.length > x) {
          return str.slice(0, x) + '...';
        } else {
          return str;
        }
    }

    // JSX rendering
    return (
        <div className="mx-3 my-20">
            {/* Dropdowns for filtering */}
            <div className="grid grid-col pb-3">
                <div className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                    <div className='w-full px-1'>
                        <div className='flex p-2 gap-2 justify-center'>
                            {/* Dropdown menu for category */}
                            <div className="w-40">
                                <FormControl fullWidth>
                                    <InputLabel id="select-category-input">Select Category</InputLabel>
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
                            {/* Dropdown menu for type */}
                            <div className="w-32">
                                <FormControl fullWidth>
                                    <InputLabel id="select-category-input">Select Type</InputLabel>
                                    <Select
                                        labelId="select-type-label"
                                        id="select-type"
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                        label="Select Type"
                                    >
                                        <MenuItem value="">Select Type</MenuItem>
                                        {uniqueType.map((name, index) => (
                                        <MenuItem key={index} value={name}>{truncateString(name)}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Display matched recruiters */}
            {!noMatch && 
                <div className="grid grid-cols-1 gap-4"> 
                    {/* Iterate over filtered matches */}
                    {filteredMatches.map((match, index) => (
                        <div key={index} className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                            {/* Render match details */}
                            <div className='w-full grid grid-cols-1 md:grid-cols-2'>
                                <div>
                                    {/* Display basic info */}
                                    <div className="flex text-sm text-center gap-2 px-3 pt-2">
                                        {/* Start date */}
                                        <div className="w-full py-0.5 bg-green-200 text-black rounded-md shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                            <span className="font-semibold">Starts: </span>{formatDate(match.study_info.start_date)}
                                        </div>
                                        {/* Duration */}
                                        <div className="w-full py-0.5 bg-blue-200 text-black rounded-md shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                            <span className="font-semibold">Duration:</span> {durationFix(match.study_info.duration)}
                                        </div>
                                    </div>
                                    {/* Display study name and info button */}
                                    <div className='flex px-2 w-full mx-2 mt-2 mb-1'>
                                        <div className='flex-col w-full item-center'>
                                            <div className="flex justify-between">
                                                <h2 className="text-xl font-bold">{match.study_info.name}</h2>
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
                                    {/* Display recruiter company, category, and type */}
                                    <div className="flex-col mb-2">
                                        <div className="flex justify-between mx-4 mt-4">
                                            <p className="text-sm font-normal">{match.recruiter_info.company_info}</p>
                                            <p className="text-sm">{match.study_info.category}</p>
                                            <p className="text-sm">{match.study_info.work_preference}</p>
                                        </div>
                                        {/* Display study description */}
                                        <div>
                                            <h1 className="border-t-2 border-gray-300 py-2 mt-2 text-center font-semibold text-md">Description</h1>
                                            <div className='flex-col mx-4 pb-1 mb-2 text-black gap-2 text-justify '>
                                                <p>{match.study_info.description}</p>
                                            </div>
                                        </div>
                                        {/* Render expanded profile if expanded */}
                                        {expandedProfiles[index] &&  
                                            <div>
                                                {/* Display requirements */}
                                                <h1 className='text-center text-md font-semibold border-t-2  border-gray-300 py-2 mt-2 '>Requirements</h1>
                                                <div className='flex px-4 pb-4 justify-between'>
                                                    {/* Display min-max table */}
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
                                        {/* Render small buttons if profile not expanded */}
                                        {!expandedProfiles[index] &&  
                                            <div>
                                                <div className='flex mx-2 mb-2 pt-2 text-white gap-2 text-center '>
                                                    {/* Unmatch and contact buttons */}
                                                    <div 
                                                        className='w-full bg-red-500  p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-red-800 transform hover:-translate-y-0.5'
                                                        onClick={() => handleUnmatch(match.recruitee.user_id, match.study_info.study_id)}
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
                                            {/* Display study preferences */}
                                            <h2 className="border-t-2  md:border-t-0 md:mt-0 border-gray-300 pt-2 my-2 text-center font-semibold text-md">Study Preferences</h2>
                                            <div className='flex px-4 pb-4 justify-between h-72 md:h-auto lg:h-96'>
                                                {/* Display preferences component */}
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
                                            {/* Render small buttons */}
                                            {expandedProfiles[index] && 
                                                <div> 
                                                    <div className='flex mx-2 mb-2 text-white gap-2 text-center'>
                                                        {/* Unmatch and contact buttons */}
                                                        <div 
                                                            className='w-full bg-red-500  p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-red-800 transform hover:-translate-y-0.5'
                                                            onClick={() => handleUnmatch(match.recruitee.user_id, match.study_info.study_id)}
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
            {/* Display message when there are no matches */}
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
