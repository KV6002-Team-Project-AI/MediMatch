// RecruiteeSignup.js
import React, { useState } from 'react';

function RecruiteeSignup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        age: '',
        ethnicity: '',
        height: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/signup/recruitee/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    username: formData.username,
                    password: formData.password,
                },
                age: formData.age,
                ethnicity: formData.ethnicity,
                height: formData.height,
            }),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then((data) => {
            console.log(data);
            // Handle success
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle errors here
        });
    };

    return (
        <div>
        <p>HELLO</p>
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
            <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                required
            />
            <input
                name="ethnicity"
                type="text"
                value={formData.ethnicity}
                onChange={handleChange}
                placeholder="Ethnicity"
                required
            />
            <input
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                placeholder="Height in cm"
                required
            />
            <button type="submit">Sign Up</button>
        </form>
        </div>
    );
}

export default RecruiteeSignup;
