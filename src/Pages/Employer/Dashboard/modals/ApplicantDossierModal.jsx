import { Link } from 'react-router';
import { X } from 'lucide-react';
import StatusBadge from '../../../../Shared/StatusBadge';
import { Avatar } from '../../../../Shared/States';

export default function ApplicantDossierModal({ candidate, isOpen, onClose }) {
  if (!isOpen || !candidate) return null;

  const rows = [
    { label: 'Role', value: candidate.jobTitle },
    { label: 'Location', value: candidate.location || '—' },
    { label: 'Applied', value: candidate.appliedAtUtc ? new Date(candidate.appliedAtUtc).toLocaleDateString() : '—' },
    { label: 'Headline', value: candidate.headline || '—' },
    { label: 'Skills', value: candidate.skills || '—' },
    { label: 'Education', value: candidate.education || '—' },
    { label: 'Experience', value: candidate.workExperience || '—' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Dossier for ${candidate.applicantName}`}
    >
      <div
        className="td-card td-animate-in max-h-[88vh] w-full max-w-[640px] overflow-y-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="td-eyebrow">Candidate dossier</p>
            <h2 className="mt-1 font-fraunces text-2xl font-bold text-white">
              {candidate.applicantName}
            </h2>
            <p className="mt-1 text-[13px] text-gray-500">{candidate.applicantEmail}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <StatusBadge status={candidate.status} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dossier"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-[#ff6b2c]/50 hover:text-[#ff6b2c]"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <Avatar name={candidate.applicantName} className="h-11 w-11 text-sm" />
          <div className="grid flex-1 grid-cols-1 gap-x-4 gap-y-2 text-[13px] sm:grid-cols-3">
            {rows.slice(0, 3).map(({ label, value }) => (
              <div key={label} className="min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-gray-500">{label}</p>
                <p className="truncate font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {rows.slice(3).map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <p className="text-[11px] uppercase tracking-wider text-gray-500">{label}</p>
              <p className="mt-1 text-[13px] leading-5 text-gray-300">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 sm:flex-row sm:justify-between">
          <div className="flex gap-2">
            <Link
              to={`/employer/applicants/${candidate.applicantId}/resume?jobId=${candidate.jobId}`}
              className="td-btn-ghost !px-4 !py-2"
            >
              Read CV
            </Link>
            <Link
              to={`/employer/applicants/${candidate.applicantId}?jobId=${candidate.jobId}`}
              className="td-btn-ghost !px-4 !py-2"
            >
              View profile
            </Link>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/employer/hiring/${candidate.jobId}/${candidate.applicantId}`}
              className="td-btn-primary !px-4 !py-2"
            >
              Hire / reject
            </Link>
            <button type="button" onClick={onClose} className="td-btn-ghost !px-4 !py-2">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
