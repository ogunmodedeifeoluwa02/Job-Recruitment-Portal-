import { Link } from "react-router";
import { ArrowRight, Briefcase, Clock, MapPin, TrendingUp, Wallet } from "lucide-react";
import StatusBadge from "../../Shared/StatusBadge";

function formatEmploymentType(value) {
  if (!value) return null;
  if (value === "FullTime") return "Full-time";
  if (value === "PartTime") return "Part-time";
  return value;
}

function monogram(name) {
  const words = String(name || "General").trim().split(/\s+/);
  return ((words[0]?.[0] || "G") + (words[1]?.[0] || "")).toUpperCase();
}

// Premium job card. One consistent action: VIEW & APPLY → full details page.
function JobCard({ job, application }) {
  const category = job.category?.name || "General";
  const employmentType = formatEmploymentType(job.employmentType);

  return (
    <article className="td-card group p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#ff6b2c]/40 hover:shadow-[0_12px_40px_-12px_rgba(255,107,44,0.25)] sm:p-6">
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff6b2c]/25 to-[#ff6b2c]/5 text-sm font-bold text-[#ff6b2c]"
        >
          {monogram(category)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="td-eyebrow">{category}</p>
          <h3 className="mt-1 font-fraunces text-xl font-bold leading-snug text-white">
            <Link
              to={`/jobs/${job.id}`}
              className="transition group-hover:text-[#ff6b2c]"
            >
              {job.title}
            </Link>
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-[#aaa8a3]">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gray-500" />
              {job.location || "—"}
            </span>
            {employmentType && (
              <span className="flex items-center gap-1.5">
                <Briefcase size={14} className="text-gray-500" />
                {employmentType}
              </span>
            )}
            {job.experienceLevel && (
              <span className="flex items-center gap-1.5">
                <TrendingUp size={14} className="text-gray-500" />
                {job.experienceLevel}
              </span>
            )}
            {job.salary != null && (
              <span className="flex items-center gap-1.5">
                <Wallet size={14} className="text-gray-500" />
                {Number(job.salary).toLocaleString()}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-gray-500" />
              Closes {job.deadline ? new Date(job.deadline).toLocaleDateString() : "—"}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#b8b6b0]">
        {job.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
        <div className="flex items-center gap-3">
          <Link to={`/jobs/${job.id}`} className="td-btn-primary">
            View & Apply
            <ArrowRight size={14} />
          </Link>
          {application && <StatusBadge status={application.status} />}
        </div>
        {job.status && <StatusBadge status={job.status} />}
      </div>
    </article>
  );
}

export default JobCard;
