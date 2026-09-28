import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  CalendarDays,
  Clock,
  MapPin,
  TrendingUp,
  Wallet,
} from "lucide-react";
import api from "../../Core/Api";
import DashboardNav from "../../Shared/DashboardNav";
import Footer from "../../Shared/Footer";
import Navbar from "../../Shared/Navbar";
import StatusBadge from "../../Shared/StatusBadge";
import { ErrorState, LoadingSkeleton } from "../../Shared/States";

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Full job details page: identity header → about/requirements → sticky apply rail.
function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(null);
  // Discovery is public; only per-user application status needs a token.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJob() {
      setLoading(true);
      setError("");
      try {
        // NOTE: GET /api/jobs/:id only returns jobs owned by the
        // authenticated employer, so job seekers load the job from the
        // published-jobs search instead (same source as the listings).
        let found = null;
        try {
          const params = new URLSearchParams({ Page: 1, PageSize: 100 });
          const data = await api.searchJobs(params.toString());
          found = (data.items || []).find((j) => String(j.id) === String(id)) || null;
        } catch {
          found = null;
        }
        if (!found) {
          found = await api.getJob(id);
        }
        setJob(found);
        setLoading(false);
        // Skip quietly without a token (it would 401-redirect).
        if (!localStorage.getItem("token")) return;
        try {
          const applications = await api.getMyApplications();
          setApplied(applications.find((a) => a.jobId === found.id) || null);
        } catch {
          // Applications are optional here; job display still works.
        }
      } catch {
        setError("Job not found.");
        setLoading(false);
      }
    }
    loadJob();
  }, [id]);

  const setActiveTab = (tab) => navigate(`/jobseekerdashboard?tab=${tab}`);
  const expired = job?.deadline ? new Date(job.deadline) <= new Date() : false;
  const category = job?.category?.name || "General";

  const facts = job
    ? [
        { icon: Building2, label: "Field", value: category },
        { icon: MapPin, label: "Location", value: job.location || "—" },
        { icon: Briefcase, label: "Employment", value: job.employmentType || "—" },
        { icon: TrendingUp, label: "Experience", value: job.experienceLevel || "—" },
        {
          icon: Wallet,
          label: "Salary",
          value: job.salary != null ? Number(job.salary).toLocaleString() : "—",
        },
        { icon: CalendarDays, label: "Posted", value: formatDate(job.createdAtUtc) },
        { icon: Clock, label: "Closes", value: formatDate(job.deadline) },
      ]
    : [];

  return (
    <div className="flex min-h-screen flex-col bg-[#151616] font-jakarta text-white">
      {isLoggedIn ? (
        <DashboardNav activeTab="search-jobs" setActiveTab={setActiveTab} />
      ) : (
        <Navbar />
      )}

      <main className="mx-auto w-full max-w-[1080px] flex-1 px-5 py-8">
        <Link
          to="/"
          className="td-animate-in flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[13px] font-semibold text-gray-400 transition hover:border-[#ff6b2c]/50 hover:text-[#ff6b2c]"
        >
          <ArrowLeft size={14} />
          Back to jobs
        </Link>

        {loading ? (
          <div className="mt-6">
            <LoadingSkeleton rows={2} />
          </div>
        ) : error || !job ? (
          <div className="mt-6">
            <ErrorState
              message={error || "This job could not be found."}
              onRetry={() => navigate(0)}
            />
          </div>
        ) : (
          <div className="td-animate-in mt-6">
            {/* Identity header */}
            <div className="td-glow td-card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
              <div
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-[#ff6b2c] to-[#8a3a12] text-xl font-bold text-white shadow-[0_10px_30px_-8px_rgba(255,107,44,0.5)]"
              >
                {category.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="td-eyebrow">{category}</p>
                <h1 className="mt-1 font-fraunces text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {job.title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <StatusBadge status={job.status} />
                  {applied && <StatusBadge status={applied.status} />}
                  {expired && <StatusBadge status="Closed" />}
                </div>
              </div>
            </div>

            <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              {/* Main column */}
              <div className="min-w-0 space-y-6">
                <section className="td-card p-6 sm:p-8">
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b2c]">
                    About this role
                  </h2>
                  <p className="mt-4 whitespace-pre-wrap text-[15px] leading-7 text-[#d6d3cb]">
                    {job.description}
                  </p>
                </section>

                {job.requirements && (
                  <section className="td-card p-6 sm:p-8">
                    <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b2c]">
                      What you bring
                    </h2>
                    <p className="mt-4 whitespace-pre-wrap text-[15px] leading-7 text-[#d6d3cb]">
                      {job.requirements}
                    </p>
                  </section>
                )}
              </div>

              {/* Sticky rail */}
              <aside className="space-y-4 lg:sticky lg:top-36">
                <div className="td-card p-6">
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                    At a glance
                  </h2>
                  <dl className="mt-4 space-y-3.5">
                    {facts.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center gap-3 text-sm">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#ff6b2c]">
                          <Icon size={15} />
                        </span>
                        <div className="min-w-0">
                          <dt className="text-[11px] uppercase tracking-wider text-gray-500">
                            {label}
                          </dt>
                          <dd className="truncate font-semibold text-white">{value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="td-card border-[#ff6b2c]/25 bg-gradient-to-b from-[#ff6b2c]/10 to-transparent p-6 text-center">
                  {applied ? (
                    <>
                      <p className="text-sm font-bold text-white">Already applied</p>
                      <p className="mt-1 text-xs text-gray-400">
                        Status: {applied.status}
                      </p>
                      <Link
                        to="/jobseekerdashboard?tab=my-applications"
                        className="td-btn-ghost mt-4 w-full"
                      >
                        Track application
                      </Link>
                    </>
                  ) : expired || job.status !== "Published" ? (
                    <p className="text-sm text-gray-400">
                      This posting is no longer accepting applications.
                    </p>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-white">
                        Interested in this role?
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-400">
                        Takes under a minute with your saved profile.
                      </p>
                      <Link to={`/jobs/${job.id}/apply`} className="td-btn-primary mt-4 w-full">
                        Apply now
                        <ArrowRight size={14} />
                      </Link>
                    </>
                  )}
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>

      <Footer minimal />
    </div>
  );
}

export default JobDetails;
