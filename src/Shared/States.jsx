import { Link } from "react-router";
import { AlertTriangle, Inbox, RotateCcw } from "lucide-react";

function initials(name) {
  if (!name) return "?";
  const parts = String(name).trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Initials avatar used across seeker + employer views.
export function Avatar({ name, className = "h-9 w-9 text-[11px]" }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff6b2c] to-[#8a3a12] font-bold text-white ${className}`}
    >
      {initials(name)}
    </div>
  );
}

// Shimmer rows for lists/cards while data loads.
export function LoadingSkeleton({ rows = 3 }) {
  return (
    <div aria-busy="true" aria-label="Loading" className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="td-card overflow-hidden p-5">
          <div className="td-shimmer h-4 w-1/3 rounded" />
          <div className="td-shimmer mt-3 h-6 w-2/3 rounded" />
          <div className="td-shimmer mt-3 h-3 w-full rounded" />
          <div className="td-shimmer mt-2 h-3 w-5/6 rounded" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ icon, title, hint, actionTo, actionLabel }) {
  const Icon = icon || Inbox;
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff6b2c]/10">
        <Icon size={26} strokeWidth={1.8} className="text-[#ff6b2c]" />
      </div>
      <h3 className="text-base font-bold text-white">{title}</h3>
      {hint && (
        <p className="mt-2 max-w-sm text-sm leading-6 text-[#aaa8a3]">{hint}</p>
      )}
      {actionTo && actionLabel && (
        <Link to={actionTo} className="td-btn-primary mt-6">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-12 text-center"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10">
        <AlertTriangle size={22} className="text-red-400" />
      </div>
      <h3 className="text-base font-bold text-white">Something went wrong</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-400">
        {message || "Unable to load this information right now."}
      </p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="td-btn-ghost mt-6">
          <RotateCcw size={14} />
          Try again
        </button>
      )}
    </div>
  );
}
