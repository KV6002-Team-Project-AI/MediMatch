// Start Of Jeds Code*/}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResendVerificationEmail = () => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const navigate = useNavigate();

    const resendVerificationEmail = () => {
        setIsSending(true);
        setMessage('Sending email...');

        const accessToken = localStorage.getItem('accessToken');

        fetch('http://localhost:8000/api/resend-verification-email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include', // Include credentials
        })
        .then(response => response.json()) // JSON response here
        .then(data => {
            if (data.message) {
                setMessage(data.message);
                
            } else {
                throw new Error(data.error || 'Failed to send the email.');
            }
        })
        .catch(error => {
            setMessage(error.toString());
        })
        .finally(() => {
            setIsSending(false);
        });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-lg max-w-sm text-center">
                <h1 className="text-2xl font-bold mb-6">Resend Verification Email</h1>
                <p className="mb-6">{message || 'Click the button below to receive a new verification link.'}</p>
                {!isSending && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                        onClick={resendVerificationEmail}
                    >
                        Send Email
                    </button>
                )}
                {isSending && <p>Sending...</p>}
            </div>
        </div>
    );
};

export default ResendVerificationEmail;
 {/* End Of Jeds Code*/}