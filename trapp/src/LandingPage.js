import React from 'react';
import { useNavigate  } from 'react-router-dom';
import logoImage from './assets/puzzle.png'; 

export default function LandingPage() {
    const navigate = useNavigate();
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <img src={logoImage} alt="Logo" className="mb-8 w-56 h-56" />
  
        <h1 className="text-4xl text-center mb-4 font-bold text-gray-800">
          Welcome to MediMatch
        </h1>
  
        <p className="text-center mb-8 text-gray-600">
          Join us and explore the amazing oppertunities.
        </p>
  
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate('/signin')}
            className="bg-blue-500 text-white text-lg px-6 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-green-500 text-white text-lg px-6 py-2 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }