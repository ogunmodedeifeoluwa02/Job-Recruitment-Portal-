import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  FileCheck2,
  MapPin,
  UserRound,
} from "lucide-react";
import api from "../../Core/Api";
import DashboardNav from "../../Shared/DashboardNav";
import Footer from "../../Shared/Footer";
import Navbar from "../../Shared/Navbar";
import { ErrorState, LoadingSkeleton } from "../../Shared/States";

const STEPS = [
  { icon: UserRound, title: "Your profile", text: "We attach your saved TalentDesk profile." },
  { icon: FileCheck2, title: "One click", text: "No cover letter or extra fields needed." },
  { icon: Clock, title: "Track it", text: "Watch the status under My Applications." },
];

// Full-page apply flow at /jobs/:id/apply (never a modal).
// The backend application endpoint takes no extra fields, so this page
// confirms the job, points at the saved profile, and submits.
function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(null);
  const [loading, setLoading] = useState(() => !!localStorage.getItem("token"));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    async function loadJob() {
      setLoading(true);
      setError("");
      try {
        // Same source as the listings (GET /api/jobs/:id is employer-scoped).
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
        try {
          const applications = await api.getMyApplications();
          setApplied(applications.find((a) => a.jobId === found.id) || null);
        } catch {
          // Applications are optional here; the page still works.
        }
      } catch {
        setError("Job not found.");
      }
      setLoading(false);
    }
    loadJob();
  }, [id]);

  const handleSubmit = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser?.account_type === "Employer") {
      setError("Employer accounts can't apply for jobs.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await api.applyForJob(job.id);
      setApplied({ jobId: job.id, status: "Open" });
    } catch (err) {
      setError(err.message || "Unable to submit your application right now.");
    }
    setSubmitting(false);
  };

  const setActiveTab = (tab) => navigate(`/jobseekerdashboard?tab=${tab}`);
  const expired = job?.deadline ? new Date(job.deadline) <= new Date() : false;
  const closed = job && (expired || job.status !== "Published");

  return (
    <div className="flex min-h-screen flex-col bg-[#151616] font-jakarta text-white">
      {isLoggedIn ? (
        <DashboardNav activeTab="search-jobs" setActiveTab={setActiveTab} />
      ) : (
        <Navbar />
      )}

      <main className="mx-auto w-full max-w-[1080px] flex-1 px-5 py-8">
        <div className="td-animate-in mb-6 flex items-center gap-2 text-[13px] text-gray-500">
          <Link to="/" className="transition hover:text-[#ff6b2c]">
            Jobs
          </Link>
          <span>/</span>
          <Link to={`/jobs/${id}`} className="transition hover:text-[#ff6b2c]">
            Details
          </Link>
          <span>/</span>
          <span className="font-semibold text-white">Apply</span>
        </div>

        <h1 className="td-animate-in font-fraunces text-3xl font-bold tracking-tight sm:text-4xl">
          Apply for this role
        </h1>
        <p className="td-animate-in mt-2 max-w-xl text-sm leading-6 text-[#aaa8a3]">
          Review the role, confirm your profile, and submit — all on this page.
        </p>

        {!isLoggedIn ? (
          <div className="td-card mt-8 p-8 text-center sm:p-12">
            <h2 className="text-xl font-bold text-white">Log in to apply</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
              You need a job seeker account to apply. Log in and you will come
              straight back here to finish.
            </p>
            <Link
              to={`/login?returnTo=${encodeURIComponent(`/jobs/${id}/apply`)}`}
              className="td-btn-primary mt-6"
            >
              Log in to continue
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : loading ? (
          <div className="mt-8">
            <LoadingSkeleton rows={2} />
          </div>
        ) : error && !job ? (
          <div className="mt-8">
            <ErrorState
              message={error}
              onRetry={() => navigate(0)}
            />
          </div>
        ) : (
          job && (
            <div className="td-animate-in mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
              {/* Job summary */}
              <aside className="td-card order-2 p-6 sm:p-7 lg:order-1 lg:sticky lg:top-36">
                <p className="td-eyebrow">{job.category?.name || "General"}</p>
                <h2 className="mt-1 font-fraunces text-2xl font-bold text-white">
                  {job.title}
                </h2>
                <div className="mt-4 space-y-3 text-sm">
                  <p className="flex items-center gap-2.5 text-[#b8b6b0]">
                    <MapPin size={15} className="shrink-0 text-[#ff6b2c]" />
                    {job.location || "—"}
                  </p>
                  {job.employmentType && (
                    <p className="flex items-center gap-2.5 text-[#b8b6b0]">
                      <Briefcase size={15} className="shrink-0 text-[#ff6b2c]" />
                      {job.employmentType}
                    </p>
                  )}
                  <p className="flex items-center gap-2.5 text-[#b8b6b0]">
                    <Clock size={15} className="shrink-0 text-[#ff6b2c]" />
                    Closes{" "}
                    {job.deadline ? new Date(job.deadline).toLocaleDateString() : "—"}
                  </p>
                </div>
                <Link
                  to={`/jobs/${job.id}`}
                  className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-[#ff6b2c] hover:text-[#ff7d45]"
                >
                  <ArrowLeft size={14} />
                  Re-read full details
                </Link>
              </aside>

              {/* Application panel */}
              <section className="td-card order-1 p-6 sm:p-8 lg:order-2">
                {applied ? (
                  <div className="py-4 text-center">
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                      <CheckCircle2 size={30} className="text-green-400" />
                    </span>
                    <h2 className="mt-4 text-xl font-bold text-white">
                      Application sent!
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      Your application for <strong className="text-white">{job.title}</strong>{" "}
                      is in with status <strong className="text-white">{applied.status}</strong>.
                    </p>
                    <div className="mt-6 flex flex-col gap-2">
                      <Link
                        to="/jobseekerdashboard?tab=my-applications"
                        className="td-btn-primary w-full"
                      >
                        View my applications
                      </Link>
                      <Link to="/" className="td-btn-ghost w-full">
                        Browse more jobs
                      </Link>
                    </div>
                  </div>
                ) : closed ? (
                  <p role="status" className="py-8 text-center text-sm text-gray-400">
                    This posting is no longer accepting applications.
                  </p>
                ) : (
                  <>
                    <h2 className="text-lg font-bold text-white">How applying works</h2>
                    <div className="mt-5 space-y-4">
                      {STEPS.map(({ icon: Icon, title, text }, i) => (
                        <div key={title} className="flex gap-3.5">
                          <div className="flex flex-col items-center">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff6b2c]/10 text-[#ff6b2c]">
                              <Icon size={16} />
                            </span>
                            {i < STEPS.length - 1 && (
                              <span className="mt-1 w-px flex-1 bg-white/10" />
                            )}
                          </div>
                          <div className="pb-1">
                            <p className="text-sm font-bold text-white">{title}</p>
                            <p className="mt-0.5 text-[13px] leading-5 text-gray-400">{text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-[13px] leading-5 text-gray-400">
                      Employers see exactly what you saved in your profile.{" "}
                      <Link
                        to="/jobseekerdashboard?tab=my-profile"
                        className="font-semibold text-[#ff6b2c] hover:text-[#ff7d45]"
                      >
                        Review your profile
                      </Link>{" "}
                      before submitting.
                    </div>

                    {error && (
                      <p role="alert" className="mt-4 text-sm text-red-400">
                        {error}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="td-btn-primary mt-6 w-full !py-3.5"
                    >
                      {submitting ? "Submitting…" : "Submit application"}
                      {!submitting && <ArrowRight size={15} />}
                    </button>
                  </>
                )}
              </section>
            </div>
          )
        )}
      </main>

      <Footer minimal />
    </div>
  );
}

export default ApplyJob;
