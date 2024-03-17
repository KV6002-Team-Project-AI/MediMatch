import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import Header from './components/Header';
import Tinder from './pages/Tinder';
import Matches from './pages/Matches';
import Profile from './pages/Profile';
import Research from './pages/Research';
import RecruiteeSignup from './RecruiteeSignup';
import RecruiteeEditProfile from './RecruiteeEditProfile';
import RecruiterSignup from './RecruiterSignup';
import SignIn from './SignIn';
import SignUp from './SignUp';
import LandingPage from './LandingPage'
import UserStatus from './test';
import './App.css';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const excludedPaths = ['/signin', '/signup', '/signup/recruitee', '/signup/recruiter', '/landingpage', '/'];

  return (
    <div className="App">
      {!excludedPaths.includes(location.pathname) && <Header />}
      {!excludedPaths.includes(location.pathname) && <Menu />}
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/tinder' element={<Tinder />}/>
        <Route path='/matches' element={<Matches />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/research' element={<Research />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/test' element={<UserStatus />}/>
        <Route path="/signup/recruitee" element={<RecruiteeSignup />} />
        <Route path="/update/recruitee" element={<RecruiteeSignup />} />
        <Route path="/signup/recruiter" element={<RecruiterSignup />} />
        <Route path='/landingpage' element={<LandingPage />}/>


        {/* Catch-all route */}
        <Route path='*' element={<Navigate to='/profile' replace />} />
      </Routes>
    </div>
  );
}

export default AppWrapper;