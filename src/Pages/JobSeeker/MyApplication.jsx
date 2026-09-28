import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  Search,
} from "lucide-react";
import api from "../../Core/Api";
import Footer from "../../Shared/Footer";
import PageHeader from "../../Shared/PageHeader";
import StatusBadge from "../../Shared/StatusBadge";
import { EmptyState, ErrorState, LoadingSkeleton } from "../../Shared/States";

function getProgress(status) {
  const s = status?.toLowerCase();
  if (s === "accepted" || s === "offer" || s === "hired") return 4;
  if (s === "interview" || s === "interview scheduled" || s === "interviewing") return 3;
  if (s === "under review" || s === "review" || s === "reviewed") return 2;
  return 1;
}

const STAGES = ["Applied", "Under review", "Interview", "Decision"];

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let active = true;
    api.getMyApplications().then(
      (data) => {
        if (!active) return;
        setApplications(data || []);
        setLoading(false);
      },
      () => {
        if (!active) return;
        setError("Unable to load your applications right now.");
        setLoading(false);
      },
    );
    return () => {
      active = false;
    };
  }, [refresh]);

  const retry = () => {
    setLoading(true);
    setError("");
    setRefresh((r) => r + 1);
  };

  const inReviewCount = applications.filter((a) =>
    ["under review", "review", "reviewed"].includes(a.status?.toLowerCase()),
  ).length;
  const interviewCount = applications.filter((a) =>
    ["interview", "interview scheduled", "interviewing"].includes(a.status?.toLowerCase()),
  ).length;

  const stats = [
    { icon: BriefcaseBusiness, label: "Applied", value: applications.length, hint: "Total applications" },
    { icon: Clock3, label: "In review", value: inReviewCount, hint: "Being reviewed" },
    { icon: CheckCircle2, label: "Interviews", value: interviewCount, hint: "Interview stage" },
  ];

  return (
    <div className="font-jakarta text-white">
      <main className="mx-auto w-full max-w-[1260px] px-5 py-8">
        <PageHeader
          eyebrow="Job seeker"
          title="My applications"
          description="Track every application from submission to decision."
          actions={
            <span className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-[#aaa8a3]">
              <BriefcaseBusiness size={14} className="text-[#ff6b2c]" />
              {applications.length} total
            </span>
          }
        />

        {loading ? (
          <LoadingSkeleton rows={3} />
        ) : error && applications.length === 0 ? (
          <ErrorState message={error} onRetry={retry} />
        ) : (
          <>
            <div className="td-stagger mb-8 grid gap-4 sm:grid-cols-3">
              {stats.map(({ icon: Icon, label, value, hint }) => (
                <div key={label} className="td-card group p-5 transition hover:border-[#ff6b2c]/30">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#aaa8a3]">
                      {label}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff6b2c]/10 text-[#ff6b2c] transition group-hover:bg-[#ff6b2c] group-hover:text-[#151616]">
                      <Icon size={18} />
                    </span>
                  </div>
                  <p className="font-fraunces text-4xl font-bold text-white">{value}</p>
                  <p className="mt-1 text-xs text-gray-500">{hint}</p>
                </div>
              ))}
            </div>

            {applications.length === 0 ? (
              <EmptyState
                icon={Search}
                title="No applications yet"
                hint="You haven't applied to any jobs yet. Find a role that matches your skills."
                actionTo="/"
                actionLabel="Browse jobs"
              />
            ) : (
              <div className="td-stagger space-y-4">
                {applications.map((application) => {
                  const progress = getProgress(application.status);
                  return (
                    <article
                      key={`${application.jobId}-${application.applicantId}`}
                      className="td-card p-5 transition hover:border-white/20 sm:p-6"
                    >
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                        <div className="min-w-0">
                          <p className="td-eyebrow">Job application</p>
                          {application.jobId ? (
                            <Link
                              to={`/jobs/${application.jobId}`}
                              className="mt-1 block truncate text-lg font-bold text-white transition hover:text-[#ff6b2c] sm:text-xl"
                            >
                              {application.jobTitle}
                            </Link>
                          ) : (
                            <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">
                              {application.jobTitle}
                            </h3>
                          )}
                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#aaa8a3]">
                            <span className="flex items-center gap-1.5">
                              <CalendarDays size={14} />
                              Applied {new Date(application.appliedAtUtc).toLocaleDateString()}
                            </span>
                            {application.updatedAtUtc && (
                              <span className="flex items-center gap-1.5">
                                <Clock3 size={14} />
                                Updated {new Date(application.updatedAtUtc).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <StatusBadge status={application.status} className="shrink-0" />
                      </div>

                      <div className="my-6 border-t border-white/5" />

                      <div>
                        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#aaa8a3]">
                          Application progress
                        </p>
                        <div className="grid grid-cols-4">
                          {STAGES.map((stage, i) => {
                            const done = progress >= i + 1;
                            const last = i === STAGES.length - 1;
                            return (
                              <div key={stage}>
                                <div className="flex items-center">
                                  <div
                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                                      done
                                        ? "bg-[#ff6b2c] text-[#151616]"
                                        : "border border-white/20 text-gray-600"
                                    }`}
                                  >
                                    {done ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                                  </div>
                                  {!last && (
                                    <div className={`h-[2px] flex-1 ${progress >= i + 2 ? "bg-[#ff6b2c]" : "bg-white/10"}`} />
                                  )}
                                </div>
                                <p className={`mt-2 pr-2 text-[11px] font-semibold ${done ? "text-white" : "text-gray-600"}`}>
                                  {stage}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
      <Footer minimal />
    </div>
  );
}

export default MyApplications;
