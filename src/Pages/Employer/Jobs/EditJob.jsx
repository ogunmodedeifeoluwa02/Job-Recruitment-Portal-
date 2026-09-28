import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Archive, ArrowLeft, Save, Send } from 'lucide-react';
import api from '../../../Core/Api';
import PageHeader from '../../../Shared/PageHeader';
import { ErrorState, LoadingSkeleton } from '../../../Shared/States';
import EmployerShell from '../components/EmployerShell';
import JobForm from '../components/JobForm';

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
          salary: jobData.salary == null ? '' : jobData.salary,
          categoryId: jobData.categoryId || '',
          deadline: jobData.deadline ? jobData.deadline.split('T')[0] : '',
          description: jobData.description || '',
          requirements: jobData.requirements || '',
        });
      } catch (err) {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitWithStatus = async (status, failureMessage) => {
    setLoading(true);
    setError(null);
    try {
      await api.updateJob(id, {
        ...formData,
        status,
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
        salary: formData.salary ? parseFloat(formData.salary) : null,
      });
      navigate('/employer/jobs');
    } catch (err) {
      if (err.message?.includes('404') || err.message?.includes('Not Found')) {
        setError('Job not found');
      } else {
        setError(failureMessage);
      }
      setLoading(false);
    }
  };

  const handleSaveDraft = () => submitWithStatus('Draft', 'Failed to save draft');
  const handlePublish = () => submitWithStatus('Published', 'Failed to publish job');
  const handleClose = () => submitWithStatus('Closed', 'Failed to close job');

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
          eyebrow="Edit posting"
          title={formData.title || 'Edit job posting'}
          description="Changes go live in the state you choose below."
        />
      </div>

      {loading && !formData.title ? (
        <LoadingSkeleton rows={2} />
      ) : error && !formData.title ? (
        <ErrorState message={error} onRetry={() => navigate(0)} />
      ) : (
        <div className="td-card td-animate-in max-w-[880px] p-6 sm:p-8">
          {error && (
            <p role="alert" className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-[13px] text-red-400">
              {error}
            </p>
          )}
          <JobForm formData={formData} categories={categories} disabled={loading} onChange={handleChange} />
          <div className="mt-7 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
            <button type="button" onClick={handleClose} disabled={loading} className="flex items-center justify-center gap-1.5 rounded-full border border-red-500/30 px-6 py-2.5 text-[13px] font-semibold text-red-400 transition hover:bg-red-500/10 disabled:opacity-40">
              <Archive size={14} />
              {loading ? 'Working…' : 'Close job'}
            </button>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={handleSaveDraft} disabled={loading} className="td-btn-ghost">
                <Save size={14} />
                {loading ? 'Saving…' : 'Save draft'}
              </button>
              <button type="button" onClick={handlePublish} disabled={loading} className="td-btn-primary">
                <Send size={14} />
                {loading ? 'Publishing…' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </EmployerShell>
  );
}
