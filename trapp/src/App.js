import React, { useEffect } from 'react';
import {BrowserRouter as Router,Routes,Route,useLocation,Navigate} from 'react-router-dom';
import Menu from './components/Menu';
import Header from './components/Header';
import Tinder from './pages/Tinder';
import Matches from './pages/Matches';
import MatchesRecruitee from './pages/MatchesRecruitee';
import Profile from './pages/Profile';
import Research from './pages/Research';
import AddStudy from './pages/AddStudy';
import RecruiteeSignup from './RecruiteeSignup';
import RecruiterSignup from './RecruiterSignup';
import SignIn from './SignIn';
import SignUp from './SignUp';
import LandingPage from './LandingPage';
import UserStatus from './test';
import VerifyEmail from './components/VerifyEmail';
import ResendVerificationEmail from './components/ResendVerificationEmail';
import AnalyticsData from './charts';
import CreateUserForm from './admincreate';
import ReportUserForm from './report';
import AdminDashboard from './madash';
import './App.css';

/**
 * Hook for tracking page views in Google Analytics.
 * 
 * @author Jed Bywater <>
 */
function usePageTracking() {
    const location = useLocation();
    useEffect(() => {
        const currentPath = location.pathname + location.search;
        const userId = localStorage.getItem('userInfo').id;// Retrieve the user ID from local storage

        window.gtag('config', 'G-BQGVC0WJND', {
            page_path: currentPath,
            user_id: userId, // Send the user ID to Google Analytics
        });
    }, [location]);
}

/**
 * Main application component.
 * 
 * @author Syed Wajahat Quadri <w21043564>
 * @author Mohammed Etri <>
 * @author Jed Bywater <>
 */
function App() {
    usePageTracking(); // Call this in your App component

    const location = useLocation();
    const excludedPaths = ['/signin', '/signup', '/signup/recruitee', '/signup/recruiter', '/landingpage', '/verify-email/:uidb64/:token', '/'];

    return (
        <div className="App">
            {!excludedPaths.includes(location.pathname) && <Header />}
            {!excludedPaths.includes(location.pathname) && <Menu />}
            <Routes>
                <Route path='/' element={<LandingPage />}/>
                <Route path='/tinder' element={<Tinder />}/>
                <Route path='/matches' element={<Matches />}/>
                <Route path='/matches/recruitee' element={<MatchesRecruitee />}/>
                <Route path='/profile' element={<Profile />}/>
                <Route path='/research' element={<Research />}/>
                <Route path='/signin' element={<SignIn />}/>
                <Route path='/signup' element={<SignUp />}/>
                <Route path='/verify-email/:uidb64/:token' element={<VerifyEmail />} />
                <Route path="/resend-verification-email" element={<ResendVerificationEmail />} />
                <Route path='/charts' element={<AnalyticsData />}/>
                <Route path='/admin/create' element={<CreateUserForm />}/>
                <Route path='/report' element={<ReportUserForm />}/>
                <Route path='/dashboard' element={<AdminDashboard />}/>
                <Route path='/test' element={<UserStatus />}/>
                <Route path="/signup/recruitee" element={<RecruiteeSignup />} />
                <Route path="/update/recruitee" element={<RecruiteeSignup />} />
                <Route path="/update/recruiter" element={<RecruiterSignup />} />
                <Route path="/signup/recruiter" element={<RecruiterSignup />} />
                <Route path="/addstudy" element={<AddStudy />} />
                <Route path='/landingpage' element={<LandingPage />}/>

                {/* Catch-all route */}
                <Route path='*' element={<Navigate to='/profile' replace />} />
            </Routes>
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
