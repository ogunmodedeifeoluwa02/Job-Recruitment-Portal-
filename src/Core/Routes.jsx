import { createBrowserRouter, Navigate } from 'react-router';
import Landingpage from '../Pages/Landing/LandingPages';
import Login from '../Pages/Authentication/Login';
import JobSeekerDashboard from '../Pages/JobSeeker/JobSeekerDashboard';
import MyProfile from '../Pages/JobSeeker/MyProfile';
import MyApplications from '../Pages/JobSeeker/MyApplication';
import EmployerDashboard from '../Pages/Employer/Dashboard/EmployerDashboard';
import JobListings from '../Pages/Employer/Jobs/JobListings';
import CreateJob from '../Pages/Employer/Jobs/CreateJob';
import EditJob from '../Pages/Employer/Jobs/EditJob';
import JobDetails from '../Pages/Employer/Jobs/JobDetails';
import Applicants from '../Pages/Employer/Applicants/Applicants';
import ApplicantProfile from '../Pages/Employer/Applicants/ApplicantProfile';
import ApplicantResume from '../Pages/Employer/Applicants/ApplicantResume';
import Applications from '../Pages/Employer/Applications/Applications';
import ApplicationDetails from '../Pages/Employer/Applications/ApplicationDetails';
import Interviews from '../Pages/Employer/Interviews/Interviews';
import ScheduleInterview from '../Pages/Employer/Interviews/ScheduleInterview';
import HiringDecision from '../Pages/Employer/Hiring/HiringDecision';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landingpage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/jobseekerdashboard',
    element: <JobSeekerDashboard />,
  },
  {
    path: '/My-Profile',
    element: <MyProfile />,
  },
  {
    path: '/MyApplication',
    element: <MyApplications />,
  },
  {
    path: '/employer',
    element: <EmployerDashboard />,
  },
  {
    path: '/employerdashboard',
    element: <EmployerDashboard />,
  },
  {
    path: '/employer/jobs',
    element: <JobListings />,
  },
  {
    path: '/employer/jobs/create',
    element: <CreateJob />,
  },
  {
    path: '/employer/jobs/:id/edit',
    element: <EditJob />,
  },
  {
    path: '/employer/jobs/:id',
    element: <JobDetails />,
  },
  {
    path: '/employer/applicants',
    element: <Applicants />,
  },
  {
    path: '/employer/applicants/:id',
    element: <ApplicantProfile />,
  },
  {
    path: '/employer/applicants/:id/resume',
    element: <ApplicantResume />,
  },
  {
    path: '/employer/applications',
    element: <Applications />,
  },
  {
    path: '/employer/applications/:id',
    element: <ApplicationDetails />,
  },
  {
    path: '/employer/interviews',
    element: <Interviews />,
  },
  {
    path: '/employer/interviews/schedule',
    element: <ScheduleInterview />,
  },
  {
    path: '/employer/interviews/schedule/:id',
    element: <ScheduleInterview />,
  },
  {
    path: '/employer/hiring/:id',
    element: <HiringDecision />,
  },
  {
    path: '*',
    element: <Navigate to="/employer" replace />,
  },
]);
