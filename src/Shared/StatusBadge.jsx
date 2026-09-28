const STYLES = {
  Open: "td-status-open border-[#ff6b2c]/30 bg-[#ff6b2c]/10",
  Published: "border-green-500/30 bg-green-500/10 text-green-400",
  Reviewed: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  Interviewing: "border-sky-500/30 bg-sky-500/10 text-sky-400",
  Hired: "border-green-500/30 bg-green-500/10 text-green-400",
  Rejected: "border-red-500/30 bg-red-500/10 text-red-400",
  Withdrawn: "border-white/15 bg-white/5 text-gray-400",
  Draft: "border-white/15 bg-white/5 text-gray-400",
  Closed: "border-white/15 bg-white/5 text-gray-500",
};

// Single source of truth for every status pill in the app (seeker + employer).
function StatusBadge({ status, className = "" }) {
  const label = status || "—";
  const style = STYLES[status] || "border-white/15 bg-white/5 text-gray-400";
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${style} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

export default StatusBadge;
