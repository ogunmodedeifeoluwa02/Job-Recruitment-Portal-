import { Link, useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import api from '../../../Core/Api';
import StatusBadge from '../../../Shared/StatusBadge';
import { Avatar, ErrorState, LoadingSkeleton } from '../../../Shared/States';
import EmployerShell from '../components/EmployerShell';

export default function HiringDecision() {
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

  const decide = async (status) => {
    setSaving(true);
    setActionError('');
    try {
      await api.updateApplicationStatus(application.jobId, application.applicantId, { status });
      navigate('/employer/applications');
    } catch (err) {
      setActionError(err.message);
    }
    setSaving(false);
  };

  return (
    <EmployerShell activeTab="applicants">
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
        <div className="td-animate-in mx-auto mt-6 max-w-[880px]">
          <div className="text-center">
            <p className="td-eyebrow">Final decision</p>
            <h1 className="mt-1 font-fraunces text-3xl font-bold text-white">Hire or reject?</h1>
            <p className="mt-2 text-sm text-gray-400">
              This records the outcome for <strong className="text-white">{application.applicantName}</strong> · {application.jobTitle}.
            </p>
          </div>

          {actionError && (
            <p role="alert" className="mx-auto mt-5 max-w-[560px] rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-center text-[13px] text-red-400">
              {actionError}
            </p>
          )}

          <div className="mt-6 flex justify-center">
            <div className="td-card flex items-center gap-4 p-5">
              <Avatar name={application.applicantName} className="h-12 w-12 text-sm" />
              <div>
                <p className="font-bold text-white">{application.applicantName}</p>
                <p className="text-xs text-gray-500">{application.applicantEmail}</p>
              </div>
              <StatusBadge status={application.status} />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="td-card border-green-500/25 bg-gradient-to-b from-green-500/10 to-transparent p-6 text-center sm:p-8">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
                <CheckCircle2 size={26} />
              </span>
              <h2 className="mt-3 text-lg font-bold text-white">Hire candidate</h2>
              <p className="mx-auto mt-1 max-w-[260px] text-[13px] leading-5 text-gray-400">
                They met every requirement. Confirm the hire and close the loop.
              </p>
              <button
                type="button"
                disabled={saving}
                onClick={() => decide('Hired')}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 text-[13px] font-bold text-[#151616] transition hover:bg-green-400 disabled:opacity-40"
              >
                {saving ? 'Saving…' : 'Confirm hire'}
              </button>
            </div>

            <div className="td-card border-red-500/25 bg-gradient-to-b from-red-500/10 to-transparent p-6 text-center sm:p-8">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                <XCircle size={26} />
              </span>
              <h2 className="mt-3 text-lg font-bold text-white">Reject candidate</h2>
              <p className="mx-auto mt-1 max-w-[260px] text-[13px] leading-5 text-gray-400">
                Not the right fit this time. This closes their application.
              </p>
              <button
                type="button"
                disabled={saving}
                onClick={() => decide('Rejected')}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-500/40 px-6 py-3 text-[13px] font-bold text-red-400 transition hover:bg-red-500/10 disabled:opacity-40"
              >
                {saving ? 'Saving…' : 'Reject application'}
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to={`/employer/applications/${application.jobId}/${application.applicantId}`} className="text-[13px] font-semibold text-gray-500 transition hover:text-[#ff6b2c]">
              ← Review the full application first
            </Link>
          </div>
        </div>
      )}
    </EmployerShell>
  );
}
