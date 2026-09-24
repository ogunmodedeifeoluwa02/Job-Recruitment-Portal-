import { useEffect, useState } from "react";
import api from "../../Core/Api";
import {
  Search,
  CalendarDays,
  Clock3,
  BriefcaseBusiness,
  CheckCircle2,
  Circle,
} from "lucide-react";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getApplications() {
      try {
        const data = await api.getMyApplications();
        console.log("Applications loaded:", data.length);
        setApplications(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }

    getApplications();
  }, []);

  // Count applications by status
  const inReviewCount = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "under review" ||
      application.status?.toLowerCase() === "review"
  ).length;

  const interviewCount = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "interview" ||
      application.status?.toLowerCase() === "interview scheduled"
  ).length;

  // Get status style
  function getStatusStyle(status) {
    const currentStatus = status?.toLowerCase();

    if (
      currentStatus === "interview" ||
      currentStatus === "interview scheduled"
    ) {
      return "border-green-500/30 bg-green-500/10 text-green-400";
    }

    if (
      currentStatus === "under review" ||
      currentStatus === "review"
    ) {
      return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";
    }

    if (
      currentStatus === "rejected" ||
      currentStatus === "declined"
    ) {
      return "border-red-500/30 bg-red-500/10 text-red-400";
    }

    if (
      currentStatus === "accepted" ||
      currentStatus === "offer"
    ) {
      return "border-green-500/30 bg-green-500/10 text-green-400";
    }

    return "border-[#ff6b2c]/30 bg-[#ff6b2c]/10 text-[#ff6b2c]";
  }

  // Check application progress
  function getProgress(status) {
    const currentStatus = status?.toLowerCase();

    if (
      currentStatus === "accepted" ||
      currentStatus === "offer"
    ) {
      return 4;
    }

    if (
      currentStatus === "interview" ||
      currentStatus === "interview scheduled"
    ) {
      return 3;
    }

    if (
      currentStatus === "under review" ||
      currentStatus === "review"
    ) {
      return 2;
    }

    return 1;
  }

  return (
    <div className="text-white">

      {/* ================= PAGE CONTENT ================= */}
      <main className="mx-auto min-h-[520px] w-full max-w-[1260px] px-5 py-10">

        {/* ================= PAGE HEADER ================= */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[#ff6b2c]">
            Job Seeker
          </p>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                My Applications
              </h2>

              <p className="mt-2 max-w-xl text-sm text-[#aaa8a3]">
                Track your applications and follow your progress from
                application to decision.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#aaa8a3]">
              <BriefcaseBusiness size={15} />
              <span>{applications.length} total applications</span>
            </div>
          </div>
        </div>


        {/* ================= APPLICATION STATS ================= */}
        {!loading && !error && (
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

            {/* Applied */}
            <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-[#aaa8a3]">
                  Applied
                </span>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff6b2c]/10 text-[#ff6b2c]">
                  <BriefcaseBusiness size={18} />
                </div>
              </div>

              <p className="text-3xl font-semibold text-white">
                {applications.length}
              </p>

              <p className="mt-1 text-xs text-[#777772]">
                Total applications
              </p>
            </div>


            {/* In Review */}
            <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-[#aaa8a3]">
                  In Review
                </span>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-400">
                  <Clock3 size={18} />
                </div>
              </div>

              <p className="text-3xl font-semibold text-white">
                {inReviewCount}
              </p>

              <p className="mt-1 text-xs text-[#777772]">
                Being reviewed
              </p>
            </div>


            {/* Interviews */}
            <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-[#aaa8a3]">
                  Interviews
                </span>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                  <CheckCircle2 size={18} />
                </div>
              </div>

              <p className="text-3xl font-semibold text-white">
                {interviewCount}
              </p>

              <p className="mt-1 text-xs text-[#777772]">
                Interview stage
              </p>
            </div>

          </div>
        )}


        {/* ================= APPLICATIONS HEADER ================= */}
        {!loading && !error && applications.length > 0 && (
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
                Your Applications
              </h3>

              <p className="mt-1 text-xs text-[#777772]">
                Keep track of where each application stands.
              </p>
            </div>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[#aaa8a3]">
              {applications.length}{" "}
              {applications.length === 1 ? "application" : "applications"}
            </span>
          </div>
        )}


        {/* ================= LOADING ================= */}
        {loading && (
          <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-8 text-center">
            <p className="text-sm text-[#aaa8a3]">
              Loading applications...
            </p>
          </div>
        )}


        {/* ================= ERROR ================= */}
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-400"
          >
            {error}
          </div>
        )}


        {/* ================= APPLICATION CARDS ================= */}
        {!loading &&
          !error &&
          applications.map((application) => {
            const progress = getProgress(application.status);

            return (
              <div
                key={`${application.jobId}-${application.applicantId}`}
                className="mb-4 rounded-xl border border-white/10 bg-[#1b1d1e] p-5 transition duration-200 hover:border-white/20 sm:p-6"
              >

                {/* Top section */}
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">

                  <div>
                    <p className="mb-2 text-xs text-[#777772]">
                      Job Application
                    </p>

                    <h3 className="text-lg font-semibold text-white sm:text-xl">
                      {application.jobTitle}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#aaa8a3]">

                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        Applied{" "}
                        {new Date(
                          application.appliedAtUtc
                        ).toLocaleDateString()}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Clock3 size={14} />
                        Updated{" "}
                        {new Date(
                          application.updatedAtUtc
                        ).toLocaleDateString()}
                      </span>

                    </div>
                  </div>


                  {/* Status */}
                  <span
                    className={`w-fit rounded-full border px-3 py-1.5 text-xs font-medium ${getStatusStyle(
                      application.status
                    )}`}
                  >
                    <span className="mr-1.5">●</span>
                    {application.status}
                  </span>

                </div>


                {/* Divider */}
                <div className="my-6 border-t border-white/10" />


                {/* Application Progress */}
                <div>
                  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#aaa8a3]">
                    Application Progress
                  </p>


                  <div className="grid grid-cols-4">

                    {/* Applied */}
                    <div className="relative">
                      <div className="flex items-center">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full ${
                            progress >= 1
                              ? "bg-[#ff6b2c] text-[#151616]"
                              : "border border-white/20 text-[#777772]"
                          }`}
                        >
                          {progress >= 1 ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            <Circle size={16} />
                          )}
                        </div>

                        <div
                          className={`h-[2px] flex-1 ${
                            progress >= 2
                              ? "bg-[#ff6b2c]"
                              : "bg-white/10"
                          }`}
                        />
                      </div>

                      <p className="mt-2 text-[11px] font-medium text-[#aaa8a3]">
                        Applied
                      </p>
                    </div>


                    {/* Review */}
                    <div className="relative">
                      <div className="flex items-center">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full ${
                            progress >= 2
                              ? "bg-[#ff6b2c] text-[#151616]"
                              : "border border-white/20 text-[#777772]"
                          }`}
                        >
                          {progress >= 2 ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            <Circle size={16} />
                          )}
                        </div>

                        <div
                          className={`h-[2px] flex-1 ${
                            progress >= 3
                              ? "bg-[#ff6b2c]"
                              : "bg-white/10"
                          }`}
                        />
                      </div>

                      <p className="mt-2 text-[11px] font-medium text-[#aaa8a3]">
                        Under Review
                      </p>
                    </div>


                    {/* Interview */}
                    <div className="relative">
                      <div className="flex items-center">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full ${
                            progress >= 3
                              ? "bg-[#ff6b2c] text-[#151616]"
                              : "border border-white/20 text-[#777772]"
                          }`}
                        >
                          {progress >= 3 ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            <Circle size={16} />
                          )}
                        </div>

                        <div
                          className={`h-[2px] flex-1 ${
                            progress >= 4
                              ? "bg-[#ff6b2c]"
                              : "bg-white/10"
                          }`}
                        />
                      </div>

                      <p className="mt-2 text-[11px] font-medium text-[#aaa8a3]">
                        Interview
                      </p>
                    </div>


                    {/* Decision */}
                    <div>
                      <div className="flex items-center">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full ${
                            progress >= 4
                              ? "bg-[#ff6b2c] text-[#151616]"
                              : "border border-white/20 text-[#777772]"
                          }`}
                        >
                          {progress >= 4 ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            <Circle size={16} />
                          )}
                        </div>
                      </div>

                      <p className="mt-2 text-[11px] font-medium text-[#aaa8a3]">
                        Decision
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}


        {/* ================= EMPTY STATE ================= */}
        {!loading && !error && applications.length === 0 && (
          <div className="flex min-h-[330px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#1b1d1e]/50 px-5 text-center">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff6b2c]/10">
              <Search
                size={26}
                strokeWidth={1.8}
                className="text-[#ff6b2c]"
              />
            </div>

            <h3 className="mb-2 text-base font-semibold text-white">
              No applications yet
            </h3>

            <p className="max-w-sm text-sm leading-6 text-[#aaa8a3]">
              You haven't applied to any jobs yet. Find a role that
              matches your skills and submit your first application.
            </p>

          </div>
        )}

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="mx-auto w-full max-w-[1260px] border-t border-[#303130] px-5 py-6">

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">

          <span className="font-semibold text-white">
            TalentDesk
          </span>

          <span className="text-[#aaa8a3]">
            The hiring workspace with a clear next step.
          </span>

          <span className="text-[#aaa8a3]">
            Domain · Application · Infrastructure · API
          </span>

        </div>

      </footer>

    </div>
  );
}

export default MyApplications;