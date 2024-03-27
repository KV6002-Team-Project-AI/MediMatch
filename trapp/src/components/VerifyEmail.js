import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const { uidb64, token } = useParams();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    const verifyEmail = () => {
        setIsVerifying(true);
        setVerificationStatus('Verifying...');
        fetch(`http://localhost:8000/verify-email/${uidb64}/${token}/`)
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Verification failed.');
            })
            .then(data => {
                setVerificationStatus('Email verified successfully.');
                setTimeout(() => navigate("/signin"), 3000); // Redirect after 3 seconds
            })
            .catch((error) => {
                setVerificationStatus('Verification link is invalid or expired.');
                setIsVerifying(false);
            });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-lg max-w-sm text-center">
                <h1 className="text-2xl font-bold mb-6">Email Verification</h1>
                <p className="mb-6">{verificationStatus || 'Please click the button below to verify your email address.'}</p>
                {!isVerifying && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                        onClick={verifyEmail}
                    >
                        Verify Email
                    </button>
                )}
                {isVerifying && <p>Verifying...</p>}
            </div>
        </div>
    );
};

export default VerifyEmail;
