import { Link, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import api from '../../../Core/Api';
import './JobDetails.css';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getJob(id);
        setJob(data);
      } catch (err) {
        console.error('Failed to load job:', err);
        if (err.message?.includes('404') || err.message?.includes('Not Found')) {
          setError('Job not found');
        } else {
          setError('Failed to load job');
        }
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatSalary = (salary) => {
    if (salary == null) return 'Not specified';
    return Number(salary).toLocaleString();
  };

  if (loading) {
    return (
      <div className="job-details">
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

  if (error || !job) {
    return (
      <div className="job-details">
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
          <p>{error || 'Job not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details">
      <nav>
        <div className="nav-content">
          <div className="nav-header">
            <div className="nav-brand">
              <Link to="/employer">Employer Portal</Link>
            </div>
            <div className="nav-links">
              <Link to="/employer" className="nav-link">Dashboard</Link>
              <Link to="/employer/jobs" className="nav-link active">Jobs</Link>
              <Link to="/employer/applicants" className="nav-link">Applicants</Link>
              <Link to="/employer/interviews" className="nav-link">Interviews</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="content">
        <div>
          <Link to="/employer/jobs" className="back-link">
            ← Back to Jobs
          </Link>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h2>{job.title}</h2>
              <p className="job-subtitle">{job.location} • {job.employmentType}</p>
            </div>
            <div>
              <Link to={`/employer/jobs/${job.id}/edit`} className="edit-button">
                Edit
              </Link>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <p className="metric-label">Salary</p>
              <p className="metric-value">{formatSalary(job.salary)}</p>
            </div>
            <div className="metric-card">
              <p className="metric-label">Experience Level</p>
              <p className="metric-value">{job.experienceLevel}</p>
            </div>
            <div className="metric-card">
              <p className="metric-label">Category</p>
              <p className="metric-value">{job.category?.name || 'N/A'}</p>
            </div>
            <div className="metric-card">
              <p className="metric-label">Status</p>
              <p className="metric-value capitalize">{job.status}</p>
            </div>
          </div>

          <div className="section">
            <h3>Description</h3>
            <p>{job.description}</p>
          </div>

          <div className="section">
            <h3>Requirements</h3>
            <p>{job.requirements}</p>
          </div>

          <div className="section">
            <h3>Deadline</h3>
            <p>{formatDate(job.deadline)}</p>
          </div>

          <div className="section">
            <h3>Posted Date</h3>
            <p>{formatDate(job.createdAtUtc)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
