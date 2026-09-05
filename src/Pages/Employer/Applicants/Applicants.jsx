import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import api from '../../../Core/Api';
import './Applicants.css';

export default function Applicants() {
  const [filter, setFilter] = useState('all');
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getApplications();
        setApplicants(data || []);
      } catch (err) {
        console.error('Failed to load applications:', err);
        setError('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  const filteredApplicants = filter === 'all'
    ? applicants
    : applicants.filter(applicant => applicant.status === filter);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Open': return 'new';
      case 'Reviewed': return 'shortlisted';
      case 'Interviewing': return 'interviewed';
      case 'Hired': return 'hired';
      case 'Rejected': return 'rejected';
      default: return 'new';
    }
  };

  return (
    <div className="applicants">
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
        <h2>Applicants</h2>

        <div className="filters">
          <button
            onClick={() => setFilter('all')}
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('Open')}
            className={`filter-button ${filter === 'Open' ? 'active' : ''}`}
          >
            Open
          </button>
          <button
            onClick={() => setFilter('Reviewed')}
            className={`filter-button ${filter === 'Reviewed' ? 'active' : ''}`}
          >
            Reviewed
          </button>
          <button
            onClick={() => setFilter('Interviewing')}
            className={`filter-button ${filter === 'Interviewing' ? 'active' : ''}`}
          >
            Interviewing
          </button>
          <button
            onClick={() => setFilter('Hired')}
            className={`filter-button ${filter === 'Hired' ? 'active' : ''}`}
          >
            Hired
          </button>
          <button
            onClick={() => setFilter('Rejected')}
            className={`filter-button ${filter === 'Rejected' ? 'active' : ''}`}
          >
            Rejected
          </button>
        </div>

        <div className="table-container">
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#8A8D9B' }}>
              Loading applicants...
            </div>
          ) : error ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#dc2626' }}>
              {error}
            </div>
          ) : filteredApplicants.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#8A8D9B' }}>
              No applicants found
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Applicant Name</th>
                  <th>Job Title</th>
                  <th>Email</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.map((application) => (
                  <tr key={`${application.jobId}-${application.applicantId}`}>
                    <td>
                      <div className="applicant-info">
                        <div className="avatar">
                          {application.applicantName?.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="applicant-name">{application.applicantName}</div>
                      </div>
                    </td>
                    <td>
                      <div className="applicant-detail">{application.jobTitle}</div>
                    </td>
                    <td>
                      <div className="applicant-detail">{application.applicantEmail}</div>
                    </td>
                    <td>
                      <div className="applicant-detail">{new Date(application.appliedAtUtc).toLocaleDateString()}</div>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusClass(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td>
                      <Link to={`/employer/applicants/${application.applicantId}?jobId=${application.jobId}`} className="action-link">Profile</Link>
                      <Link to={`/employer/applicants/${application.applicantId}/resume?jobId=${application.jobId}`} className="action-link">CV</Link>
                      <Link to={`/employer/applications/${application.jobId}/${application.applicantId}`} className="action-link">
                        View Details
                      </Link>
                      <Link to={`/employer/hiring/${application.jobId}/${application.applicantId}`} className="action-link">
                        Hiring Decision
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
