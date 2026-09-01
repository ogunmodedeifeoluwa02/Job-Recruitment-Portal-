import { Search } from "lucide-react";

function MyApplications() {
  return (
    <div className="text-white">


      {/* ================= PAGE CONTENT ================= */}
      <main className="mx-auto flex min-h-[370px] w-full max-w-[1260px] flex-col px-5 py-10">

        {/* Page title */}
        <div>
          <h2 className="text-sm font-bold tracking-[0.12em] text-[#9ebcff]">
            MY APPLICATIONS
            <span className="mx-2">•</span>
            0
          </h2>
        </div>


        {/* Empty State */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">

          {/* Search Icon */}
          <Search
            size={46}
            strokeWidth={2}
            className="mb-5 text-[#686762]"
          />


          {/* Message */}
          <h3 className="mb-2 text-base font-semibold text-white">
            No applications yet
          </h3>


          <p className="text-sm text-[#aaa8a3]">
            Apply to a job and it will appear here (FR5).
          </p>

        </div>

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