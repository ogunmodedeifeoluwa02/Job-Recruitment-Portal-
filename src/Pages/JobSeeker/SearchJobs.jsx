import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import api from "../../Core/Api";
import JobCard from "./JobCard";

function SearchJobs() {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({
    Search: "",
    CategoryId: "",
    EmploymentType: "",
    ExperienceLevel: "",
  });
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(0);
  const dialog = useRef(null);

  useEffect(() => {
    async function loadData() {
      try {
        const categories = await api.getCategories();
        setCategories(categories);
        const applications = await api.getMyApplications();
        setApplications(applications);
      } catch (error) {
        setError(error.message);
      }
    }
    loadData();
  }, [refresh]);

  useEffect(() => {
    async function getJobs() {
      try {
        const params = new URLSearchParams(query);
        params.set("Page", page);
        params.set("PageSize", 6);
        const data = await api.searchJobs(params.toString());
        setJobs(data.items);
        setTotal(data.totalItems);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
    getJobs();
  }, [query, page, refresh]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.Search) params.set("Search", filters.Search);
    if (filters.CategoryId) params.set("CategoryId", filters.CategoryId);
    if (filters.EmploymentType)
      params.set("EmploymentType", filters.EmploymentType);
    if (filters.ExperienceLevel)
      params.set("ExperienceLevel", filters.ExperienceLevel);
    setLoading(true);
    setError("");
    setPage(1);
    setQuery(params.toString());
    setRefresh(refresh + 1);
  };

  const handleView = (job) => {
    setSelectedJob(job);
    setApplyError("");
    setMessage("");
    dialog.current.showModal();
  };

  const handleApply = async () => {
    setApplying(true);
    setApplyError("");
    try {
      await api.applyForJob(selectedJob.id);
      setApplications([
        ...applications,
        { jobId: selectedJob.id, status: "Open" },
      ]);
      setMessage("Application sent successfully!");
    } catch (err) {
      setApplyError(err.message);
    }
    setApplying(false);
  };

  const inputStyle =
    "w-full rounded-xl border border-white/10 bg-[#202223] px-3 py-3 text-xs text-white";
  let applied = false;
  if (selectedJob) {
    applied = applications.find(
      (application) => application.jobId === selectedJob.id,
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1260px] px-5 py-8 text-white">
      <div className="mb-5 rounded-2xl border border-white/10 bg-[#202223] p-4 text-sm text-gray-300">
        Active postings only — find a job and send your application.
      </div>
      <form
        onSubmit={handleSearch}
        className="mb-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
      >
        <input
          aria-label="Search jobs"
          placeholder="Keyword (title, description)"
          value={filters.Search}
          onChange={(e) => setFilters({ ...filters, Search: e.target.value })}
          maxLength={200}
          className={inputStyle}
        />
        <select
          aria-label="Category"
          value={filters.CategoryId}
          onChange={(e) =>
            setFilters({ ...filters, CategoryId: e.target.value })
          }
          className={inputStyle}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          aria-label="Employment type"
          value={filters.EmploymentType}
          onChange={(e) =>
            setFilters({ ...filters, EmploymentType: e.target.value })
          }
          className={inputStyle}
        >
          <option value="">All employment types</option>
          <option value="FullTime">Full-time</option>
          <option value="PartTime">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
        <select
          aria-label="Experience level"
          value={filters.ExperienceLevel}
          onChange={(e) =>
            setFilters({ ...filters, ExperienceLevel: e.target.value })
          }
          className={inputStyle}
        >
          <option value="">All experience levels</option>
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
        <button
          disabled={loading}
          className="rounded-lg bg-[#ff6b2c] px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
        >
          Search Jobs
        </button>
      </form>
      {error && (
        <p role="alert" className="mb-4 text-sm text-red-400">
          {error}
        </p>
      )}
      <h2 className="mb-3 text-xs font-bold tracking-widest text-[#9ebcff]">
        OPEN POSITIONS · {total}
      </h2>
      {loading ? (
        <p className="py-10 text-gray-400">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <div className="py-14 text-center text-gray-400">
          <Search className="mx-auto mb-4" />
          <p>No jobs found. Try a different search.</p>
        </div>
      ) : (
        jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            application={applications.find(
              (application) => application.jobId === job.id,
            )}
            onView={handleView}
          />
        ))
      )}
      {totalPages > 0 && (
        <div className="mt-6 flex items-center justify-center gap-4 text-sm">
          <button
            disabled={page <= 1 || loading}
            onClick={() => {
              setLoading(true);
              setError("");
              setPage(page - 1);
            }}
            className="rounded border border-white/20 px-3 py-2 disabled:opacity-30"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages || loading}
            onClick={() => {
              setLoading(true);
              setError("");
              setPage(page + 1);
            }}
            className="rounded border border-white/20 px-3 py-2 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}

      <dialog
        ref={dialog}
        aria-labelledby="job-title"
        className="fixed inset-0 m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-[650px] overflow-y-auto rounded-2xl border border-white/20 bg-[#202223] p-6 text-white backdrop:bg-black/70"
      >
        {selectedJob && (
          <>
            <h2 id="job-title" className="text-xl font-semibold">
              {selectedJob.title}
            </h2>
            <p className="my-3 text-sm text-gray-400">
              {selectedJob.location} · {selectedJob.employmentType} ·{" "}
              {selectedJob.experienceLevel}
            </p>
            <p className="text-xs text-gray-400">
              Closes {new Date(selectedJob.deadline).toLocaleDateString()}
            </p>
            <h3 className="mt-5 mb-2 font-semibold">Role</h3>
            <p className="whitespace-pre-wrap text-sm text-gray-300">
              {selectedJob.description}
            </p>
            <h3 className="mt-5 mb-2 font-semibold">Requirements</h3>
            <p className="whitespace-pre-wrap text-sm text-gray-300">
              {selectedJob.requirements}
            </p>
            {applyError && (
              <p role="alert" className="mt-4 text-sm text-red-400">
                {applyError}
              </p>
            )}
            {message && (
              <p role="status" className="mt-4 text-sm text-green-400">
                {message}
              </p>
            )}
            {applied && (
              <p className="mt-4 text-sm text-[#9ebcff]">
                Application status: {applied.status}
              </p>
            )}
            <p className="mt-4 text-xs text-gray-400">
              Check your{" "}
              <Link
                onClick={() => dialog.current.close()}
                to="/jobseekerdashboard?tab=my-profile"
                className="text-[#ff6b2c] underline"
              >
                profile
              </Link>{" "}
              before applying.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => dialog.current.close()}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm"
              >
                Close
              </button>
              <button
                onClick={handleApply}
                disabled={
                  applying ||
                  !!applied ||
                  selectedJob.status !== "Published" ||
                  new Date(selectedJob.deadline) <= new Date()
                }
                className="rounded-xl bg-[#ff6b2c] px-4 py-2 text-sm font-semibold text-black disabled:opacity-40"
              >
                {applying ? "Applying..." : applied ? "Applied" : "Apply now"}
              </button>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}

export default SearchJobs;
