import { Link, useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, FileText, UserRound, XCircle } from 'lucide-react';
import api from '../../../Core/Api';
import StatusBadge from '../../../Shared/StatusBadge';
import { Avatar, ErrorState, LoadingSkeleton } from '../../../Shared/States';
import EmployerShell from '../components/EmployerShell';

export default function ApplicationDetails() {
  const navigate = useNavigate();
  const { jobId, applicantId } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    const loadApplication = async () => {
      setLoading(true);
      setError(null);
      try {
        const applicationsData = await api.getApplications();
        const found = applicationsData.find(app => app.jobId === jobId && app.applicantId === applicantId);
        if (found) {
          setApplication(found);
        } else {
          setError('Application not found');
        }
      } catch {
        setError('Unable to load this application right now.');
      }
      setLoading(false);
    };
    loadApplication();
  }, [jobId, applicantId]);

  const handleAction = async (status) => {
    setSaving(true);
    setActionError('');
    try {
      await api.updateApplicationStatus(jobId, applicantId, { status });
      navigate('/employer/applications');
    } catch (err) {
      setActionError(err.message);
    }
    setSaving(false);
  };

  return (
    <EmployerShell activeTab="applications">
      <Link
        to="/employer/applications"
        className="flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[13px] font-semibold text-gray-400 transition hover:border-[#ff6b2c]/50 hover:text-[#ff6b2c]"
      >
        <ArrowLeft size={14} />
        Back to applications
      </Link>

      {loading ? (
        <div className="mt-6"><LoadingSkeleton rows={2} /></div>
      ) : error || !application ? (
        <div className="mt-6"><ErrorState message={error} /></div>
      ) : (
        <div className="td-animate-in mt-6 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="td-card p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Avatar name={application.applicantName} className="h-16 w-16 text-xl" />
              <div className="min-w-0 flex-1">
                <h1 className="truncate font-fraunces text-2xl font-bold text-white sm:text-3xl">
                  {application.applicantName}
                </h1>
                <p className="mt-1 text-sm text-gray-400">
                  Applied for <strong className="text-white">{application.jobTitle}</strong>
                  {application.appliedAtUtc && <> · {new Date(application.appliedAtUtc).toLocaleDateString()}</>}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusBadge status={application.status} />
                  <span className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                    {application.applicantEmail}
                  </span>
                </div>
              </div>
            </div>

            {actionError && (
              <p role="alert" className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-[13px] text-red-400">
                {actionError}
              </p>
            )}

            <div className="mt-6 border-t border-white/10 pt-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#ff6b2c]">Summary</h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#d6d3cb]">
                {application.summary || 'No summary provided.'}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#ff6b2c]">Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {application.skills?.length ? application.skills.map((skill, i) => (
                  <span key={i} className="rounded-full border border-[#ff6b2c]/30 bg-[#ff6b2c]/5 px-3 py-1 text-xs font-semibold text-[#ff6b2c]">
                    {skill}
                  </span>
                )) : <p className="text-sm text-gray-500">No skills listed.</p>}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-6">
              <Link to={`/employer/applicants/${application.applicantId}?jobId=${application.jobId}`} className="td-btn-ghost !px-4 !py-2">
                <UserRound size={14} />
                Full profile
              </Link>
              <Link to={`/employer/applicants/${application.applicantId}/resume?jobId=${application.jobId}`} className="td-btn-ghost !px-4 !py-2">
                <FileText size={14} />
                View CV
              </Link>
            </div>
          </div>

          <aside className="td-card border-[#ff6b2c]/25 bg-gradient-to-b from-[#ff6b2c]/10 to-transparent p-6 lg:sticky lg:top-36">
            <h2 className="text-sm font-bold text-white">Move this candidate</h2>
            <p className="mt-1 text-xs leading-5 text-gray-400">
              Every action updates the candidate's status instantly.
            </p>
            <div className="mt-4 space-y-2">
              <button type="button" disabled={saving} onClick={() => handleAction('Reviewed')} className="td-btn-ghost w-full">
                <CheckCircle2 size={14} />
                Mark reviewed
              </button>
              <button type="button" disabled={saving} onClick={() => handleAction('Interviewing')} className="td-btn-ghost w-full">
                Mark interviewing
              </button>
              <Link to={`/employer/hiring/${application.jobId}/${application.applicantId}`} className="td-btn-primary w-full">
                Hiring decision →
              </Link>
              <button
                type="button"
                disabled={saving}
                onClick={() => handleAction('Rejected')}
                className="flex w-full items-center justify-center gap-1.5 rounded-full border border-red-500/30 px-6 py-2.5 text-[13px] font-semibold text-red-400 transition hover:bg-red-500/10 disabled:opacity-40"
              >
                <XCircle size={14} />
                Reject application
              </button>
            </div>
          </aside>
        </div>
      )}
    </EmployerShell>
  );
}
