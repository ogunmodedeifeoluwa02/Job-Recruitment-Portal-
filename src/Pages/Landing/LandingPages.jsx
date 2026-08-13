import Footer from "../../Shared/Footer";
import Navbar from "../../Shared/Navbar";

function LandingPages() {
  return (
    <div className="min-h-screen bg-[#151616] text-white">
      <Navbar />
      {/* Hero section */}
      <section className="bg-[#151616] px-6 pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="mx-auto max-w-[1180px]">
          {/* Small label */}
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-[#ff6b2c]"></span>

            <span className="text-[10px] font-medium tracking-[0.25em] text-[#ff6b2c]">
              THE HIRING WORKSPACE
            </span>
          </div>

          {/* Main heading */}
          <h1 className="max-w-[850px] font-fraunces text-5xl leading-[1.05] text-[#f5f1ea] sm:text-6xl md:text-7xl">
            Hiring teams need
            <span className="text-[#ff6b2c]"> a clear next step.</span>
          </h1>

          {/* Description */}
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[600px] text-base leading-7 text-gray-400 md:text-lg">
              TalentDesk brings candidates, hiring teams, and every decision
              between them into one workspace. Move from application to offer
              without losing the thread.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="rounded-lg bg-[#ff6b2c] px-6 py-3 text-sm font-medium text-[#151616] transition hover:bg-[#ff7d45]">
                Open TalentDesk →
              </button>

              <button className="rounded-lg border border-white/15 px-6 py-3 text-sm font-medium text-[#f5f1ea] transition hover:border-[#ff6b2c]/50 hover:text-[#ff6b2c]">
                See how it works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-white/10 bg-[#151616] px-6 py-16">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
            {/* Stat 1 */}
            <div className="border-r border-white/10 px-4 text-center md:px-8">
              <p className="font-fraunces text-3xl text-[#f5f1ea] md:text-4xl">
                22
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-gray-500">
                API endpoints
              </p>
            </div>

            {/* Stat 2 */}
            <div className="border-r-0 px-4 text-center md:border-r md:px-8">
              <p className="font-fraunces text-3xl text-[#f5f1ea] md:text-4xl">
                8
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-gray-500">
                defects fixed
              </p>
            </div>

            {/* Stat 3 */}
            <div className="border-r border-white/10 px-4 text-center md:px-8">
              <p className="font-fraunces text-3xl text-[#f5f1ea] md:text-4xl">
                2
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-gray-500">
                user journeys
              </p>
            </div>

            {/* Stat 4 */}
            <div className="px-4 text-center md:px-8">
              <p className="font-fraunces text-3xl text-[#f5f1ea] md:text-4xl">
                100%
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-gray-500">
                traceable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace section*/}
      <section
        id="workspace"
        className="border-t border-white/10 bg-[#151616] px-6 py-24"
      >
        <div className="mx-auto max-w-[1180px]">
          {/* Heading */}
          <div className="mb-12 max-w-[720px]">
            <p className="mb-4 text-[10px] font-medium tracking-[0.25em] text-[#ff6b2c]">
              01
            </p>

            <h2 className="font-fraunces text-4xl leading-tight text-[#f5f1ea] md:text-5xl">
              One workspace, both perspectives.
            </h2>

            <p className="mt-5 text-sm leading-6 text-gray-400">
              Candidates and hiring teams see the same hiring process from
              different sides. One workspace keeps every step connected.
            </p>
          </div>

          {/* Two perspectives */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Candidate */}
            <div className="rounded-2xl border border-white/10 bg-[#1b1d1e] p-6 md:p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-[#ff6b2c]">
                    CANDIDATE
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-[#f5f1ea]">
                    Your next opportunity
                  </h3>
                </div>

                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-gray-400">
                  Applicant
                </span>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border border-white/10 bg-[#151616] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#f5f1ea]">
                      Frontend Engineer
                    </p>

                    <span className="text-[10px] text-[#ff6b2c]">Applied</span>
                  </div>

                  <p className="mt-2 text-[10px] text-gray-500">
                    Lagos · Full-time · Remote
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#151616] p-4">
                  <p className="text-xs font-semibold text-[#f5f1ea]">
                    Application progress
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-1.5 flex-1 rounded-full bg-[#ff6b2c]"></span>
                    <span className="h-1.5 flex-1 rounded-full bg-[#ff6b2c]"></span>
                    <span className="h-1.5 flex-1 rounded-full bg-[#ff6b2c]"></span>
                    <span className="h-1.5 flex-1 rounded-full bg-white/10"></span>
                  </div>

                  <p className="mt-3 text-[10px] text-gray-500">
                    Interview stage · 3 of 4
                  </p>
                </div>

                <button className="w-full rounded-lg border border-white/10 py-3 text-xs text-gray-300 transition hover:border-[#ff6b2c]/40 hover:text-[#ff6b2c]">
                  View application →
                </button>
              </div>
            </div>

            {/* Hiring team */}
            <div className="rounded-2xl border border-white/10 bg-[#1b1d1e] p-6 md:p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-[#ff6b2c]">
                    HIRING TEAM
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-[#f5f1ea]">
                    Make better hiring decisions
                  </h3>
                </div>

                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-gray-400">
                  Recruiter
                </span>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border border-white/10 bg-[#151616] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#f5f1ea]">
                      Frontend Engineer
                    </p>

                    <span className="text-[10px] text-[#ff6b2c]">
                      12 candidates
                    </span>
                  </div>

                  <p className="mt-2 text-[10px] text-gray-500">
                    Active hiring pipeline
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#151616] p-4">
                  <p className="text-xs font-semibold text-[#f5f1ea]">
                    Today's next step
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">
                      Review interview feedback
                    </span>

                    <span className="text-[10px] text-[#ff6b2c]">
                      4 pending
                    </span>
                  </div>
                </div>

                <button className="w-full rounded-lg border border-white/10 py-3 text-xs text-gray-300 transition hover:border-[#ff6b2c]/40 hover:text-[#ff6b2c]">
                  Open hiring workspace →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline section */}
      <section
        id="pipeline"
        className="border-t border-white/10 bg-[#151616] px-6 py-24"
      >
        <div className="mx-auto max-w-[1180px]">
          {/* Heading */}
          <div className="mb-12">
            <p className="mb-4 text-[10px] font-medium tracking-[0.25em] text-[#ff6b2c]">
              02
            </p>

            <h2 className="max-w-[700px] font-fraunces text-4xl leading-tight text-[#f5f1ea] md:text-5xl">
              A pipeline built for decisions.
            </h2>

            <p className="mt-5 max-w-[650px] text-sm leading-6 text-gray-400">
              Move candidates through every stage without losing context. Every
              action has a clear state and a clear next step.
            </p>
          </div>

          {/* Pipeline */}
          <div className="grid gap-4 md:grid-cols-4">
            {/* Applied */}
            <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#f5f1ea]">
                  Applied
                </span>

                <span className="text-[10px] text-gray-500">12</span>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border border-white/10 bg-[#151616] p-4">
                  <p className="text-xs font-medium text-[#f5f1ea]">
                    Product Designer
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500">
                    Lagos · 2 days ago
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#151616] p-4">
                  <p className="text-xs font-medium text-[#f5f1ea]">
                    Frontend Engineer
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500">
                    Abuja · 3 days ago
                  </p>
                </div>
              </div>
            </div>

            {/* Screening */}
            <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#f5f1ea]">
                  Screening
                </span>

                <span className="text-[10px] text-gray-500">8</span>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border border-white/10 bg-[#151616] p-4">
                  <p className="text-xs font-medium text-[#f5f1ea]">
                    Backend Engineer
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500">
                    Remote · 1 day ago
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#151616] p-4">
                  <p className="text-xs font-medium text-[#f5f1ea]">
                    Product Manager
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500">
                    Lagos · 4 days ago
                  </p>
                </div>
              </div>
            </div>

            {/* Interview */}
            <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#f5f1ea]">
                  Interview
                </span>

                <span className="text-[10px] text-gray-500">5</span>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border border-white/10 bg-[#151616] p-4">
                  <p className="text-xs font-medium text-[#f5f1ea]">
                    UI/UX Designer
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500">
                    Lagos · Tomorrow
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#151616] p-4">
                  <p className="text-xs font-medium text-[#f5f1ea]">
                    Software Engineer
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500">
                    Remote · Friday
                  </p>
                </div>
              </div>
            </div>

            {/* Decision */}
            <div className="rounded-xl border border-[#ff6b2c]/20 bg-[#1b1d1e] p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#f5f1ea]">
                  Decision
                </span>

                <span className="text-[10px] text-[#ff6b2c]">3</span>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border border-[#ff6b2c]/20 bg-[#151616] p-4">
                  <p className="text-xs font-medium text-[#f5f1ea]">
                    Senior Engineer
                  </p>

                  <p className="mt-1 text-[10px] text-[#ff6b2c]">
                    Ready for decision
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#151616] p-4">
                  <p className="text-xs font-medium text-[#f5f1ea]">
                    Product Designer
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500">
                    Awaiting review
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering section*/}
      <section
        id="engineering"
        className="border-t border-white/10 bg-[#151616] px-6 py-24"
      >
        <div className="mx-auto max-w-[1180px]">
          {/* Heading */}
          <div className="mb-12">
            <p className="mb-4 text-[10px] font-medium tracking-[0.25em] text-[#ff6b2c]">
              03
            </p>

            <h2 className="max-w-[700px] font-fraunces text-4xl leading-tight text-[#f5f1ea] md:text-5xl">
              Engineering that stands review.
            </h2>

            <p className="mt-5 max-w-[650px] text-sm leading-6 text-gray-400">
              Built around clear contracts, predictable states, and evidence
              that makes the important parts easy to verify.
            </p>
          </div>

          {/* Engineering cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-6">
              <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-lg border border-[#ff6b2c]/30 text-[#ff6b2c]">
                01
              </div>

              <h3 className="text-sm font-semibold text-[#f5f1ea]">
                Clear API contracts
              </h3>

              <p className="mt-3 text-xs leading-5 text-gray-400">
                Consistent responses and predictable error states make every
                integration easier to understand and test.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-6">
              <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-lg border border-[#ff6b2c]/30 text-[#ff6b2c]">
                02
              </div>

              <h3 className="text-sm font-semibold text-[#f5f1ea]">
                Predictable UI states
              </h3>

              <p className="mt-3 text-xs leading-5 text-gray-400">
                Loading, empty, success, and error states are treated as part of
                the product rather than an afterthought.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-6">
              <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-lg border border-[#ff6b2c]/30 text-[#ff6b2c]">
                03
              </div>

              <h3 className="text-sm font-semibold text-[#f5f1ea]">
                Evidence-first workflow
              </h3>

              <p className="mt-3 text-xs leading-5 text-gray-400">
                Every important workflow can be demonstrated clearly from the
                interface through to the underlying behaviour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof section */}
      <section
        id="proof"
        className="border-t border-white/10 bg-[#151616] px-6 py-24"
      >
        <div className="mx-auto max-w-[1180px]">
          {/* Section heading */}
          <div className="mb-12">
            <p className="mb-4 text-[10px] font-medium tracking-[0.25em] text-[#ff6b2c]">
              04
            </p>

            <h2 className="font-fraunces text-4xl leading-tight text-[#f5f1ea] md:text-5xl">
              Made for teams that keep receipts.
            </h2>
          </div>

          {/* Proof rows */}
          <div className="border-t border-white/10">
            {/* Row 1 */}
            <div className="flex flex-col gap-5 border-b border-white/10 py-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-[720px]">
                <h3 className="text-sm font-semibold text-[#f5f1ea]">
                  Audited against the product brief
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  Every functional requirement maps to a working control, with
                  acceptance criteria you can demonstrate in front of a
                  reviewer.
                </p>
              </div>

              <button className="w-fit rounded-md border border-[#ff6b2c]/40 px-4 py-2 text-[11px] font-medium text-[#ff6b2c] transition hover:bg-[#ff6b2c] hover:text-[#151616]">
                Compliance report
              </button>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col gap-5 border-b border-white/10 py-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-[720px]">
                <h3 className="text-sm font-semibold text-[#f5f1ea]">
                  Two hostile reviewers, eight fixes
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  An HR-style review and a chaos test found eight defects. Each
                  one was fixed and re-verified with evidence screenshots.
                </p>
              </div>

              <button className="w-fit rounded-md border border-[#ff6b2c]/40 px-4 py-2 text-[11px] font-medium text-[#ff6b2c] transition hover:bg-[#ff6b2c] hover:text-[#151616]">
                Remediation log
              </button>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col gap-5 border-b border-white/10 py-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-[720px]">
                <h3 className="text-sm font-semibold text-[#f5f1ea]">
                  22 endpoints, one error contract
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  400, 401, 403, 404, 409. One response shape across the entire
                  API, documented end to end.
                </p>
              </div>

              <button className="w-fit rounded-md border border-[#ff6b2c]/40 px-4 py-2 text-[11px] font-medium text-[#ff6b2c] transition hover:bg-[#ff6b2c] hover:text-[#151616]">
                API contract
              </button>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col gap-5 border-b border-white/10 py-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-[720px]">
                <h3 className="text-sm font-semibold text-[#f5f1ea]">
                  A CV viewer that reads like a document
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  The complete two-page CV renders in a dedicated reading
                  surface. Production uses signed URLs per candidate.
                </p>
              </div>

              <button className="w-fit rounded-md border border-[#ff6b2c]/40 px-4 py-2 text-[11px] font-medium text-[#ff6b2c] transition hover:bg-[#ff6b2c] hover:text-[#151616]">
                Sample document
              </button>
            </div>
          </div>
        </div>
      </section>

      {/*CTA section*/}
      <section className="border-t border-white/10 bg-[#151616] px-6 py-32 text-center">
        <div className="mx-auto max-w-[700px]">
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-[#ff6b2c]/50"></span>

            <span className="text-[10px] font-medium tracking-[0.25em] text-[#f47b45]">
              GET STARTED
            </span>

            <span className="h-px w-8 bg-[#ff6b2c]/50"></span>
          </div>

          <h2 className="font-fraunces text-4xl leading-tight text-[#f5f1ea] md:text-5xl">
            See it in action.
          </h2>

          <p className="mx-auto mt-5 max-w-[560px] text-sm leading-6 text-gray-400">
            Open TalentDesk and walk both journeys end to end. Register, apply,
            review, interview, decide. Every rule is plain in sight.
          </p>

          <button className="mt-8 rounded-lg bg-[#ff6b2c] px-6 py-3 text-sm font-medium text-[#151616] transition hover:bg-[#ff7d45]">
            Open TalentDesk →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPages;
