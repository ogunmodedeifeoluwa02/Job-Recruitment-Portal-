import { Link, useParams, useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import api from '../../../Core/Api';
import './ApplicantResume.css';

export default function ApplicantResume() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const jobId = params.get("jobId");
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadApplicant = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getApplicant(id, jobId);
        console.log('Applicant loaded:', id);
        setApplicant(data);
      } catch (err) {
        console.error('Failed to load applicant:', err);
        setError('Failed to load applicant');
      } finally {
        setLoading(false);
      }
    };

    loadApplicant();
  }, [id, jobId]);

  if (loading) {
    return (
      <div className="applicant-resume">
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
      <div className="applicant-resume">
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

  return (
    <div className="applicant-resume">
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
        <p style={{ color: '#E05628', marginBottom: '1rem' }}>Coming soon — API work in progress.</p>
        <div>
          <Link to={`/employer/applicants/${applicant.applicantId}?jobId=${applicant.jobId}`} className="back-link">
            ← Back to Profile
          </Link>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Resume - {applicant.applicantName}</h2>
            <button disabled className="download-button">
              Download Resume
            </button>
          </div>

          <div className="upload-area">
            <svg className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="upload-title">Resume Preview</h3>
            <p className="upload-description">
              {applicant.resumeUrl}
            </p>
            <div>
              <button disabled className="view-button">
                View Full Resume
              </button>
            </div>
          </div>

          <div className="summary-section">
            <h3>Resume Summary</h3>
            <div className="summary-card">
              <p className="summary-text">{applicant.summary}</p>
              <div>
                <h4>Key Skills</h4>
                <div className="skills-container">
                  {applicant.skills && applicant.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
