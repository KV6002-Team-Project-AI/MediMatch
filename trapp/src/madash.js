import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const token = localStorage.getItem('accessToken'); // Get the stored access token
            if (!token) {
                console.error('No access token found');
                return;
            }
    
            try {
                const response = await axios.get('http://localhost:8000/api/admin/reports/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Ensure the response data is an array
                setReports(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };
        fetchReports();
    }, []);
    

    const handleResolve = async (reportId, action) => {
        const token = localStorage.getItem('accessToken'); // Get the stored access token
        if (!token) {
            console.error('No access token found');
            return;
        }
    
        try {
            const response = await axios.put(`http://localhost:8000/api/admin/reports/${reportId}/`, {
                status: 'resolved',
                action: action
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Report resolved');
            // Update the reports list without the resolved report
            setReports(reports.filter(report => report.id !== reportId));
        } catch (error) {
            console.error('Error resolving report:', error);
        }
    };
    

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-5 bg-white rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Admin Dashboard</h2>
                <div className="overflow-x-auto">
                    {reports.length > 0 ? (
                        reports.map(report => (
                            <div key={report.id} className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                                <p className="text-gray-700 mb-4">{report.reason}</p>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        onClick={() => handleResolve(report.id, 'ban')}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                                    >
                                        Ban User
                                    </button>
                                    <button
                                        onClick={() => handleResolve(report.id, 'warn')}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                                    >
                                        Warn User
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No reports to display.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

