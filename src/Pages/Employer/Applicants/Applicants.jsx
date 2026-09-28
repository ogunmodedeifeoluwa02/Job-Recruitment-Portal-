import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Users } from 'lucide-react';
import api from '../../../Core/Api';
import PageHeader from '../../../Shared/PageHeader';
import StatusBadge from '../../../Shared/StatusBadge';
import { Avatar, EmptyState, ErrorState, LoadingSkeleton } from '../../../Shared/States';
import EmployerShell from '../components/EmployerShell';

const FILTERS = ['all', 'Open', 'Reviewed', 'Interviewing', 'Hired', 'Rejected'];

export default function Applicants() {
  const [filter, setFilter] = useState('all');
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let active = true;
    api.getApplications().then(
      (data) => {
        if (!active) return;
        setApplicants(data || []);
        setLoading(false);
      },
      () => {
        if (!active) return;
        setError('Unable to load applicants right now.');
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

  const filteredApplicants = filter === 'all'
    ? applicants
    : applicants.filter(applicant => applicant.status === filter);

  return (
    <EmployerShell activeTab="applicants">
      <PageHeader
        eyebrow="Pipeline"
        title="Applicants"
        description={`${applicants.length} candidate${applicants.length === 1 ? '' : 's'} across your postings. Filter by stage, then open a profile.`}
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
        <LoadingSkeleton rows={4} />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : filteredApplicants.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No applicants here"
          hint={filter === 'all' ? 'Applications will appear here once candidates apply to your postings.' : 'No candidates at this stage right now.'}
        />
      ) : (
        <div className="td-table-wrap">
          <table className="td-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Role</th>
                <th>Applied</th>
                <th>Status</th>
                <th className="!text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((application) => (
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
    </EmployerShell>
  );
}
