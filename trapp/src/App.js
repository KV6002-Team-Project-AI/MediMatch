import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Header from './components/Header';
import Tinder from './pages/Tinder';
import Matches from './pages/Matches';
import Profile from './pages/Profile';
import AddResearch from './pages/AddResearch';
import Browse from './pages/Browse';
import Settings from './pages/Settings';
import RecruiteeSignup from './RecruiteeSignup';
import RecruiterSignup from './RecruiterSignup';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Menu />
        <Routes>
          <Route path='/' element={<Tinder />}/>
          <Route path='/matches' element={<Matches />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/browse' element={<Browse />}/>
          <Route path='/add-study' element={<AddResearch />}/>
          <Route path='/settings' element={<Settings />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path="/signup/recruitee" element={<RecruiteeSignup />} />
          <Route path="/signup/recruiter" element={<RecruiterSignup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
