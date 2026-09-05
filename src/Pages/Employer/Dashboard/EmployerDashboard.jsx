import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import api from '../../../Core/Api';
import ApplicantDossierModal from './modals/ApplicantDossierModal';
import './EmployerDashboard.css';

export default function EmployerDashboard() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [metrics, setMetrics] = useState({ openRoles: 0, totalApplicants: 0, interviewsScheduled: 0, hired: 0 });
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const applicationsData = await api.getApplications();
        const jobsData = await api.getJobs();
        
        // Calculate metrics from data
        const metricsData = {
          openRoles: jobsData.filter(job => job.status === 'Published' && new Date(job.deadline) > new Date()).length,
          totalApplicants: applicationsData.length,
          interviewsScheduled: applicationsData.filter(app => app.status === 'Interviewing').length,
          hired: applicationsData.filter(app => app.status === 'Hired').length,
        };

        setJobs(jobsData);
        setMetrics(metricsData);
        setCandidates(applicationsData);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        setError(err.message);
        setMetrics({ openRoles: 0, totalApplicants: 0, interviewsScheduled: 0, hired: 0 });
        setCandidates([]);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  const handleOpenDossier = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDossierOpen(true);
  };

  const handleCloseDossier = () => {
    setSelectedCandidate(null);
    setIsDossierOpen(false);
  };

  if (loading) {
    return (
      <div className="employer-dashboard">
        <header className="top-header">
          <div className="header-content">
            <div className="brand-section">
              <div className="brand-icon">
                <div className="orange-circle"></div>
              </div>
              <span className="brand-text">Job Recruitment Portal</span>
            </div>
          </div>
        </header>
        <div className="content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="employer-dashboard">
        <header className="top-header">
          <div className="header-content">
            <div className="brand-section">
              <div className="brand-icon">
                <div className="orange-circle"></div>
              </div>
              <span className="brand-text">Job Recruitment Portal</span>
            </div>
          </div>
        </header>
        <div className="content">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="employer-dashboard">
      <header className="top-header">
        <div className="header-content">
          <div className="brand-section">
            <div className="brand-icon">
              <div className="orange-circle"></div>
            </div>
            <span className="brand-text">Job Recruitment Portal</span>
          </div>
          <div className="user-section">
            <span className="employer-badge">EMPLOYER</span>
            <div className="avatar">{user.fullname.split(' ').map(name => name[0]).slice(0, 2).join('')}</div>
            <span className="user-email">{user.email}</span>
            <Link to="/logout" className="logout-link">Log Out</Link>
          </div>
        </div>
      </header>
      <nav className="sub-nav">
        <div className="sub-nav-content">
          <div className="nav-tabs">
            <Link to="/employer/jobs" className="nav-tab active">My Postings</Link>
            <Link to="/employer/applicants" className="nav-tab">Applicants</Link>
          </div>
          <a href="https://jobportal.collinswilson.com/swagger/index.html" target="_blank" rel="noreferrer" className="developer-tools">
            <span className="dev-tools-icon">≡</span>
            <span className="dev-tools-text">Developer tools</span>
          </a>
        </div>
      </nav>

      <div className="content">
        <div className="hero-section">
          <p className="hero-subheadline">Recruitment Portal · EMPLOYER WORKSPACE</p>
          <h1 className="hero-title">Hiring, with a clear next step.</h1>
          <Link to="/employer/applicants" className="hero-action-button">Review decision queue →</Link>
        </div>

       
        <div className="metrics-bar">
          <div className="metric-item">
            <p className="metric-label">OPEN ROLES</p>
            <p className="metric-value">{metrics.openRoles}</p>
          </div>
          <div className="metric-item">
            <p className="metric-label">APPLICANTS</p>
            <p className="metric-value">{metrics.totalApplicants}</p>
          </div>
          <div className="metric-item">
            <p className="metric-label">INTERVIEWING</p>
            <p className="metric-value">{metrics.interviewsScheduled}</p>
          </div>
          <div className="metric-item">
            <p className="metric-label">HIRED</p>
            <p className="metric-value">{metrics.hired}</p>
          </div>
        </div>

       
        <div className="main-grid">
          <div className="grid-card decision-queue">
            <h3 className="card-title">DECISION QUEUE</h3>
            <div className="dossier-list">
              {candidates.length === 0 && <p>No applications yet.</p>}
              {candidates.filter(candidate => !['Hired', 'Rejected', 'Withdrawn'].includes(candidate.status)).map((candidate) => (
                <div key={`${candidate.jobId}-${candidate.applicantId}`} className="dossier-item">
                  <div className="dossier-info">
                    <p className="candidate-name">{candidate.applicantName}</p>
                    <p className="candidate-role">{candidate.jobTitle}</p>
                    <p className="applied-timeline">Applied {new Date(candidate.appliedAtUtc).toLocaleDateString()}</p>
                  </div>
                  <button 
                    className="dossier-button"
                    onClick={() => handleOpenDossier(candidate)}
                  >
                    Open dossier →
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid-card upcoming-conversations">
            <h3 className="card-title">INTERVIEWING</h3>
            {candidates.filter(candidate => candidate.status === 'Interviewing').map(candidate => (
              <div key={`${candidate.jobId}-${candidate.applicantId}`} className="conversation-item">
                <div className="conversation-info">
                  <p className="candidate-name">{candidate.applicantName}</p>
                  <p className="candidate-role">{candidate.jobTitle}</p>
                </div>
              </div>
            ))}
            <p className="candidate-role">Interview dates are not available yet.</p>
          </div>
        </div>
      </div>

      <div className="content">
        <Link to="/employer/jobs/create" className="hero-action-button">+ New posting</Link>
        <h3 className="card-title" style={{ marginTop: '1.5rem' }}>MY POSTINGS · {jobs.length}</h3>
        {jobs.length === 0 && <p>No jobs yet. Create your first posting.</p>}
        {jobs.map(job => (
          <div key={job.id} className="grid-card" style={{ marginBottom: '1rem' }}>
            <p className="candidate-role">{job.status}</p>
            <h3>{job.title}</h3>
            <p className="candidate-role">{job.location} · {job.employmentType}</p>
            <Link to={`/employer/jobs/${job.id}/edit`} className="dossier-button">Edit</Link>
            <Link to={`/employer/jobs/${job.id}`} className="dossier-button" style={{ marginLeft: '1rem' }}>View</Link>
          </div>
        ))}
      </div>

      <ApplicantDossierModal
        candidate={selectedCandidate}
        isOpen={isDossierOpen}
        onClose={handleCloseDossier}
      />
    </div>
  );
}
