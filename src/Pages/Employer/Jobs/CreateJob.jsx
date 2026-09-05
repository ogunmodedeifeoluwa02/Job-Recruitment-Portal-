import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import api from '../../../Core/Api';
import './CreateJob.css';

export default function CreateJob() {
  const navigate = useNavigate();

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

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    }
    loadCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (
      !formData.title ||
      !formData.location ||
      !formData.categoryId ||
      !formData.deadline ||
      !formData.description ||
      !formData.requirements
    ) {
      setError(
        'Please fill in all required fields (*), including Category and Application Deadline.'
      );
      return false;
    }

    if (formData.salary !== '' && Number(formData.salary) < 0) {
      setError('Salary cannot be negative.');
      return false;
    }
    return true;
  };

  const createJob = async (status) => {
    setLoading(true);
    setError(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const payload = {
        title: formData.title,
        location: formData.location,
        employmentType: formData.employmentType,
        experienceLevel: formData.experienceLevel,
        salary: formData.salary ? Number(formData.salary) : null,
        categoryId: formData.categoryId,
        deadline: new Date(formData.deadline).toISOString(),
        description: formData.description,
        requirements: formData.requirements,
        status: status,
      };


      console.log('Create Job Payload:', payload);
      await api.createJob(payload);
      console.log('Job created successfully');

      navigate('/employer/jobs');
    } catch (err) {
      console.error('Failed to create job:', err);

      setError(err.message);
    }
    setLoading(false);
  };

  const handleSaveDraft = () => {
    createJob('Draft');
  };

  const handlePublish = () => {
    createJob('Published');
  };

  return (
    <div className="create-job">
      <nav>
        <div className="nav-content">
          <div className="nav-header">
            <div className="nav-brand">
              <Link to="/employer">Employer Portal</Link>
            </div>

            <div className="nav-links">
              <Link to="/employer" className="nav-link">
                Dashboard
              </Link>

              <Link to="/employer/jobs" className="nav-link active">
                Jobs
              </Link>

              <Link to="/employer/applicants" className="nav-link">
                Applicants
              </Link>

              <Link to="/employer/interviews" className="nav-link">
                Interviews
              </Link>
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
          <h2>Create Job Posting</h2>

          {error && (
            <div
              className="error-message"
              style={{
                color: '#dc2626',
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: '#fee2e2',
                borderRadius: '0.375rem',
              }}
            >
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
              placeholder="e.g., Senior Frontend Developer"
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
                placeholder="e.g., Remote, New York"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="employmentType">
                Employment Type *
              </label>

              <select
                id="employmentType"
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                required
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
              <label htmlFor="experienceLevel">
                Experience Level *
              </label>

              <select
                id="experienceLevel"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                required
              >
                <option value="Entry">Entry Level</option>
                <option value="Mid">Mid Level</option>
                <option value="Senior">Senior Level</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="categoryId">Category *</label>

              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
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
                placeholder="e.g., 80000"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="deadline">
                Application Deadline *
              </label>

              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Job Description *
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role and responsibilities..."
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="requirements">
              Requirements *
            </label>

            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="List the required skills and qualifications..."
              rows={4}
              required
            />
          </div>

          <div className="button-group">
            <button
              onClick={handleSaveDraft}
              className="button-secondary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Draft'}
            </button>

            <button
              onClick={handlePublish}
              className="button-primary"
              disabled={loading}
            >
              {loading ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}