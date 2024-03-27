import React, { useState } from 'react';
import axios from 'axios';

const ReportUserForm = ({ users = [] }) => {
    const [selectedUser, setSelectedUser] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/report/', {
                reported_user: selectedUser,
                reason: reason
            });
            alert('Report submitted successfully');
        } catch (error) {
            console.error('Error submitting report:', error);
            alert('Error submitting report');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user">
                        User to report:
                    </label>
                    <select
                        id="user"
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        {users.length > 0 ? users.map(user => (
                            <option key={user.id} value={user.id}>{user.username}</option>
                        )) : <option disabled>Loading users...</option>}
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
                        Reason:
                    </label>
                    <textarea
                        id="reason"
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
                </div>
            </form>
        </div>
    );
};

export default ReportUserForm;
