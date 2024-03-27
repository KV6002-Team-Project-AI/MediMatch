import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import withAuthentication from './HOCauth';

const RecruiterSignup = ({ userRoles }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        research_area: '',
        company_info: '',
        termsOfService: false
    });

    useEffect(() => {
        if (userRoles.is_recruiter || userRoles.is_superuser) {
            fetch('http://localhost:8000/api/recruiter/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(response => response.json())
            .then(data => {
                // Assuming the response contains the recruiter data in the expected format
                setFormData({
                    research_area: data.research_area || '',
                    company_info: data.company_info || '',
                    termsOfService: false // Assuming you want to reset or handle termsOfService separately
                });
            })
            .catch(error => console.error('Error:', error));
        }
    }, [userRoles]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.termsOfService) {
            alert('You must agree to the terms of service.');
            return;
        }

        const url = 'http://localhost:8000/api/recruiter/';
        const method = 'PUT';  // Assuming you want to update existing profile

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            navigate('/profile'); // Navigate to profile or confirmation page
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    if (!userRoles.is_recruiter && !userRoles.is_superuser) {
        return <div>You do not have permission to view this page.</div>;
    }

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="research_area">
                        Research Area
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="research_area"
                        type="text"
                        placeholder="Research Area"
                        name="research_area"
                        value={formData.research_area}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company_info">
                        Company Info
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="company_info"
                        placeholder="Company Info"
                        name="company_info"
                        value={formData.company_info}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="checkbox"
                        id="termsOfService"
                        name="termsOfService"
                        checked={formData.termsOfService}
                        onChange={handleChange}
                        className="mr-2 leading-tight"
                    />
                    <label className="text-sm" htmlFor="termsOfService">
                        I agree to the terms of service
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>

                </div>
            </form>
        </div>
    );
};

export default withAuthentication(RecruiterSignup);
