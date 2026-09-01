import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Footer from "../../Shared/Footer";
import Navbar from "../../Shared/Navbar";

function LandingPages() {
  const [heroVisible, setHeroVisible] = useState(false);

  const heroRef = useRef(null);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#151616] text-white">
      <Navbar />

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="grid grid-cols-1 gap-12 bg-[#151616] px-6 pb-24 pt-20 md:grid-cols-2 md:items-center md:gap-10 md:pb-32 md:pt-28">

        {/* Hero Text */}
        <div
          className={`mx-auto w-full max-w-[1180px] transition-all duration-700 ease-out ${
            heroVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* Small label */}
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-[#ff6b2c]" />

            <span className="text-[10px] font-medium tracking-[0.25em] text-[#ff6b2c]">
              THE HIRING WORKSPACE
            </span>
          </div>

          {/* Main heading */}
          <h1 className="max-w-[850px] font-fraunces text-5xl leading-[1.05] text-[#f5f1ea] sm:text-6xl md:text-7xl">
            Hiring, with a clear
            <br />
            <span className="text-[#ff6b2c]">next step.</span>
          </h1>

          {/* Description + CTA */}
          <div className="mt-12 flex flex-wrap gap-3 md:mt-10 md:flex-row md:items-center md:justify-between">
            <p className="mt-8 max-w-[600px] text-base leading-7 text-gray-400 md:mt-0 md:text-lg">
              TalentDesk brings candidates, hiring teams, and every decision
              between them into one workspace. Move from application to offer
              without losing the thread.
            </p>

            {/* CTA buttons */}
            <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
              <button className="mt-0 rounded-lg bg-[#ff6b2c] px-3 py-3 text-sm font-medium text-[#151616] transition duration-300 hover:-translate-y-1 hover:bg-[#ff7d45]">
                Open TalentDesk →
              </button>

              <button className="mt-0 rounded-lg border border-white/20 px-3 py-3 text-sm font-medium text-[#f5f1ea] transition duration-300 hover:-translate-y-1 hover:border-[#ff6b2c]/50 hover:text-[#ff6b2c]">
                How the pipeline works
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            HERO DASHBOARD
        ===================================================== */}
        <div
          ref={heroRef}
          className={`hero-visuals mx-auto w-full max-w-[520px] overflow-hidden rounded-[24px] border border-white/10 bg-[#1b1d1e] shadow-2xl transition-all duration-1000 ease-out ${
            heroVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-10 opacity-0"
          }`}
        >
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-sm bg-[#ff6b2c]" />

              <span className="text-sm font-bold text-white">
                TalentDesk
              </span>
            </div>

            <span className="text-xs font-semibold tracking-[0.12em] text-[#a8a8a3]">
              DEMO WORKSPACE
            </span>
          </div>

          {/* Card Body */}
          <div className="px-6 py-6">

            {/* Decision Queue */}
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-bold tracking-[0.15em] text-[#a3b5d3]">
                DECISION QUEUE
              </span>
            </div>

            {/* Candidate 1 */}
            <div className="flex items-center justify-between border-b border-white/10 py-4 transition duration-300 hover:bg-white/[0.02]">
              <div>
                <p className="text-sm font-semibold text-white">
                  Amaka Nwosu
                </p>

                <p className="mt-2 text-xs text-[#a8a8a3]">
                  QA Automation Engineer · 1 day ago
                </p>
              </div>

              <button className="rounded-full border border-[#ff6b2c] px-3 py-1 text-xs font-bold text-[#ff6b2c] transition duration-300 hover:bg-[#ff6b2c] hover:text-[#151616]">
                REVIEW
              </button>
            </div>

            {/* Candidate 2 */}
            <div className="flex items-center justify-between border-b border-white/10 py-4 transition duration-300 hover:bg-white/[0.02]">
              <div>
                <p className="text-sm font-semibold text-white">
                  Tunde Bakare
                </p>

                <p className="mt-2 text-xs text-[#a8a8a3]">
                  Product Designer · 6 days ago
                </p>
              </div>

              <button className="rounded-full border border-[#ff6b2c] px-3 py-1 text-xs font-bold text-[#ff6b2c] transition duration-300 hover:bg-[#ff6b2c] hover:text-[#151616]">
                REVIEW
              </button>
            </div>

            {/* Candidate 3 */}
            <div className="flex items-center justify-between border-b border-white/10 py-4 transition duration-300 hover:bg-white/[0.02]">
              <div>
                <p className="text-sm font-semibold text-white">
                  Zainab Adeyemi
                </p>

                <p className="mt-2 text-xs text-[#a8a8a3]">
                  Backend Engineer · 2 days ago
                </p>
              </div>

              <button className="rounded-full border border-[#ff6b2c] px-3 py-1 text-xs font-bold text-[#ff6b2c] transition duration-300 hover:bg-[#ff6b2c] hover:text-[#151616]">
                REVIEW
              </button>
            </div>

            {/* Upcoming Conversations */}
            <div className="border-b border-white/10 pb-3 pt-6">
              <span className="text-xs font-bold tracking-[0.15em] text-[#a3b5d3]">
                UPCOMING CONVERSATIONS
              </span>
            </div>

            {/* Conversation 1 */}
            <div className="border-b border-white/10 py-4">
              <p className="text-sm font-semibold text-white">
                Aug 11 · 14:30
              </p>

              <p className="mt-2 text-xs text-[#a8a8a3]">
                Tunde Bakare · Product Designer
              </p>
            </div>

            {/* Conversation 2 */}
            <div className="border-b border-white/10 py-4">
              <p className="text-sm font-semibold text-white">
                Aug 12 · 10:00
              </p>

              <p className="mt-2 text-xs text-[#a8a8a3]">
                Amaka Nwosu · Backend Engineer
              </p>
            </div>

            {/* Statistics */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-5 text-xs">
              <span className="text-[#a8a8a3]">
                Open roles <strong className="text-white">5</strong>
              </span>

              <span className="text-[#a8a8a3]">
                Applicants <strong className="text-white">7</strong>
              </span>

              <span className="text-[#a8a8a3]">
                Interviews <strong className="text-white">2</strong>
              </span>

              <span className="text-[#a8a8a3]">
                Hired <strong className="text-[#ff6b2c]">1</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS SECTION
      ========================================================= */}
      <section className="border-t border-white/10 bg-[#151616] px-6 py-16">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">

            <div className="border-r border-white/10 px-4 text-center transition duration-300 hover:-translate-y-1 md:px-8">
              <p className="font-fraunces text-3xl text-[#f5f1ea] md:text-4xl">
                22
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-gray-500">
                API endpoints
              </p>
            </div>

            <div className="border-r-0 px-4 text-center transition duration-300 hover:-translate-y-1 md:border-r md:px-8">
              <p className="font-fraunces text-3xl text-[#f5f1ea] md:text-4xl">
                8
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-gray-500">
                defects fixed
              </p>
            </div>

            <div className="border-r border-white/10 px-4 text-center transition duration-300 hover:-translate-y-1 md:px-8">
              <p className="font-fraunces text-3xl text-[#f5f1ea] md:text-4xl">
                2
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-gray-500">
                user journeys
              </p>
            </div>

            <div className="px-4 text-center transition duration-300 hover:-translate-y-1 md:px-8">
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

      {/* =========================================================
          WORKSPACE SECTION
      ========================================================= */}
      <section
        id="workspace"
        className="border-t border-white/10 bg-[#151616] px-6 py-24"
      >
        <div className="mx-auto max-w-[1180px]">

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

          <div className="grid gap-5 md:grid-cols-2">

            {/* Candidate */}
            <div className="rounded-2xl border border-white/10 bg-[#1b1d1e] p-6 transition duration-500 hover:-translate-y-2 hover:border-[#ff6b2c]/30 md:p-8">
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

                <div className="rounded-lg border border-white/10 bg-[#151616] p-4 transition duration-300 hover:border-[#ff6b2c]/30">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#f5f1ea]">
                      Frontend Engineer
                    </p>

                    <span className="text-[10px] text-[#ff6b2c]">
                      Applied
                    </span>
                  </div>

                  <p className="mt-2 text-[10px] text-gray-500">
                    Lagos · Full-time · Remote
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#151616] p-4 transition duration-300 hover:border-[#ff6b2c]/30">
                  <p className="text-xs font-semibold text-[#f5f1ea]">
                    Application progress
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-1.5 flex-1 rounded-full bg-[#ff6b2c]" />
                    <span className="h-1.5 flex-1 rounded-full bg-[#ff6b2c]" />
                    <span className="h-1.5 flex-1 rounded-full bg-[#ff6b2c]" />
                    <span className="h-1.5 flex-1 rounded-full bg-white/10" />
                  </div>

                  <p className="mt-3 text-[10px] text-gray-500">
                    Interview stage · 3 of 4
                  </p>
                </div>

                <button className="w-full rounded-lg border border-white/10 py-3 text-xs text-gray-300 transition duration-300 hover:border-[#ff6b2c]/40 hover:text-[#ff6b2c]">
                  View application →
                </button>

              </div>
            </div>

            {/* Hiring Team */}
            <div className="rounded-2xl border border-white/10 bg-[#1b1d1e] p-6 transition duration-500 hover:-translate-y-2 hover:border-[#ff6b2c]/30 md:p-8">

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

                <div className="rounded-lg border border-white/10 bg-[#151616] p-4 transition duration-300 hover:border-[#ff6b2c]/30">
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

                <div className="rounded-lg border border-white/10 bg-[#151616] p-4 transition duration-300 hover:border-[#ff6b2c]/30">
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

                <button className="w-full rounded-lg border border-white/10 py-3 text-xs text-gray-300 transition duration-300 hover:border-[#ff6b2c]/40 hover:text-[#ff6b2c]">
                  Open hiring workspace →
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          PIPELINE SECTION
      ========================================================= */}
      <section
        id="pipeline"
        className="border-t border-white/10 bg-[#151616] px-6 py-24"
      >
        <div className="mx-auto max-w-[1180px]">

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

          <div className="grid gap-4 md:grid-cols-4">

            {/* Applied */}
            <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-5 transition duration-500 hover:-translate-y-2 hover:border-[#ff6b2c]/30">
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
            <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-5 transition duration-500 hover:-translate-y-2 hover:border-[#ff6b2c]/30">

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
            <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-5 transition duration-500 hover:-translate-y-2 hover:border-[#ff6b2c]/30">

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
            <div className="rounded-xl border border-[#ff6b2c]/20 bg-[#1b1d1e] p-5 transition duration-500 hover:-translate-y-2 hover:border-[#ff6b2c]/50">

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

      {/* =========================================================
          ENGINEERING SECTION
      ========================================================= */}
      <section
        id="engineering"
        className="border-t border-white/10 bg-[#151616] px-6 py-24"
      >
        <div className="mx-auto max-w-[1180px]">

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

          <div className="grid gap-4 md:grid-cols-3">

            {/* Card 1 */}
            <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-6 transition duration-500 hover:-translate-y-2 hover:border-[#ff6b2c]/30">

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
            <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-6 transition duration-500 hover:-translate-y-2 hover:border-[#ff6b2c]/30">

              <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-lg border border-[#ff6b2c]/30 text-[#ff6b2c]">
                02
              </div>

              <h3 className="text-sm font-semibold text-[#f5f1ea]">
                Predictable UI states
              </h3>

              <p className="mt-3 text-xs leading-5 text-gray-400">
                Loading, empty, success, and error states are treated as part
                of the product rather than an afterthought.
              </p>

            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-white/10 bg-[#1b1d1e] p-6 transition duration-500 hover:-translate-y-2 hover:border-[#ff6b2c]/30">

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

      {/* =========================================================
          PROOF SECTION
      ========================================================= */}
      <section
        id="proof"
        className="border-t border-white/10 bg-[#151616] px-6 py-24"
      >
        <div className="mx-auto max-w-[1180px]">

          <div className="mb-12">
            <p className="mb-4 text-[10px] font-medium tracking-[0.25em] text-[#ff6b2c]">
              04
            </p>

            <h2 className="font-fraunces text-4xl leading-tight text-[#f5f1ea] md:text-5xl">
              Made for teams that keep receipts.
            </h2>
          </div>

          <div className="border-t border-white/10">

            {/* Row 1 */}
            <div className="flex flex-col gap-5 border-b border-white/10 py-6 transition duration-300 hover:px-3 md:flex-row md:items-center md:justify-between">

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

              <button className="w-fit rounded-md border border-[#ff6b2c]/40 px-4 py-2 text-[11px] font-medium text-[#ff6b2c] transition duration-300 hover:bg-[#ff6b2c] hover:text-[#151616]">
                Compliance report
              </button>

            </div>

            {/* Row 2 */}
            <div className="flex flex-col gap-5 border-b border-white/10 py-6 transition duration-300 hover:px-3 md:flex-row md:items-center md:justify-between">

              <div className="max-w-[720px]">
                <h3 className="text-sm font-semibold text-[#f5f1ea]">
                  Two hostile reviewers, eight fixes
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  An HR-style review and a chaos test found eight defects. Each
                  one was fixed and re-verified with evidence screenshots.
                </p>
              </div>

              <button className="w-fit rounded-md border border-[#ff6b2c]/40 px-4 py-2 text-[11px] font-medium text-[#ff6b2c] transition duration-300 hover:bg-[#ff6b2c] hover:text-[#151616]">
                Remediation log
              </button>

            </div>

            {/* Row 3 */}
            <div className="flex flex-col gap-5 border-b border-white/10 py-6 transition duration-300 hover:px-3 md:flex-row md:items-center md:justify-between">

              <div className="max-w-[720px]">
                <h3 className="text-sm font-semibold text-[#f5f1ea]">
                  22 endpoints, one error contract
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  400, 401, 403, 404, 409. One response shape across the entire
                  API, documented end to end.
                </p>
              </div>

              <button className="w-fit rounded-md border border-[#ff6b2c]/40 px-4 py-2 text-[11px] font-medium text-[#ff6b2c] transition duration-300 hover:bg-[#ff6b2c] hover:text-[#151616]">
                API contract
              </button>

            </div>

            {/* Row 4 */}
            <div className="flex flex-col gap-5 border-b border-white/10 py-6 transition duration-300 hover:px-3 md:flex-row md:items-center md:justify-between">

              <div className="max-w-[720px]">
                <h3 className="text-sm font-semibold text-[#f5f1ea]">
                  A CV viewer that reads like a document
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  The complete two-page CV renders in a dedicated reading
                  surface. Production uses signed URLs per candidate.
                </p>
              </div>

              <button className="w-fit rounded-md border border-[#ff6b2c]/40 px-4 py-2 text-[11px] font-medium text-[#ff6b2c] transition duration-300 hover:bg-[#ff6b2c] hover:text-[#151616]">
                Sample document
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          CTA SECTION
      ========================================================= */}
      <section className="border-t border-white/10 bg-[#151616] px-6 py-32 text-center">
        <div className="mx-auto max-w-[700px]">

          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-[#ff6b2c]/50" />

            <span className="text-[10px] font-medium tracking-[0.25em] text-[#f47b45]">
              GET STARTED
            </span>

            <span className="h-px w-8 bg-[#ff6b2c]/50" />
          </div>

          <h2 className="font-fraunces text-4xl leading-tight text-[#f5f1ea] md:text-5xl">
            See it in action.
          </h2>

          <p className="mx-auto mt-5 max-w-[560px] text-sm leading-6 text-gray-400">
            Open TalentDesk and walk both journeys end to end. Register, apply,
            review, interview, decide. Every rule is plain in sight.
          </p>

          <Link
            to="/login"
            className="mt-8 rounded-lg bg-[#ff6b2c] px-6 py-3 text-sm font-medium text-[#151616] transition duration-300 hover:-translate-y-1 hover:bg-[#ff7d45]"
          >
            Open TalentDesk →
          </Link>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPages;
