import profilePic from '../assets/profile-pic.jpg'
import infoLogo from '../assets/info.png'
import withAuthentication from '../HOCauth'; // Import the HOC
import { useState, useEffect } from "react";

const Matches = ({ userRoles }) =>  {

    const features = ["Brown Hair", "25 Years old", "1.76 metres"]
    const  [matches, setMatches] = useState([])

    // if (!userRoles.is_recruiter && !userRoles.is_superuser) {
    //     return <div className='mt-20'>You do not have permission to view this page.</div>;
    // }

    useEffect(() => {
        fetch('http://localhost:8000/api/recruiter/matches/', {
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
            console.log(data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []); 

    return (
        <div className="mx-3 my-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                    <div className='w-full'>
                        <div className='flex p-2 w-full'>
                            <img src={profilePic} alt="Person" className="w-20 h-20 rounded-full mr-3"/>
                            <div className='flex-col w-full'>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold mb-2">Adam Legend</h2>
                                    <img src={infoLogo} alt="info" className="w-5 h-5 hover:bg-gray-200 mb-2 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-0.5"/>
                                </div>
                                <div className="flex gap-2">
                                    {features.map((feature, index) => (
                                        <div key={index} className="bg-blue-100 w-full text-blue-800 p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                            {feature}
                                        </div>
                                    ))}                          
                                </div>
                            </div>
                        </div>
                        <div className='flex mx-2 mb-2 text-white gap-2 text-center'>
                            <div className='w-full bg-red-600  p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-red-800 transform hover:-translate-y-0.5'>
                                Reject
                            </div>
                            <div className='w-full bg-green-600 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-green-800 transform hover:-translate-y-0.5'>
                                Accept
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuthentication(Matches);
