import { Link, useParams, useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, FileText, Mail, MapPin, Phone, Star } from 'lucide-react';
import api from '../../../Core/Api';
import StatusBadge from '../../../Shared/StatusBadge';
import { Avatar, ErrorState, LoadingSkeleton } from '../../../Shared/States';
import EmployerShell from '../components/EmployerShell';

export default function ApplicantProfile() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const jobId = params.get("jobId");
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadApplicant = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getApplicant(id, jobId);
        setApplicant(data);
      } catch {
        setError('Unable to load this applicant right now.');
      } finally {
        setLoading(false);
      }
    };
    loadApplicant();
  }, [id, jobId]);

  const contact = applicant ? [
    { icon: Mail, label: 'Email', value: applicant.applicantEmail || '—' },
    { icon: Phone, label: 'Phone', value: applicant.phone || '—' },
    { icon: MapPin, label: 'Location', value: applicant.location || '—' },
    { icon: Star, label: 'Experience', value: applicant.experience || '—' },
  ] : [];

  return (
    <EmployerShell activeTab="applicants">
      <Link
        to="/employer/applicants"
        className="flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[13px] font-semibold text-gray-400 transition hover:border-[#ff6b2c]/50 hover:text-[#ff6b2c]"
      >
        <ArrowLeft size={14} />
        Back to applicants
      </Link>

      {loading ? (
        <div className="mt-6"><LoadingSkeleton rows={2} /></div>
      ) : error || !applicant ? (
        <div className="mt-6"><ErrorState message={error} /></div>
      ) : (
        <div className="td-animate-in mt-6">
          <div className="td-glow td-card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            <Avatar name={applicant.applicantName} className="h-16 w-16 text-xl" />
            <div className="min-w-0 flex-1">
              <h1 className="truncate font-fraunces text-3xl font-bold text-white">
                {applicant.applicantName}
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                Applied for <strong className="text-white">{applicant.jobTitle}</strong>
                {applicant.appliedAtUtc && <> · {new Date(applicant.appliedAtUtc).toLocaleDateString()}</>}
              </p>
              <div className="mt-3"><StatusBadge status={applicant.status} /></div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Link to={`/employer/applicants/${applicant.applicantId}/resume?jobId=${applicant.jobId}`} className="td-btn-ghost !px-4 !py-2">
                <FileText size={14} />
                Resume
              </Link>
              <Link to={`/employer/hiring/${applicant.jobId}/${applicant.applicantId}`} className="td-btn-primary !px-4 !py-2">
                <CheckCircle2 size={14} />
                Decide
              </Link>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {contact.map(({ icon: Icon, label, value }) => (
              <div key={label} className="td-card flex items-center gap-3 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#ff6b2c]">
                  <Icon size={16} />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-gray-500">{label}</p>
                  <p className="truncate text-sm font-bold text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid items-start gap-4 lg:grid-cols-2">
            <section className="td-card p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#ff6b2c]">Summary</h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#d6d3cb]">
                {applicant.summary || 'No summary provided.'}
              </p>
            </section>
            <section className="td-card p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#ff6b2c]">Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {applicant.skills?.length ? applicant.skills.map((skill, i) => (
                  <span key={i} className="rounded-full border border-[#ff6b2c]/30 bg-[#ff6b2c]/5 px-3 py-1 text-xs font-semibold text-[#ff6b2c]">
                    {skill}
                  </span>
                )) : <p className="text-sm text-gray-500">No skills listed.</p>}
              </div>
              <h2 className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#ff6b2c]">Cover letter</h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#d6d3cb]">
                {applicant.coverLetter || 'No cover letter provided.'}
              </p>
            </section>
          </div>
        </div>
      )}
    </EmployerShell>
  );
}
