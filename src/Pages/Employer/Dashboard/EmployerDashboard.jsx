import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight, BriefcaseBusiness, CalendarClock, CheckCircle2, Plus, Users } from 'lucide-react';
import api from '../../../Core/Api';
import PageHeader from '../../../Shared/PageHeader';
import StatusBadge from '../../../Shared/StatusBadge';
import { Avatar, ErrorState, LoadingSkeleton } from '../../../Shared/States';
import EmployerShell from '../components/EmployerShell';
import StatCard from '../components/StatCard';
import ApplicantDossierModal from './modals/ApplicantDossierModal';

export default function EmployerDashboard() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [metrics, setMetrics] = useState({ openRoles: 0, totalApplicants: 0, interviewsScheduled: 0, hired: 0 });
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const applicationsData = await api.getApplications();
        const jobsData = await api.getJobs();
        if (!active) return;
        setMetrics({
          openRoles: jobsData.filter(job => job.status === 'Published' && new Date(job.deadline) > new Date()).length,
          totalApplicants: applicationsData.length,
          interviewsScheduled: applicationsData.filter(app => app.status === 'Interviewing').length,
          hired: applicationsData.filter(app => app.status === 'Hired').length,
        });
        setJobs(jobsData);
        setCandidates(applicationsData);
      } catch {
        if (!active) return;
        setError('Unable to load your workspace right now.');
        setMetrics({ openRoles: 0, totalApplicants: 0, interviewsScheduled: 0, hired: 0 });
        setCandidates([]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [refresh]);

  const retry = () => {
    setLoading(true);
    setError(null);
    setRefresh((r) => r + 1);
  };

  const queue = candidates.filter(c => !['Hired', 'Rejected', 'Withdrawn'].includes(c.status)).slice(0, 5);
  const interviewing = candidates.filter(c => c.status === 'Interviewing').slice(0, 4);

  return (
    <EmployerShell activeTab="dashboard">
      <PageHeader
        eyebrow="Employer workspace"
        title="Hiring, with a clear next step."
        description="Decisions, pipeline and postings — everything that needs you, in one view."
        actions={
          <>
            <Link to="/employer/jobs/create" className="td-btn-primary">
              <Plus size={15} />
              New posting
            </Link>
            <Link to="/employer/applicants" className="td-btn-ghost">
              Review queue
              <ArrowRight size={14} />
            </Link>
          </>
        }
      />

      {loading ? (
        <LoadingSkeleton rows={3} />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : (
        <>
          <div className="td-stagger grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={BriefcaseBusiness} label="Open roles" value={metrics.openRoles} hint="Published, before deadline" accent />
            <StatCard icon={Users} label="Applicants" value={metrics.totalApplicants} hint="Across all postings" />
            <StatCard icon={CalendarClock} label="Interviewing" value={metrics.interviewsScheduled} hint="In interview stage" />
            <StatCard icon={CheckCircle2} label="Hired" value={metrics.hired} hint="Offers accepted" />
          </div>

          <div className="mt-6 grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
            <section className="td-card p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#9ebcff]">
                  Decision queue
                </h2>
                <Link to="/employer/applicants" className="text-xs font-bold text-[#ff6b2c] hover:text-[#ff7d45]">
                  View all →
                </Link>
              </div>
              {queue.length === 0 ? (
                <p className="py-6 text-center text-sm text-gray-500">
                  No applications waiting on you. New applicants will land here.
                </p>
              ) : (
                <div className="divide-y divide-white/5">
                  {queue.map((candidate) => (
                    <div
                      key={`${candidate.jobId}-${candidate.applicantId}`}
                      className="flex items-center justify-between gap-3 py-3.5"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Avatar name={candidate.applicantName} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-white">
                            {candidate.applicantName}
                          </p>
                          <p className="truncate text-xs text-gray-500">
                            {candidate.jobTitle} · Applied {new Date(candidate.appliedAtUtc).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <StatusBadge status={candidate.status} className="hidden sm:inline-flex" />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            setIsDossierOpen(true);
                          }}
                          className="rounded-full border border-[#ff6b2c]/50 px-3.5 py-1.5 text-xs font-bold text-[#ff6b2c] transition hover:bg-[#ff6b2c] hover:text-[#151616]"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <div className="space-y-4">
              <section className="td-card p-5 sm:p-6">
                <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#9ebcff]">
                  Interviewing
                </h2>
                {interviewing.length === 0 ? (
                  <p className="text-[13px] leading-5 text-gray-500">
                    Nobody in interviews yet. Mark applicants as Interviewing to
                    see them here.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {interviewing.map((candidate) => (
                      <Link
                        key={`${candidate.jobId}-${candidate.applicantId}`}
                        to={`/employer/applications/${candidate.jobId}/${candidate.applicantId}`}
                        className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-[#ff6b2c]/40"
                      >
                        <Avatar name={candidate.applicantName} className="h-8 w-8 text-[10px]" />
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-bold text-white">
                            {candidate.applicantName}
                          </p>
                          <p className="truncate text-xs text-gray-500">{candidate.jobTitle}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>

              <section className="td-card border-[#ff6b2c]/25 bg-gradient-to-b from-[#ff6b2c]/10 to-transparent p-5 sm:p-6">
                <h2 className="text-sm font-bold text-white">
                  Postings · {jobs.length}
                </h2>
                <p className="mt-1 text-xs leading-5 text-gray-400">
                  {metrics.openRoles} open right now. Keep descriptions sharp —
                  they are what candidates see first.
                </p>
                <Link to="/employer/jobs" className="td-btn-ghost mt-4 w-full">
                  Manage postings
                </Link>
              </section>
            </div>
          </div>
        </>
      )}

      <ApplicantDossierModal
        candidate={selectedCandidate}
        isOpen={isDossierOpen}
        onClose={() => {
          setSelectedCandidate(null);
          setIsDossierOpen(false);
        }}
      />
    </EmployerShell>
  );
}
