import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { BriefcaseBusiness, Pencil, Plus, Trash2 } from 'lucide-react';
import api from '../../../Core/Api';
import PageHeader from '../../../Shared/PageHeader';
import StatusBadge from '../../../Shared/StatusBadge';
import { EmptyState, ErrorState, LoadingSkeleton } from '../../../Shared/States';
import EmployerShell from '../components/EmployerShell';
import StatCard from '../components/StatCard';

const FILTERS = ['all', 'Published', 'Draft', 'Closed'];

function formatDate(dateString) {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function JobListings() {
  const [filter, setFilter] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let active = true;
    api.getJobs().then(
      (data) => {
        if (!active) return;
        setJobs(data);
        setLoading(false);
      },
      () => {
        if (!active) return;
        setError('Unable to load your postings right now.');
        setLoading(false);
      },
    );
    return () => {
      active = false;
    };
  }, [refresh]);

  const retry = () => {
    setLoading(true);
    setError(null);
    setRefresh((r) => r + 1);
  };

  const filteredJobs = filter === 'all' ? jobs : jobs.filter(job => job.status === filter);
  const openCount = jobs.filter(j => j.status === 'Published').length;

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    setDeleteLoading(jobId);
    try {
      await api.deleteJob(jobId);
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (err) {
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
    <EmployerShell activeTab="jobs">
      <PageHeader
        eyebrow="Manage"
        title="Job postings"
        description={`${jobs.length} posting${jobs.length === 1 ? '' : 's'} · ${openCount} published. Draft, publish and close roles from here.`}
        actions={
          <Link to="/employer/jobs/create" className="td-btn-primary">
            <Plus size={15} />
            Create job
          </Link>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`td-pill ${filter === f ? "td-pill-active" : ""}`}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSkeleton rows={3} />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          icon={BriefcaseBusiness}
          title={filter === 'all' ? 'No postings yet' : `No ${filter.toLowerCase()} postings`}
          hint={filter === 'all' ? 'Create your first posting to start receiving applications.' : 'Try a different filter.'}
          actionTo={filter === 'all' ? '/employer/jobs/create' : undefined}
          actionLabel={filter === 'all' ? 'Create a posting' : undefined}
        />
      ) : (
        <>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <StatCard icon={BriefcaseBusiness} label="Total postings" value={jobs.length} hint="Draft, published and closed" />
            <StatCard icon={BriefcaseBusiness} label="Published" value={openCount} hint="Visible to job seekers" accent />
          </div>
          <div className="td-stagger space-y-3">
            {filteredJobs.map((job) => (
              <article key={job.id} className="td-card flex flex-col gap-4 p-5 transition hover:border-white/20 sm:flex-row sm:items-center sm:p-6">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={job.status} />
                    <span className="text-xs text-gray-500">{job.category?.name || 'General'}</span>
                  </div>
                  <Link
                    to={`/employer/jobs/${job.id}`}
                    className="mt-1.5 block truncate font-fraunces text-xl font-bold text-white transition hover:text-[#ff6b2c]"
                  >
                    {job.title}
                  </Link>
                  <p className="mt-1 text-[13px] text-gray-500">
                    {job.location} · {job.employmentType} · Posted {formatDate(job.createdAtUtc)}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link to={`/employer/jobs/${job.id}`} className="td-btn-ghost !px-4 !py-2">
                    View
                  </Link>
                  <Link to={`/employer/jobs/${job.id}/edit`} className="td-btn-ghost !px-4 !py-2">
                    <Pencil size={13} />
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(job.id)}
                    disabled={deleteLoading === job.id}
                    className="flex items-center gap-1.5 rounded-full border border-red-500/30 px-4 py-2 text-[13px] font-semibold text-red-400 transition hover:bg-red-500/10 disabled:opacity-40"
                  >
                    <Trash2 size={13} />
                    {deleteLoading === job.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </EmployerShell>
  );
}
