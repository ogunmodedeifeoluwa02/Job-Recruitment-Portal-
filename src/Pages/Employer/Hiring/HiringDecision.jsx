import { Link, useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import api from '../../../Core/Api';
import './HiringDecision.css';

export default function HiringDecision() {
  const navigate = useNavigate();
  const { jobId, applicantId } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    const loadApplication = async () => {
      setLoading(true);
      setError(null);
      try {
        // Load all applications and find the specific one by ID
        const applicationsData = await api.getApplications();
        const foundApplication = applicationsData.find(app => app.jobId === jobId && app.applicantId === applicantId);
        
        if (foundApplication) {
          setApplication(foundApplication);
        } else {
          setError('Application not found');
        }
      } catch (err) {
        console.error('Failed to load application:', err);
        setError('Failed to load application');
      }
      setLoading(false);
    };

    loadApplication();
  }, [jobId, applicantId]);

  if (loading) {
    return (
      <div className="hiring-decision">
        <nav>
          <div className="nav-content">
            <div className="nav-header">
              <div className="nav-brand">
                <Link to="/employer">Employer Portal</Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="hiring-decision">
        <nav>
          <div className="nav-content">
            <div className="nav-header">
              <div className="nav-brand">
                <Link to="/employer">Employer Portal</Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="content">
          <p>{error || 'Applicant not found'}</p>
        </div>
      </div>
    );
  }

  const handleHire = async () => {
    setSaving(true);
    setActionError('');
    try {
      await api.updateApplicationStatus(application.jobId, application.applicantId, { status: 'Hired' });
      navigate('/employer/applications');
    } catch (err) {
      console.error('Failed to hire applicant:', err);
      setActionError(err.message);
    }
    setSaving(false);
  };

  const handleReject = async () => {
    setSaving(true);
    setActionError('');
    try {
      await api.updateApplicationStatus(application.jobId, application.applicantId, { status: 'Rejected' });
      navigate('/employer/applications');
    } catch (err) {
      console.error('Failed to reject applicant:', err);
      setActionError(err.message);
    }
    setSaving(false);
  };

  return (
    <div className="hiring-decision">
      <nav>
        <div className="nav-content">
          <div className="nav-header">
            <div className="nav-brand">
              <Link to="/employer">Employer Portal</Link>
            </div>
            <div className="nav-links">
              <Link to="/employer" className="nav-link">Dashboard</Link>
              <Link to="/employer/jobs" className="nav-link">Jobs</Link>
              <Link to="/employer/applications" className="nav-link active">Applicants</Link>
              <Link to="/employer/interviews" className="nav-link">Interviews</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="content">
        <div>
          <Link to="/employer/applications" className="back-link">
            ← Back to Applicants
          </Link>
        </div>

        <div className="card">
          {actionError && <p role="alert" style={{ color: '#dc2626' }}>{actionError}</p>}
          <h2>Hiring Decision</h2>

          <div className="card-header">
            <div className="avatar-large">
              {application.applicantName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="applicant-info">
              <p className="applicant-name">{application.applicantName}</p>
              <p className="applicant-subtitle">{application.jobTitle}</p>
              <p className="applicant-meta">Applied: {new Date(application.appliedAtUtc).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <p className="metric-label">Email</p>
              <p className="metric-value">{application.applicantEmail}</p>
            </div>
            <div className="metric-card">
              <p className="metric-label">Status</p>
              <p className="metric-value">{application.status}</p>
            </div>
          </div>

          <p>Profile and CV coming soon — API work in progress.</p>
          <Link to={`/employer/applicants/${application.applicantId}?jobId=${application.jobId}`}>View Profile</Link>
          <Link to={`/employer/applicants/${application.applicantId}/resume?jobId=${application.jobId}`}>View CV</Link>
          <div className="section">
            <h3>Professional Summary</h3>
            <p>{application.summary || 'No summary provided'}</p>
          </div>

          <div className="section">
            <h3>Skills</h3>
            <div className="skills-container">
              {application.skills && application.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="decision-section">
            <h4>Make Your Decision</h4>
            <div className="decision-grid">
              <div className="decision-card green">
                <div className="decision-header">
                  <svg className="decision-icon green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h5 className="decision-title green">Hire Candidate</h5>
                </div>
                <p className="decision-description green">
                  This candidate has met all requirements and is recommended for hire.
                </p>
                <button disabled={saving} onClick={handleHire} className="decision-button green">
                  Confirm Hire
                </button>
              </div>

              <div className="decision-card red">
                <div className="decision-header">
                  <svg className="decision-icon red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h5 className="decision-title red">Reject Candidate</h5>
                </div>
                <p className="decision-description red">
                  This candidate does not meet the requirements for this position.
                </p>
                <button disabled={saving} onClick={handleReject} className="decision-button red">
                  Reject Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
