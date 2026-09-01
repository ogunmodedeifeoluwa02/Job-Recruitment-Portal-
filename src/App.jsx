import { BrowserRouter, Routes, Route, Link } from 'react-router';
import Landingpage from './Pages/Landing/LandingPages';
import Login from './Pages/Authentication/Login';
import JobSeekerDashboard from './Pages/JobSeeker/JobSeekerDashboard';
import MyProfile from './Pages/JobSeeker/MyProfile';
import MyApplications from './Pages/JobSeeker/MyApplication';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobseekerdashboard" element={<JobSeekerDashboard/>}/>
        <Route path="/My-Profile" element={<MyProfile/>}/>
        <Route path="/MyApplication" element={<MyApplications/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;