import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Menu />
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/Tinder' element={<LandingPage />}/>
          <Route path='/matches' element={<Matches />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/research' element={<Research />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/test' element={<UserStatus />}/>
          <Route path="/signup/recruitee" element={<RecruiteeSignup />} />
          <Route path="/update/recruitee" element={<RecruiteeEditProfile />} />
          <Route path="/signup/recruiter" element={<RecruiterSignup />} />
          <Route path='/landingpage' element={<LandingPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
