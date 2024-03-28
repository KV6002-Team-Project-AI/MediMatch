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
                if (data) { // If the data exists, assume it includes an identifier like `id`
                    setFormData(currentData => ({
                        ...currentData,
                        ...data, // Ensure this includes the `id` or similar identifier
                        termsOfService: currentData.termsOfService // Preserve existing termsOfService state or reset as needed
                    }));
                }
            })
            .catch(error => console.error('Error:', error));
        }
    }, [userRoles]); 
    
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!formData.termsOfService) {
            alert('You must agree to the terms of service.');
            return;
        }
    
        // Use `id` or the relevant field as your record identifier
        const method = formData.user ? 'PUT' : 'POST';
    
        fetch('http://localhost:8000/api/recruiter/', {
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
            navigate('/profile'); // Navigate to the profile or another appropriate page
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
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit
                </button>
            </form>
        </div>
    );
};


export default withAuthentication(RecruiterSignup);
