import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import profilePic from '../assets/profile-pic.jpg';
import infoLogo from '../assets/info.png';
import withAuthentication from '../HOCauth'; // Import the HOC

const Matches = ({ userRoles }) => {
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [noMatch, setNoMatch] = useState(false);
    const [uniqueStudyNames, setUniqueStudyNames] = useState([]);
    const [selectedStudy, setSelectedStudy] = useState('');
    const [expandedProfiles, setExpandedProfiles] = useState({}); // State to track expanded profiles

    const fetchMatchesData = () => {
        fetch('http://localhost:8000/api/matchedrecruitees/', {
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
            const uniqueNames = Array.from(new Set(data.map(match => match.study_name)));
            setUniqueStudyNames(uniqueNames);
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

    if (!userRoles.is_recruiter && !userRoles.is_superuser) {
        return <div className='mt-20'>You do not have permission to view this page.</div>;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Filter matches based on selected study
    const filteredMatches = selectedStudy ? matches.filter(match => match.study_name === selectedStudy) : matches;

    // Function to toggle profile expansion
    const toggleProfileExpansion = (index) => {
        setExpandedProfiles(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleUnmatch = (user_id, study_id) => {
        console.log(study_id); // Log the match_id to the console (optional)
    
        // Make a DELETE request using fetch
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
    
    return (
        <div className="mx-3 my-20">
            {/* DROP DOWN STUDIES */}
            <div className="grid grid-col pb-4">
                <div className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                    <div className='w-full px-1'>
                        <div className='flex p-2 gap-2 justify-center text-sm '>
                            {/* Dropdown menu */}
                            <select 
                                className="px-4 py-2  border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                value={selectedStudy}
                                onChange={(e) => setSelectedStudy(e.target.value)}
                            >
                                <option value="">Select Study</option>
                                {uniqueStudyNames.map((name, index) => (
                                    <option  key={index} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {!noMatch && 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
                    {/* MATCHES DISPLAY */}
                    {filteredMatches.map((match, index) => (
                        <div key={index} className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                            {/* Render match details */}
                            <div className='w-full'>
                                <div className='flex p-2 w-full m-2'>
                                    <img
                                        src={profilePic} 
                                        // match.recruitee.user.profile_image ? match.recruitee.user.profile_image : 
                                        alt="Person"
                                        className="w-20 h-20 rounded-full mr-3"
                                    />
                                    <div className='flex-col w-full item-center mt-2'>
                                        <div className="flex justify-between">
                                            <h2 className="text-xl font-bold mb-2">{match.recruitee.full_name}, <span className="font-normal">{match.recruitee.age}</span></h2>
                                        </div>
                                        <div>
                                            <p className="text-sm">
                                                <span className="font-semibold">Matched with: </span> {match.study_name}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Info button */}
                                    <img
                                        src={infoLogo}
                                        alt="info"
                                        className="w-6 h-6 mr-3 hover:bg-gray-200 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                                        onClick={() => toggleProfileExpansion(index)}
                                    />
                                </div>
                                {/* Render expanded profile if expanded */}
                                {expandedProfiles[index] && 
                                    <div>
                                        <div>
                                            <h1 className="border-t-2 border-gray-300 py-2 mt-2 text-center font-semibold text-md">User Bio</h1>
                                            <div className='flex-col mx-4 pb-1 mb-2 text-black gap-2 text-justify'>
                                                <p>{match.recruitee.bio}</p>
                                            </div>
                                        </div>
                                        {/* Features */}
                                        <h2 className="border-t-2 border-gray-300 pt-2 mt-2 text-center font-semibold text-md">Features</h2>
                                        <div className="flex gap-2 pb-1 text-sm m-3 text-center justify-center flex-wrap">
                                            <div className="bg-amber-100 text-black p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                                {match.recruitee.height} cm
                                            </div>
                                            <div className="bg-green-100  text-black p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                                {match.recruitee.weight} kg
                                            </div>
                                            <div className="bg-red-100  text-black p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                                {capitalizeFirstLetter(match.recruitee.biological_sex)}
                                            </div>
                                            <div className="bg-blue-100  text-black p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                                {capitalizeFirstLetter(match.recruitee.ethnicity)}
                                            </div>
                                            <div className="bg-orange-100  text-black p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                                {capitalizeFirstLetter(match.recruitee.socioeconomic_status)} Class
                                            </div>
                                            <div className="bg-gray-200  text-black p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                                {capitalizeFirstLetter(match.recruitee.work_preference)}
                                            </div>
                                        </div>
                                        {/* Interests */}
                                        <h1 className="border-t-2 border-gray-300 pt-2 mt-2 text-center font-semibold text-md"> Interests</h1>
                                        <div className="flex gap-2 text-sm m-3 pb-1 text-center justify-center flex-wrap">
                                            <div className="bg-emerald-100  text-black p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                                {capitalizeFirstLetter(match.recruitee.interest_1)}
                                            </div>
                                            <div className="bg-green-100  text-black p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                                {capitalizeFirstLetter(match.recruitee.interest_2)}
                                            </div>
                                            <div className="bg-teal-100  text-black p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                                {capitalizeFirstLetter(match.recruitee.interest_3)}
                                            </div>
                                            <div className="bg-cyan-100  text-black p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                                {capitalizeFirstLetter(match.recruitee.interest_4)}
                                            </div>
                                        </div>
                                    </div>
                                }

                                {/* BUTTONS */}
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

export default withAuthentication(Matches);