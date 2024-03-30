import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [reports, setReports] = useState([]);
    const [messages, setMessages] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showScreenshotOverlay, setShowScreenshotOverlay] = useState(false);
    const [selectedScreenshot, setSelectedScreenshot] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('No access token found');
            return;
        }

        const fetchReports = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/admin/reports/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setReports(Array.isArray(response.data) ? response.data.filter(report => report.status === 'pending') : []);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);

    const handleAction = async (reportId, action) => {
        const token = localStorage.getItem('accessToken');
        const message = messages[reportId] || '';

        if (!token) {
            console.error('No access token found');
            return;
        }

        try {
            await axios.put(`http://localhost:8000/api/admin/reports/${reportId}/`, {
                status: action,
                message: message
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(`Report ${action}`);
            setReports(reports.filter(report => report.id !== reportId));
        } catch (error) {
            console.error('Error processing report:', error);
        }
    };

    const handleClickUser = async (userId) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('No access token found');
            return;
        }
    
        try {
            // Fetch user role information
            const roleResponse = await axios.get(`http://localhost:8000/api/user/${userId}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            const { is_recruitee, is_recruiter } = roleResponse.data;
            let userDetails = null;
    
            // Check the role and fetch detailed information
            if (is_recruitee) {
                const response = await axios.get(`http://localhost:8000/api/recruitee/${userId}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                userDetails = response.data;
            } else if (is_recruiter) {
                const response = await axios.get(`http://localhost:8000/api/recruiter/${userId}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                userDetails = response.data;
            }
    
            setSelectedUser(userDetails);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };
    
    const handleClickScreenshot = (screenshot) => {
        setSelectedScreenshot(screenshot);
        setShowScreenshotOverlay(true);
    };

    const closeScreenshotOverlay = () => {
        setShowScreenshotOverlay(false);
        setSelectedScreenshot('');
    };

    const handleMessageChange = (id, value) => {
        setMessages({ ...messages, [id]: value });
    };

    const closeModal = () => setShowModal(false);

    return (
        <div className="flex justify-center items-start h-screen bg-gray-100">
        <div className="w-full max-w-4xl p-5 bg-blue-300 rounded-lg shadow-xl mt-10">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Admin Dashboard</h2>
            <div className="overflow-x-auto">
                {reports.length > 0 ? (
                    <div className="bg-white-100 p-4 rounded-lg max-h-[calc(100vh-200px)] overflow-y-auto">
                        {reports.map(report => (
                            <div key={report.id} className="bg-white p-4 rounded-lg mb-6 border border-gray-300 shadow">
                                <button onClick={() => handleClickUser(report.reported_user, report.user_type)}
                                        className="text-blue-500 hover:text-blue-800">
                                    Reported User: {report.reported_user_name}
                                </button>
                                <p>Report Count: {report.reported_user_report_count}</p>
                                <p>Warn Count: {report.reported_user_warn_count}</p>
                                <p>Reason: {report.reason}</p>
                                {report.screenshot && (
                                    <button
                                        className="text-blue-500 hover:text-blue-800 cursor-pointer"
                                        onClick={() => handleClickScreenshot(`http://localhost:8000${report.screenshot}`)}>
                                        Screenshot
                                    </button>
                                )}
                                <textarea value={messages[report.id] || ''}
                                          onChange={(e) => handleMessageChange(report.id, e.target.value)}
                                          className="w-full p-2 border rounded mt-2"
                                          placeholder="Add a message (optional)">
                                </textarea>
                                <div className="flex justify-end space-x-4 mt-4">
                                    <button onClick={() => handleAction(report.id, 'ban')}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Ban User
                                    </button>
                                    <button onClick={() => handleAction(report.id, 'warn')}
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                        Warn User
                                    </button>
                                    <button onClick={() => handleAction(report.id, 'resolved')}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                        No Action Needed
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No reports to display.</p>
                )}
            </div>
        </div>

    
    

            {showModal && selectedUser && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={closeModal}>
        <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">User Details</h3>
            <p><strong>Full Name:</strong> {selectedUser.full_name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Age:</strong> {selectedUser.age}</p>
            <p><strong>Nationality:</strong> {selectedUser.nationality}</p>
            <p><strong>Profession:</strong> {selectedUser.profession}</p>
            <p><strong>Contact Information:</strong> {selectedUser.contact_information}</p>
            <p><strong>Bio:</strong> {selectedUser.bio}</p>
            <p><strong>Health Status:</strong> {selectedUser.health_status}</p>
            <p><strong>Interests:</strong> {selectedUser.interest_1}, {selectedUser.interest_2}, {selectedUser.interest_3}, {selectedUser.interest_4}</p>
            <p><strong>Height:</strong> {selectedUser.height} cm</p>
            <p><strong>Weight:</strong> {selectedUser.weight} kg</p>
            <p><strong>Hair Color:</strong> {selectedUser.hair_color}</p>
            <p><strong>Lifestyle Factors:</strong> {selectedUser.lifestyle_factors}</p>
            <p><strong>Socioeconomic Status:</strong> {selectedUser.socioeconomic_status}</p>
            <p><strong>Language Preferences:</strong> {selectedUser.language_preferences}</p>
            <p><strong>Activity Level:</strong> {selectedUser.activity_level}</p>
            <p><strong>Allergy Details:</strong> {selectedUser.allergy_details}</p>
            <p><strong>Current Medication Details:</strong> {selectedUser.current_medication_details}</p>
            <p><strong>Duration of Participation:</strong> {selectedUser.duration_of_participation}</p>
            <p><strong>Emergency Contact:</strong> {selectedUser.emergency_contact}</p>
            <p><strong>Ethnicity:</strong> {selectedUser.ethnicity}</p>
            <p><strong>Family Medical History Details:</strong> {selectedUser.family_medical_history_details}</p>
            <p><strong>Biological Sex:</strong> {selectedUser.biological_sex}</p>
            <p><strong>Date of Birth:</strong> {selectedUser.date_of_birth}</p>
            <p><strong>Has Allergies:</strong> {selectedUser.has_allergies ? "Yes" : "No"}</p>
            <p><strong>Has Family Medical History:</strong> {selectedUser.has_family_medical_history ? "Yes" : "No"}</p>
            <p><strong>Has Medical History:</strong> {selectedUser.has_medical_history ? "Yes" : "No"}</p>
            <p><strong>Has Medication History:</strong> {selectedUser.has_medication_history ? "Yes" : "No"}</p>
            <p><strong>Pregnancy Status:</strong> {selectedUser.pregnancy_status}</p>
            <p><strong>Profile Image URL:</strong> {selectedUser.profile_image_url}</p>
            <p><strong>Participation History:</strong> {selectedUser.participation_history}</p>
            <p><strong>Summary:</strong> {selectedUser.summary}</p>
            <p><strong>Taking Current Medications:</strong> {selectedUser.taking_current_medications ? "Yes" : "No"}</p>
            <p><strong>Work Preference:</strong> {selectedUser.work_preference}</p>
            <p><strong>Research Area:</strong> {selectedUser.research_area}</p>
            <p><strong>Company Info:</strong> {selectedUser.company_info}</p>
            {/* Add more fields as needed */}
            <button onClick={closeModal} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                Close
            </button>
        </div>
    </div>
)}
{showScreenshotOverlay && (
    <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center" onClick={closeScreenshotOverlay}>
        <div className="relative bg-white p-4 shadow-lg rounded-md max-w-3xl max-h-full overflow-y-auto">
            <img src={selectedScreenshot} alt="Screenshot Full" className="max-w-full max-h-full h-auto" />
            <button onClick={closeScreenshotOverlay} className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                Close
            </button>
        </div>
    </div>
)}

        </div>
    );
};

export default AdminDashboard;
