import { Link, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import api from '../../../Core/Api';
import './ApplicantProfile.css';

export default function ApplicantProfile() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadApplicant = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getApplicant(id);
        setApplicant(data);
      } catch (err) {
        console.error('Failed to load applicant:', err);
        setError('Failed to load applicant');
      } finally {
        setLoading(false);
      }
    };

    loadApplicant();
  }, [id]);

  if (loading) {
    return (
      <div className="applicant-profile">
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
          <p style={{ color: '#8A8D9B' }}>Loading applicant...</p>
        </div>
      </div>
    );
  }

  if (error || !applicant) {
    return (
      <div className="applicant-profile">
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
          <p style={{ color: '#dc2626' }}>{error || 'Applicant not found'}</p>
        </div>
      </div>
    );
  }

  const getStageClass = (stage) => {
    switch (stage) {
      case 'new': return 'new';
      case 'shortlisted': return 'shortlisted';
      case 'interviewed': return 'interviewed';
      case 'hired': return 'hired';
      case 'rejected': return 'rejected';
      default: return 'new';
    }
  };

  return (
    <div className="applicant-profile">
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
          <Link to="/employer/applicants" className="back-link">
            ← Back to Applicants
          </Link>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="avatar-large">
              {applicant.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="applicant-info">
              <h2>{applicant.name}</h2>
              <p className="applicant-subtitle">{applicant.role}</p>
              <div className="applicant-meta">
                <span className={`status-badge ${getStageClass(applicant.stage)}`}>
                  {applicant.stage.charAt(0).toUpperCase() + applicant.stage.slice(1)}
                </span>
                <span>Applied: {applicant.appliedDate}</span>
              </div>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <p className="metric-label">Email</p>
              <p className="metric-value">{applicant.email}</p>
            </div>
            <div className="metric-card">
              <p className="metric-label">Phone</p>
              <p className="metric-value">{applicant.phone}</p>
            </div>
            <div className="metric-card">
              <p className="metric-label">Location</p>
              <p className="metric-value">{applicant.location}</p>
            </div>
            <div className="metric-card">
              <p className="metric-label">Experience</p>
              <p className="metric-value">{applicant.experience}</p>
            </div>
          </div>

          <div className="section">
            <h3>Professional Summary</h3>
            <p>{applicant.summary}</p>
          </div>

          <div className="section">
            <h3>Skills</h3>
            <div className="skills-container">
              {applicant.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="section">
            <h3>Cover Letter</h3>
            <p>{applicant.coverLetter}</p>
          </div>

          <div className="button-group">
            <Link to={`/employer/applicants/${applicant.id}/resume`} className="button-secondary">
              View Resume
            </Link>
            <div>
              <Link to={`/employer/hiring/${applicant.id}`} className="button-green">
                Make Hiring Decision
              </Link>
              <Link to={`/employer/interviews/schedule/${applicant.id}`} className="button-primary">
                Schedule Interview
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
