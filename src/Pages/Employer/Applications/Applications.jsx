import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { FileText, Users } from 'lucide-react';
import api from '../../../Core/Api';
import PageHeader from '../../../Shared/PageHeader';
import StatusBadge from '../../../Shared/StatusBadge';
import { Avatar, EmptyState, ErrorState, LoadingSkeleton } from '../../../Shared/States';
import EmployerShell from '../components/EmployerShell';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let active = true;
    api.getApplications().then(
      (data) => {
        if (!active) return;
        setApplications(data);
        setLoading(false);
      },
      () => {
        if (!active) return;
        setError('Unable to load applications right now.');
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

  return (
    <EmployerShell activeTab="applications">
      <PageHeader
        eyebrow="Pipeline"
        title="All applications"
        description={`${applications.length} application${applications.length === 1 ? '' : 's'} across every posting, most recent first.`}
      />

      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : applications.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No applications yet"
          hint="Once candidates apply to your postings, every application lands here."
          actionTo="/employer/jobs"
          actionLabel="View postings"
        />
      ) : (
        <div className="td-table-wrap">
          <table className="td-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Role</th>
                <th>Applied</th>
                <th>Status</th>
                <th className="!text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={`${application.jobId}-${application.applicantId}`}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar name={application.applicantName} className="h-9 w-9 text-[11px]" />
                      <div className="min-w-0">
                        <p className="truncate font-bold text-white">{application.applicantName}</p>
                        <p className="truncate text-xs text-gray-500">{application.applicantEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="max-w-[220px] truncate">{application.jobTitle}</td>
                  <td className="whitespace-nowrap">{new Date(application.appliedAtUtc).toLocaleDateString()}</td>
                  <td><StatusBadge status={application.status} /></td>
                  <td>
                    <div className="flex justify-end gap-3 whitespace-nowrap text-[13px] font-semibold">
                      <Link to={`/employer/applicants/${application.applicantId}?jobId=${application.jobId}`} className="text-gray-400 transition hover:text-[#ff6b2c]">Profile</Link>
                      <Link to={`/employer/applicants/${application.applicantId}/resume?jobId=${application.jobId}`} className="text-gray-400 transition hover:text-[#ff6b2c]">CV</Link>
                      <Link to={`/employer/applications/${application.jobId}/${application.applicantId}`} className="text-[#ff6b2c] hover:text-[#ff7d45]">Review →</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && applications.length > 0 && (
        <p className="mt-4 flex items-center gap-2 text-xs text-gray-600">
          <Users size={13} />
          Tip: use Applicants for stage filters, this view stays chronological.
        </p>
      )}
    </EmployerShell>
  );
}
