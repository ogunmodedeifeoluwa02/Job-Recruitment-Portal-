import { Link, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { ArrowLeft, Briefcase, CalendarDays, Clock, MapPin, Pencil, TrendingUp, Users, Wallet } from 'lucide-react';
import api from '../../../Core/Api';
import PageHeader from '../../../Shared/PageHeader';
import StatusBadge from '../../../Shared/StatusBadge';
import { ErrorState, LoadingSkeleton } from '../../../Shared/States';
import EmployerShell from '../components/EmployerShell';
import StatCard from '../components/StatCard';

function formatDate(dateString) {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applicantCount, setApplicantCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getJob(id);
        setJob(data);
        try {
          const applications = await api.getApplications();
          setApplicantCount(applications.filter(a => a.jobId === data.id).length);
        } catch {
          // Applicant count is a bonus; the page works without it.
        }
      } catch (err) {
        if (err.message?.includes('404') || err.message?.includes('Not Found')) {
          setError('Job not found');
        } else {
          setError('Unable to load this posting right now.');
        }
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [id]);

  const facts = job ? [
    { icon: Wallet, label: 'Salary', value: job.salary == null ? 'Not specified' : Number(job.salary).toLocaleString() },
    { icon: TrendingUp, label: 'Experience', value: job.experienceLevel || '—' },
    { icon: Briefcase, label: 'Type', value: job.employmentType || '—' },
    { icon: MapPin, label: 'Location', value: job.location || '—' },
    { icon: Clock, label: 'Deadline', value: formatDate(job.deadline) },
    { icon: CalendarDays, label: 'Posted', value: formatDate(job.createdAtUtc) },
  ] : [];

  return (
    <EmployerShell activeTab="jobs">
      <Link
        to="/employer/jobs"
        className="flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[13px] font-semibold text-gray-400 transition hover:border-[#ff6b2c]/50 hover:text-[#ff6b2c]"
      >
        <ArrowLeft size={14} />
        Back to postings
      </Link>

      {loading ? (
        <div className="mt-6"><LoadingSkeleton rows={2} /></div>
      ) : error || !job ? (
        <div className="mt-6"><ErrorState message={error} /></div>
      ) : (
        <div className="td-animate-in mt-6">
          <PageHeader
            eyebrow={job.category?.name || 'Posting'}
            title={job.title}
            description={`${job.location || '—'} · ${job.employmentType || '—'}`}
            actions={
              <Link to={`/employer/jobs/${job.id}/edit`} className="td-btn-primary">
                <Pencil size={14} />
                Edit posting
              </Link>
            }
          />

          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <StatCard icon={Users} label="Applicants" value={applicantCount} hint="For this posting" accent />
            <div className="td-card flex items-center justify-between p-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#aaa8a3]">Status</p>
                <div className="mt-2"><StatusBadge status={job.status} /></div>
              </div>
            </div>
          </div>

          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-4">
              <section className="td-card p-6 sm:p-7">
                <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#ff6b2c]">Description</h2>
                <p className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-[#d6d3cb]">{job.description}</p>
              </section>
              {job.requirements && (
                <section className="td-card p-6 sm:p-7">
                  <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#ff6b2c]">Requirements</h2>
                  <p className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-[#d6d3cb]">{job.requirements}</p>
                </section>
              )}
            </div>
            <aside className="td-card p-6 lg:sticky lg:top-36">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">Facts</h2>
              <dl className="mt-4 space-y-3.5">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 text-sm">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#ff6b2c]">
                      <Icon size={15} />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[11px] uppercase tracking-wider text-gray-500">{label}</dt>
                      <dd className="truncate font-semibold text-white">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      )}
    </EmployerShell>
  );
}
