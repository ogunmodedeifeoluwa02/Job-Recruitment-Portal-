import { Link } from 'react-router';
import './ScheduleInterview.css';

export default function ScheduleInterview() {
  return (
    <div className="schedule-interview">
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
        <div>
          <Link to="/employer/interviews" className="back-link">
            ← Back to Interviews
          </Link>
        </div>

        <div className="form-card">
          <h2>Schedule Interview</h2>
          
          <div style={{ padding: '2rem', textAlign: 'center', color: '#8A8D9B' }}>
            <p>Interview scheduling feature is not yet available.</p>
            <p>Please use the Applicants page to manage application status and hiring decisions.</p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Link to="/employer/applicants" className="button-primary" style={{ display: 'inline-block' }}>
              Go to Applicants →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
