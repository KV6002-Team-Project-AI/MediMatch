import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecruiteeSignup from './RecruiteeSignup';
import RecruiterSignup from './RecruiterSignup';
import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        {/* Setup the routes for different components */}
        <Routes>
          <Route path="/signup/recruitee" element={<RecruiteeSignup />} />
          <Route path="/signup/recruiter" element={<RecruiterSignup />} />

          {/* Add other routes as needed */}
          {/* The default route can still show the original content */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
