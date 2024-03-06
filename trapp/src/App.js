import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Header from './components/Header';
import Tinder from './pages/Tinder';
import Matches from './pages/Matches';
import Profile from './pages/Profile';
import Browse from './pages/Browse';
import Settings from './pages/Settings';
import RecruiteeSignup from './RecruiteeSignup';
import RecruiterSignup from './RecruiterSignup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Menu />
        <Routes>
          {/* Routes from the first App */}
          <Route path='/' element={<Tinder />}/>
          <Route path='/matches' element={<Matches />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/browse' element={<Browse />}/>
          <Route path='/settings' element={<Settings />}/>

          {/* Routes from the second App */}
          <Route path="/signup/recruitee" element={<RecruiteeSignup />} />
          <Route path="/signup/recruiter" element={<RecruiterSignup />} />

          {/* You can add more routes or adjust as necessary */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
