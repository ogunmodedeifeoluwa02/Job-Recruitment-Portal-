import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import api from '../../../Core/Api';
import './JobListings.css';

export default function JobListings() {
  const [filter, setFilter] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getJobs();
        setJobs(data);
      } catch (err) {
        console.error('Failed to load jobs:', err);
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const filteredJobs = filter === 'all' ? jobs : jobs.filter(job => job.status === filter);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'active';
      case 'draft': return 'draft';
      case 'closed': return 'closed';
      default: return 'closed';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) {
      return;
    }

    setDeleteLoading(jobId);
    try {
      await api.deleteJob(jobId);
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (err) {
      console.error('Failed to delete job:', err);
      if (err.message?.includes('404') || err.message?.includes('Not Found')) {
        alert('Job not found');
      } else {
        alert('Failed to delete job');
      }
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="job-listings">
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
        <div className="header">
          <h2>Job Postings</h2>
          <Link to="/employer/jobs/create" className="create-button">
            + Create Job
          </Link>
        </div>

        <div className="filters">
          <button
            onClick={() => setFilter('all')}
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`filter-button ${filter === 'active' ? 'active' : ''}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`filter-button ${filter === 'draft' ? 'active' : ''}`}
          >
            Draft
          </button>
          <button
            onClick={() => setFilter('closed')}
            className={`filter-button ${filter === 'closed' ? 'active' : ''}`}
          >
            Closed
          </button>
        </div>

        <div className="table-container">
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#8A8D9B' }}>
              Loading jobs...
            </div>
          ) : error ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#dc2626' }}>
              {error}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#8A8D9B' }}>
              No jobs found
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Posted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <div className="job-title">{job.title}</div>
                    </td>
                    <td>
                      <div className="job-detail">{job.location}</div>
                    </td>
                    <td>
                      <div className="job-detail">{job.employmentType}</div>
                    </td>
                    <td>
                      <div className="job-detail">{job.category?.name || 'N/A'}</div>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusClass(job.status)}`}>
                        {job.status?.charAt(0)?.toUpperCase() + job.status?.slice(1)?.toLowerCase() || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <div className="job-detail">{formatDate(job.createdAtUtc)}</div>
                    </td>
                    <td>
                      <Link to={`/employer/jobs/${job.id}/edit`} className="action-link">
                        Edit
                      </Link>
                      <Link to={`/employer/jobs/${job.id}`} className="action-link">
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="action-link"
                        disabled={deleteLoading === job.id}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#dc2626',
                          cursor: deleteLoading === job.id ? 'not-allowed' : 'pointer',
                          marginLeft: '0.5rem',
                          fontSize: '0.875rem',
                        }}
                      >
                        {deleteLoading === job.id ? 'Deleting...' : 'Delete'}
                      </button>
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
