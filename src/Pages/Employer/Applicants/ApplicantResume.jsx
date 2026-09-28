import { Link, useParams, useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import api from '../../../Core/Api';
import { Avatar, ErrorState, LoadingSkeleton } from '../../../Shared/States';
import EmployerShell from '../components/EmployerShell';

export default function ApplicantResume() {
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
        setError('Unable to load this resume right now.');
      } finally {
        setLoading(false);
      }
    };
    loadApplicant();
  }, [id, jobId]);

  return (
    <EmployerShell activeTab="applicants">
      <Link
        to={applicant ? `/employer/applicants/${applicant.applicantId}?jobId=${applicant.jobId}` : '/employer/applicants'}
        className="flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[13px] font-semibold text-gray-400 transition hover:border-[#ff6b2c]/50 hover:text-[#ff6b2c]"
      >
        <ArrowLeft size={14} />
        Back to profile
      </Link>

      {loading ? (
        <div className="mt-6"><LoadingSkeleton rows={2} /></div>
      ) : error || !applicant ? (
        <div className="mt-6"><ErrorState message={error} /></div>
      ) : (
        <div className="td-animate-in mx-auto mt-6 max-w-[880px]">
          <div className="td-card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:p-7">
            <Avatar name={applicant.applicantName} className="h-14 w-14 text-lg" />
            <div className="min-w-0 flex-1">
              <p className="td-eyebrow">Resume</p>
              <h1 className="truncate font-fraunces text-2xl font-bold text-white">
                {applicant.applicantName}
              </h1>
              <p className="text-[13px] text-gray-500">{applicant.jobTitle}</p>
            </div>
          </div>

          <div className="td-card mt-4 flex min-h-[280px] flex-col items-center justify-center p-8 text-center sm:p-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#ff6b2c]/10 text-[#ff6b2c]">
              <FileText size={28} strokeWidth={1.6} />
            </span>
            <h2 className="mt-4 text-lg font-bold text-white">Resume preview</h2>
            <p className="mt-2 max-w-md break-all text-[13px] text-gray-500">
              {applicant.resumeUrl || 'No resume file attached to this application.'}
            </p>
            <p className="mt-2 max-w-md text-xs text-gray-600">
              Resume downloads are not available yet — the backend team is still working on file support.
            </p>
          </div>

          <div className="td-card mt-4 p-6 sm:p-7">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#ff6b2c]">Summary</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#d6d3cb]">
              {applicant.summary || 'No summary provided.'}
            </p>
            <h2 className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#ff6b2c]">Key skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {applicant.skills?.length ? applicant.skills.map((skill, i) => (
                <span key={i} className="rounded-full border border-[#ff6b2c]/30 bg-[#ff6b2c]/5 px-3 py-1 text-xs font-semibold text-[#ff6b2c]">
                  {skill}
                </span>
              )) : <p className="text-sm text-gray-500">No skills listed.</p>}
            </div>
          </div>
        </div>
      )}
    </EmployerShell>
  );
}
