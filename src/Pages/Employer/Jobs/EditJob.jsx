import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../../../Core/Api';
import './EditJob.css';

export default function EditJob() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    employmentType: 'FullTime',
    experienceLevel: 'Entry',
    salary: '',
    categoryId: '',
    deadline: '',
    description: '',
    requirements: '',
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [jobData, categoriesData] = await Promise.all([
          api.getJob(id),
          api.getCategories()
        ]);
        setCategories(categoriesData);
        
        setFormData({
          title: jobData.title || '',
          location: jobData.location || '',
          employmentType: jobData.employmentType || 'FullTime',
          experienceLevel: jobData.experienceLevel || 'Entry',
          salary: jobData.salary || '',
          categoryId: jobData.categoryId || '',
          deadline: jobData.deadline ? jobData.deadline.split('T')[0] : '',
          description: jobData.description || '',
          requirements: jobData.requirements || '',
        });
      } catch (err) {
        console.error('Failed to load data:', err);
        if (err.message?.includes('404') || err.message?.includes('Not Found')) {
          setError('Job not found');
        } else {
          setError('Failed to load job data');
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    setError(null);
    try {
      const jobData = {
        ...formData,
        status: 'Draft',
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
        salary: formData.salary ? parseFloat(formData.salary) : null,
      };
      await api.updateJob(id, jobData);
      navigate('/employer/jobs');
    } catch (err) {
      console.error('Failed to save draft:', err);
      if (err.message?.includes('404') || err.message?.includes('Not Found')) {
        setError('Job not found');
      } else {
        setError('Failed to save draft');
      }
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    setError(null);
    try {
      const jobData = {
        ...formData,
        status: 'Active',
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
        salary: formData.salary ? parseFloat(formData.salary) : null,
      };
      await api.updateJob(id, jobData);
      navigate('/employer/jobs');
    } catch (err) {
      console.error('Failed to publish job:', err);
      if (err.message?.includes('404') || err.message?.includes('Not Found')) {
        setError('Job not found');
      } else {
        setError('Failed to publish job');
      }
      setLoading(false);
    }
  };

  const handleClose = async () => {
    setLoading(true);
    setError(null);
    try {
      const jobData = {
        ...formData,
        status: 'Closed',
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
        salary: formData.salary ? parseFloat(formData.salary) : null,
      };
      await api.updateJob(id, jobData);
      navigate('/employer/jobs');
    } catch (err) {
      console.error('Failed to close job:', err);
      if (err.message?.includes('404') || err.message?.includes('Not Found')) {
        setError('Job not found');
      } else {
        setError('Failed to close job');
      }
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-job">
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

  if (error) {
    return (
      <div className="edit-job">
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
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-job">
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

        <div className="form-card">
          <h2>Edit Job Posting</h2>
          
          {error && (
            <div className="error-message" style={{ color: '#dc2626', marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fee2e2', borderRadius: '0.375rem' }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">Job Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="employmentType">Employment Type</label>
              <select
                id="employmentType"
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
              >
                <option value="FullTime">Full-time</option>
                <option value="PartTime">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="experienceLevel">Experience Level</label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
              >
                <option value="Entry">Entry Level</option>
                <option value="Mid">Mid Level</option>
                <option value="Senior">Senior Level</option>
                <option value="Lead">Lead Level</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="categoryId">Category</label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="deadline">Application Deadline</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="requirements">Requirements *</label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="button-group">
            <button onClick={handleClose} className="button-danger" disabled={loading}>
              Close Job
            </button>
            <div>
              <button onClick={handleSaveDraft} className="button-secondary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Draft'}
              </button>
              <button onClick={handlePublish} className="button-primary" disabled={loading}>
                {loading ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
