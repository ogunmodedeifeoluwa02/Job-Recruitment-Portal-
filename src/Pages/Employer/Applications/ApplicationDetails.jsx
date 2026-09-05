import { Link, useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import api from '../../../Core/Api';
import './ApplicationDetails.css';

export default function ApplicationDetails() {
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
      <div className="application-details">
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
      <div className="application-details">
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
          <p>{error || 'Application not found'}</p>
        </div>
      </div>
    );
  }

  const handleAction = async (status) => {
    setSaving(true);
    setActionError('');
    try {
      await api.updateApplicationStatus(jobId, applicantId, { status });
      navigate('/employer/applications');
    } catch (err) {
      setActionError(err.message);
    }
    setSaving(false);
  };

  return (
    <div className="application-details">
      <nav>
        <div className="nav-content">
          <div className="nav-header">
            <div className="nav-brand">
              <Link to="/employer">Employer Portal</Link>
            </div>
            <div className="nav-links">
              <Link to="/employer" className="nav-link">Dashboard</Link>
              <Link to="/employer/jobs" className="nav-link">Jobs</Link>
              <Link to="/employer/applicants" className="nav-link active">Applicants</Link>
              <Link to="/employer/interviews" className="nav-link">Interviews</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="content">
        <div>
          <Link to="/employer/applications" className="back-link">
            ← Back to Applications
          </Link>
        </div>

        <div className="card">
          {actionError && <p role="alert" style={{ color: '#dc2626' }}>{actionError}</p>}
          <div className="card-header">
            <div className="avatar-large">
              {application.applicantName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="applicant-info">
              <h2>{application.applicantName}</h2>
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
              <p className="metric-label">Phone</p>
              <p className="metric-value">{'Not available'}</p>
            </div>
          </div>

          <p>Profile and CV coming soon — API work in progress.</p>
          <Link to={`/employer/applicants/${application.applicantId}?jobId=${application.jobId}`}>View Profile</Link>
          <Link to={`/employer/applicants/${application.applicantId}/resume?jobId=${application.jobId}`}>View CV</Link>
          <div className="section">
            <h3>Professional Summary</h3>
            <p>{application.summary}</p>
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

          <div className="actions-section">
            <h4>Application Actions</h4>
            <div className="actions-grid">
              <button disabled={saving} onClick={() => handleAction('Reviewed')} className="action-button green">
                Mark Reviewed
              </button>
              <button disabled={saving} onClick={() => handleAction('Interviewing')} className="action-button blue">
                Mark Interviewing
              </button>
              <Link to={`/employer/hiring/${application.jobId}/${application.applicantId}`} className="action-button blue">
                Make Hiring Decision
              </Link>
            </div>
            <button disabled={saving} onClick={() => handleAction('Rejected')} className="action-button red" style={{ marginTop: '1rem', width: '100%' }}>
              Reject Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
