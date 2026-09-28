import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { ArrowRight, CalendarClock, Users } from 'lucide-react';
import api from '../../../Core/Api';
import PageHeader from '../../../Shared/PageHeader';
import { Avatar, EmptyState, ErrorState, LoadingSkeleton } from '../../../Shared/States';
import EmployerShell from '../components/EmployerShell';

export default function Interviews() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let active = true;
    api.getApplications().then(
      (data) => {
        if (!active) return;
        setApplications(data.filter((a) => a.status === 'Interviewing'));
        setLoading(false);
      },
      () => {
        if (!active) return;
        setError('Unable to load interviews right now.');
        setLoading(false);
      },
    );
    return () => {
      active = false;
    };
  }, [refresh]);

  const retry = () => {
    setLoading(true);
    setError('');
    setRefresh((r) => r + 1);
  };

  return (
    <EmployerShell activeTab="interviews">
      <PageHeader
        eyebrow="Pipeline"
        title="Interviews"
        description="Every candidate currently at interview stage, across all postings."
        actions={
          <Link to="/employer/applicants" className="td-btn-ghost">
            Go to applicants
            <ArrowRight size={14} />
          </Link>
        }
      />

      {loading ? (
        <LoadingSkeleton rows={3} />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : applications.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="No upcoming interviews"
          hint="Candidates you mark as Interviewing will appear here."
          actionTo="/employer/applicants"
          actionLabel="Go to applicants"
        />
      ) : (
        <div className="td-stagger grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {applications.map((application) => (
            <Link
              key={`${application.jobId}-${application.applicantId}`}
              to={`/employer/applications/${application.jobId}/${application.applicantId}`}
              className="td-card group flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:border-[#ff6b2c]/40"
            >
              <Avatar name={application.applicantName} className="h-12 w-12 text-sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-bold text-white transition group-hover:text-[#ff6b2c]">
                  {application.applicantName}
                </p>
                <p className="truncate text-[13px] text-gray-500">{application.jobTitle}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-[#ff6b2c]">
                  <CalendarClock size={12} />
                  Interviewing
                </p>
              </div>
              <ArrowRight size={16} className="shrink-0 text-gray-600 transition group-hover:translate-x-0.5 group-hover:text-[#ff6b2c]" />
            </Link>
          ))}
        </div>
      )}

      {!loading && !error && (
        <p className="mt-6 flex items-center gap-2 text-xs text-gray-600">
          <Users size={13} />
          Interview dates are managed through each application — open a candidate to schedule.
        </p>
      )}
    </EmployerShell>
  );
}
