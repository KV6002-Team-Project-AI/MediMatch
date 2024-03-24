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

    useEffect(() => {
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
            console.log(data)
            // Extract unique study names
            const uniqueNames = Array.from(new Set(data.map(match => match.study.name)));
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
    }, [noMatch]);

    // Filter matches based on selected study
    const filteredMatches = selectedStudy ? matches.filter(match => match.study.name === selectedStudy) : matches;

    return (
        <div className="mx-3 my-20">
            {!noMatch && 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* DROP DOWN STUDIES */}
                    <div className="grid grid-col">
                        <div className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                            <div className='flex p-2 gap-2 justify-center'> 
                                <div className='flex items-center'>
                                    {/* Dropdown menu */}
                                    <select 
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        value={selectedStudy}
                                        onChange={(e) => setSelectedStudy(e.target.value)}
                                    >
                                        <option value="">Select Study</option>
                                        {uniqueStudyNames.map((name, index) => (
                                            <option key={index} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* MATCHES DISPLAY */}
                    {filteredMatches.map((match, index) => (
                        <div key={index} className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                            {/* Render match details */}
                            <div className='w-full'>
                                <div className='flex p-2 w-full'>
                                    <img
                                        src={match.recruitee.user.profile_image ? match.recruitee.user.profile_image : profilePic}
                                        alt="Person"
                                        className="w-20 h-20 rounded-full mr-3"
                                    />
                                    <div className='flex-col w-full'>
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-bold mb-2">{match.recruitee.full_name}</h2>
                                            <img src={infoLogo} alt="info" className="w-5 h-5 hover:bg-gray-200 mb-2 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-0.5" />
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="bg-blue-100 w-full text-blue-800 p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                                {match.recruitee.age} Years old
                                            </div>
                                            <div className="bg-blue-100 w-full text-blue-800 p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                                {match.recruitee.height} Metres
                                            </div>
                                            <div className="bg-blue-100 w-full text-blue-800 p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                                {match.recruitee.weight} Kilograms
                                            </div>
                                        </div>
                                        <p>{match.recruitee.bio}</p>
                                    </div>
                                </div>

                                <div className='flex mx-2 mb-2 text-white gap-2 text-center'>
                                    <div className='w-full bg-red-500  p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-red-800 transform hover:-translate-y-0.5'>
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
