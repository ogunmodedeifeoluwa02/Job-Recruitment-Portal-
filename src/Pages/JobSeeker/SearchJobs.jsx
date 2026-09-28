import { RotateCcw, Search, SearchX, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../Core/Api";
import Footer from "../../Shared/Footer";
import { EmptyState, ErrorState, LoadingSkeleton } from "../../Shared/States";
import JobCard from "./JobCard";

const EMPLOYMENT_TYPES = ["FullTime", "PartTime", "Contract", "Internship"];
const EXPERIENCE_LEVELS = ["Entry", "Mid", "Senior"];

function SearchJobs() {
  // Discovery is public: listings + categories load for everyone.
  // Only per-user data (my applications) needs a token.
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
  // No token → no fetch (backend 401s), so start out of the loading state.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedCategories = await api.getCategories();
        setCategories(fetchedCategories);
      } catch {
        setError("Unable to load filters right now.");
      }
      // Per-user applications still need login; skip quietly without one
      // (calling it logged-out would trigger a 401 redirect).
      if (!localStorage.getItem("token")) return;
      try {
        const fetchedApplications = await api.getMyApplications();
        setApplications(fetchedApplications);
      } catch {
        // Applications are a bonus here; listings still work.
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
      } catch {
        setError("Unable to load jobs right now.");
      }
      setLoading(false);
    }
    getJobs();
  }, [query, page, refresh]);

  const applyFilters = (next) => {
    const params = new URLSearchParams();
    if (next.Search) params.set("Search", next.Search);
    if (next.CategoryId) params.set("CategoryId", next.CategoryId);
    if (next.EmploymentType) params.set("EmploymentType", next.EmploymentType);
    if (next.ExperienceLevel) params.set("ExperienceLevel", next.ExperienceLevel);
    setLoading(true);
    setError("");
    setPage(1);
    setQuery(params.toString());
    setRefresh(refresh + 1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters(filters);
  };

  const clearFilters = () => {
    const cleared = { Search: "", CategoryId: "", EmploymentType: "", ExperienceLevel: "" };
    setFilters(cleared);
    applyFilters(cleared);
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  const filterFields = (
    <>
      <div>
        <label htmlFor="filter-category" className="td-label">
          Category
        </label>
        <select
          id="filter-category"
          aria-label="Category"
          value={filters.CategoryId}
          onChange={(e) => setFilters({ ...filters, CategoryId: e.target.value })}
          className="td-input"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-type" className="td-label">
          Employment type
        </label>
        <select
          id="filter-type"
          aria-label="Employment type"
          value={filters.EmploymentType}
          onChange={(e) => setFilters({ ...filters, EmploymentType: e.target.value })}
          className="td-input"
        >
          <option value="">All types</option>
          {EMPLOYMENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t === "FullTime" ? "Full-time" : t === "PartTime" ? "Part-time" : t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-level" className="td-label">
          Experience
        </label>
        <select
          id="filter-level"
          aria-label="Experience level"
          value={filters.ExperienceLevel}
          onChange={(e) => setFilters({ ...filters, ExperienceLevel: e.target.value })}
          className="td-input"
        >
          <option value="">All levels</option>
          {EXPERIENCE_LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
    </>
  );

  return (
    <div className="font-jakarta text-white">
      {/* Discovery hero */}
      <section className="td-glow border-b border-white/5">
        <div className="td-animate-in mx-auto w-full max-w-[1260px] px-5 pb-10 pt-12 sm:pt-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#ff6b2c]">
            Job marketplace
          </p>
          <h1 className="max-w-2xl font-fraunces text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
            Discover your next role.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#aaa8a3]">
            Live openings from hiring teams. Search, filter, open a role and
            apply — all in one flow.
          </p>
          <form onSubmit={handleSearch} className="mt-7 flex max-w-2xl gap-2">
            <div className="relative flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                aria-label="Search jobs"
                placeholder="Try a title or keyword…"
                value={filters.Search}
                onChange={(e) => setFilters({ ...filters, Search: e.target.value })}
                maxLength={200}
                className="td-input !rounded-full !py-3.5 !pl-11 !pr-4"
              />
            </div>
            <button type="submit" disabled={loading} className="td-btn-primary shrink-0">
              Search
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1260px] px-5 py-8">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Filter sidebar (desktop) */}
          <aside className="hidden lg:block">
            <form onSubmit={handleSearch} className="td-card sticky top-32 space-y-5 p-5">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-bold text-white">
                  <SlidersHorizontal size={15} className="text-[#ff6b2c]" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-xs font-semibold text-gray-400 transition hover:text-[#ff6b2c]"
                  >
                    <RotateCcw size={12} />
                    Clear
                  </button>
                )}
              </div>
              {filterFields}
              <button type="submit" disabled={loading} className="td-btn-primary w-full">
                Apply filters
              </button>
              <p className="text-xs leading-5 text-gray-500">
                Active postings only — published roles with a future deadline.
              </p>
            </form>
          </aside>

          {/* Mobile filters */}
          <form
            onSubmit={handleSearch}
            className="td-card grid gap-3 p-4 sm:grid-cols-2 lg:hidden"
          >
            {filterFields}
            <div className="flex gap-2 sm:col-span-2">
              <button type="submit" disabled={loading} className="td-btn-primary flex-1">
                Apply filters
              </button>
              {hasActiveFilters && (
                <button type="button" onClick={clearFilters} className="td-btn-ghost">
                  Clear
                </button>
              )}
            </div>
          </form>

          {/* Results */}
          <section aria-live="polite" className="min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-[0.18em] text-[#9ebcff]">
                OPEN POSITIONS{!loading ? ` · ${total}` : ""}
              </h2>
              {totalPages > 1 && (
                <p className="text-xs text-gray-500">
                  Page {page} of {totalPages}
                </p>
              )}
            </div>

            {loading ? (
              <LoadingSkeleton rows={3} />
            ) : error && jobs.length === 0 ? (
              <ErrorState
                message={error}
                onRetry={() => {
                  setLoading(true);
                  setError("");
                  setRefresh(refresh + 1);
                }}
              />
            ) : jobs.length === 0 ? (
              <EmptyState
                icon={SearchX}
                title="No jobs found"
                hint="Try a different keyword or clear your filters."
                actionTo={undefined}
                actionLabel={undefined}
              />
            ) : (
              <div className="td-stagger space-y-4">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    application={applications.find(
                      (application) => application.jobId === job.id,
                    )}
                  />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={page <= 1 || loading}
                  onClick={() => {
                    setLoading(true);
                    setError("");
                    setPage(page - 1);
                  }}
                  className="td-btn-ghost !px-5 !py-2"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages || loading}
                  onClick={() => {
                    setLoading(true);
                    setError("");
                    setPage(page + 1);
                  }}
                  className="td-btn-ghost !px-5 !py-2"
                >
                  Next →
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer minimal />
    </div>
  );
}

export default SearchJobs;
