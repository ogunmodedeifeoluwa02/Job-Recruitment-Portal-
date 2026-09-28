import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import api from '../../../Core/Api';
import PageHeader from '../../../Shared/PageHeader';
import EmployerShell from '../components/EmployerShell';
import JobForm from '../components/JobForm';

const EMPTY = {
  title: '',
  location: '',
  employmentType: 'FullTime',
  experienceLevel: 'Entry',
  salary: '',
  categoryId: '',
  deadline: '',
  description: '',
  requirements: '',
};

export default function CreateJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(EMPTY);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    }
    loadCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.title || !formData.location || !formData.categoryId || !formData.deadline || !formData.description || !formData.requirements) {
      setError('Please fill in all required fields (*), including Category and Application Deadline.');
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
      await api.createJob({
        title: formData.title,
        location: formData.location,
        employmentType: formData.employmentType,
        experienceLevel: formData.experienceLevel,
        salary: formData.salary ? Number(formData.salary) : null,
        categoryId: formData.categoryId,
        deadline: new Date(formData.deadline).toISOString(),
        description: formData.description,
        requirements: formData.requirements,
        status,
      });
      navigate('/employer/jobs');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <EmployerShell activeTab="jobs">
      <Link
        to="/employer/jobs"
        className="flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[13px] font-semibold text-gray-400 transition hover:border-[#ff6b2c]/50 hover:text-[#ff6b2c]"
      >
        <ArrowLeft size={14} />
        Back to postings
      </Link>

      <div className="mt-6">
        <PageHeader
          eyebrow="New posting"
          title="Create job posting"
          description="Write it well — this is exactly what candidates will read."
        />
      </div>

      <div className="td-card td-animate-in max-w-[880px] p-6 sm:p-8">
        {error && (
          <p role="alert" className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-[13px] text-red-400">
            {error}
          </p>
        )}
        <JobForm formData={formData} categories={categories} disabled={loading} onChange={handleChange} />
        <div className="mt-7 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row">
          <button type="button" onClick={() => createJob('Draft')} className="td-btn-ghost" disabled={loading}>
            <Save size={14} />
            {loading ? 'Saving…' : 'Save draft'}
          </button>
          <button type="button" onClick={() => createJob('Published')} className="td-btn-primary" disabled={loading}>
            {loading ? 'Publishing…' : 'Publish posting'}
            {!loading && <ArrowRight size={14} />}
          </button>
        </div>
      </div>
    </EmployerShell>
  );
}
