import { createBrowserRouter, Navigate, redirect } from 'react-router';
import Landingpage from '../Pages/Landing/LandingPages';
import Login from '../Pages/Authentication/Login';
import JobSeekerDashboard from '../Pages/JobSeeker/JobSeekerDashboard';
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

const requireLogin = (role) => () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  if (!token || !user) return redirect('/login');
  const employer = user.account_type === 'Employer';
  if (role === 'Employer' && !employer) return redirect('/jobseekerdashboard');
  if (role === 'JobSeeker' && employer) return redirect('/employer');
  return null;
};


export const router = createBrowserRouter([{
  errorElement: <div className="min-h-screen bg-[#151616] p-8 text-white"><h2 className="mb-4 text-xl">This page could not load.</h2><a href="/login" className="text-[#ff6b2c]">Go back to login</a></div>,
  children: [
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
    loader: requireLogin('JobSeeker'),
  },
  {
    path: '/My-Profile',
    element: <Navigate to="/jobseekerdashboard?tab=my-profile" replace />,
  },
  {
    path: '/MyApplication',
    element: <Navigate to="/jobseekerdashboard?tab=my-applications" replace />,
  },
  {
    path: '/employer',
    element: <EmployerDashboard />,
    loader: requireLogin('Employer'),
  },
  {
    path: '/employerdashboard',
    element: <Navigate to="/employer" replace />,
  },
  {
    path: '/employer/jobs',
    element: <JobListings />,
    loader: requireLogin('Employer'),
  },
  {
    path: '/employer/jobs/create',
    element: <CreateJob />,
    loader: requireLogin('Employer'),
  },
  {
    path: '/employer/jobs/:id/edit',
    element: <EditJob />,
    loader: requireLogin('Employer'),
  },
  {
    path: '/employer/jobs/:id',
    element: <JobDetails />,
    loader: requireLogin('Employer'),
  },
  {
    path: '/employer/applicants',
    element: <Applicants />,
    loader: requireLogin('Employer'),
  },
  {
    path: '/employer/applicants/:id',
    element: <ApplicantProfile />,
    loader: requireLogin('Employer'),
  },
  {
    path: '/employer/applicants/:id/resume',
    element: <ApplicantResume />,
    loader: requireLogin('Employer'),
  },
  {
    path: '/employer/applications',
    element: <Applications />,
    loader: requireLogin('Employer'),
  },
  {
    path: '/employer/applications/:jobId/:applicantId',
    element: <ApplicationDetails />,
    loader: requireLogin('Employer'),
  },
  {
    path: '/employer/interviews',
    element: <Interviews />,
    loader: requireLogin('Employer'),
  },
  {
    path: '/employer/interviews/schedule',
    element: <ScheduleInterview />,
    loader: requireLogin('Employer'),
  },
  {
    path: '/employer/interviews/schedule/:id',
    element: <ScheduleInterview />,
    loader: requireLogin('Employer'),
  },
  {
    path: '/employer/hiring/:jobId/:applicantId',
    element: <HiringDecision />,
    loader: requireLogin('Employer'),
  },
  {
    path: '/logout',
    loader: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return redirect('/login');
    },
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
  ],
}]);
