import { Link } from 'react-router';
import './Interviews.css';

export default function Interviews() {
  return (
    <div className="interviews">
      <nav>
        <div className="nav-content">
          <div className="nav-header">
            <div className="nav-brand">
              <Link to="/employer">Employer Portal</Link>
            </div>
            <div className="nav-links">
              <Link to="/employer" className="nav-link">Dashboard</Link>
              <Link to="/employer/jobs" className="nav-link">Jobs</Link>
              <Link to="/employer/applicants" className="nav-link">Applicants</Link>
              <Link to="/employer/interviews" className="nav-link active">Interviews</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="content">
        <div className="header">
          <h2>Interviews</h2>
        </div>

        <div className="table-container" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ color: '#8A8D9B', marginBottom: '1rem' }}>
            <p>Interview scheduling feature is not yet available.</p>
            <p>Please use the Applicants page to manage application status and hiring decisions.</p>
          </div>
          <Link to="/employer/applicants" className="action-link" style={{ display: 'inline-block', marginTop: '1rem' }}>
            Go to Applicants →
          </Link>
        </div>
      </div>
    </div>
  );
}
