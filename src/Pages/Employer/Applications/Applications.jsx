import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import api from '../../../Core/Api';
import './Applications.css';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getApplications();
        setApplications(data);
      } catch (err) {
        console.error('Failed to load applications:', err);
        setError('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  return (
    <div className="applications">
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
        <h2>Applications</h2>

        <div className="table-container">
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#8A8D9B' }}>
              Loading applications...
            </div>
          ) : error ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#dc2626' }}>
              {error}
            </div>
          ) : applications.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#8A8D9B' }}>
              No applications found
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Role</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={`${application.jobId}-${application.applicantId}`}>
                    <td>
                      <div className="applicant-info">
                        <div className="avatar">
                          {application.applicantName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="applicant-name">{application.applicantName}</div>
                          <div className="applicant-email">{application.applicantEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="applicant-detail">{application.jobTitle}</div>
                    </td>
                    <td>
                      <div className="applicant-detail">{new Date(application.appliedAtUtc).toLocaleDateString()}</div>
                    </td>
                    <td>
                      <span className={`status-badge ${application.status}`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <Link to={`/employer/applicants/${application.applicantId}?jobId=${application.jobId}`} className="action-link">Profile</Link>
                      <Link to={`/employer/applicants/${application.applicantId}/resume?jobId=${application.jobId}`} className="action-link">CV</Link>
                      <Link to={`/employer/applications/${application.jobId}/${application.applicantId}`} className="action-link">
                        Review
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
