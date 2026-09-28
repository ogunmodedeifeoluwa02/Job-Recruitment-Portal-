import { Link } from 'react-router';
import { ArrowLeft, CalendarClock } from 'lucide-react';
import EmployerShell from '../components/EmployerShell';

export default function ScheduleInterview() {
  return (
    <EmployerShell activeTab="interviews">
      <Link
        to="/employer/interviews"
        className="flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[13px] font-semibold text-gray-400 transition hover:border-[#ff6b2c]/50 hover:text-[#ff6b2c]"
      >
        <ArrowLeft size={14} />
        Back to interviews
      </Link>

      <div className="td-card td-animate-in mx-auto mt-6 max-w-[640px] p-8 text-center sm:p-12">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#ff6b2c]/10 text-[#ff6b2c]">
          <CalendarClock size={28} strokeWidth={1.6} />
        </span>
        <h1 className="mt-4 font-fraunces text-2xl font-bold text-white">Interview scheduling</h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
          Scheduling inside TalentDesk is not available yet. Move candidates to
          the Interviewing stage from the Applicants page for now.
        </p>
        <Link to="/employer/applicants" className="td-btn-primary mt-6">
          Go to applicants →
        </Link>
      </div>
    </EmployerShell>
  );
}
