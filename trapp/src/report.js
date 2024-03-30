import React, { useState } from 'react';
import axios from 'axios';

const ReportUserForm = ({ selectedUser, onClose, screenshotData }) => {
    const [reason, setReason] = useState('');

    // Function to convert base64 string to a file object
function base64ToFile(dataurl, filename) {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}

const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
    if (!token) {
        alert('You must be logged in to submit a report.');
        return;
    }

    const screenshotFile = base64ToFile(screenshotData, 'screenshot.png');

    let formData = new FormData();
    formData.append('reported_user', selectedUser);
    formData.append('reason', reason);
    formData.append('screenshot', screenshotFile);

    try {
        await axios.post('http://localhost:8000/report/', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        alert('Report submitted successfully');
        onClose(); // Close the modal/form after successful submission
    } catch (error) {
        console.error('Error submitting report:', error);
        alert('Error submitting report');
    }
};


    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <p className="text-gray-700 text-sm font-bold mb-2">
                        Reporting {selectedUser.username || 'user'}: {/* Handle undefined username */}
                    </p>
                    <textarea
                        id="reason"
                        placeholder="Describe the reason"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit Report
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReportUserForm;
