import { ShieldCheck } from "lucide-react";

function MyProfile() {

    return (
        <div className="text-white">

           {/* Page Body */}
<div className="mx-auto w-full max-w-[1180px] px-5 py-5">

  {/* Profile Notice */}
  <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/10 bg-[#202223] px-4 py-3 text-sm">
    <ShieldCheck
      size={16}
      className="shrink-0 text-[#ff6b2c]"
    />

    <p className="text-gray-200">
      <span className="font-semibold text-white">
        One profile, reused for every application (FR2)
      </span>
      {" — "}
      employers see exactly what you save here. Aim for 100%.
    </p>
  </div>


  {/* Profile Card */}
  <div className="w-full max-w-[960px] rounded-2xl border border-white/10 bg-[#191a1a] p-4 sm:p-5">

    {/* Card Header */}
    <header className="mb-4 flex items-start justify-between gap-4">
      <h3 className="text-base font-semibold text-white">
        My Profile
      </h3>

      <div className="shrink-0 rounded-lg border border-white/10 px-2 py-1">
        <p className="text-xs text-gray-500">
          Resume missing
        </p>
      </div>
    </header>


    <form className="space-y-3">

      {/* Professional Headline */}
      <div>
        <label
          htmlFor="headline"
          className="mb-1.5 block text-[11px] font-semibold text-[#f5f1ea]"
        >
          Professional headline
        </label>

        <input
          id="headline"
          name="headline"
          type="text"
          placeholder="e.g. Frontend Engineer"
          required
          className="w-full rounded-xl border border-white/10 bg-[#202223] px-4 py-2.5 text-xs text-white outline-none placeholder:text-gray-500 focus:border-[#ff6b2c]"
        />
      </div>


      {/* Skills */}
      <div>
        <label
          htmlFor="skills"
          className="mb-1.5 block text-[11px] font-semibold text-[#f5f1ea]"
        >
          Skills (comma-separated)
        </label>

        <input
          id="skills"
          name="skills"
          type="text"
          placeholder="JavaScript, React, Node.js"
          required
          className="w-full rounded-xl border border-white/10 bg-[#202223] px-4 py-2.5 text-xs text-white outline-none placeholder:text-gray-500 focus:border-[#ff6b2c]"
        />
      </div>


      {/* Education */}
      <div>
        <label
          htmlFor="education"
          className="mb-1.5 block text-[11px] font-semibold text-[#f5f1ea]"
        >
          Education history
        </label>

        <input
          id="education"
          name="education"
          type="text"
          placeholder="B.Sc. Computer Science, University of Lagos, 2024"
          required
          className="w-full rounded-xl border border-white/10 bg-[#202223] px-4 py-2.5 text-xs text-white outline-none placeholder:text-gray-500 focus:border-[#ff6b2c]"
        />
      </div>


      {/* Work Experience */}
      <div>
        <label
          htmlFor="experience"
          className="mb-1.5 block text-[11px] font-semibold text-[#f5f1ea]"
        >
          Work experience
        </label>

        <input
          id="experience"
          name="experience"
          type="text"
          placeholder="Frontend Intern, Acme Inc — Jun 2023 to Dec 2023"
          required
          className="w-full rounded-xl border border-white/10 bg-[#202223] px-4 py-2.5 text-xs text-white outline-none placeholder:text-gray-500 focus:border-[#ff6b2c]"
        />
      </div>


      {/* CV / Resume */}
      <div>
        <label
          htmlFor="resume"
          className="mb-1.5 block text-[11px] font-semibold text-[#f5f1ea]"
        >
          CV / Resume (PDF or Word, max 2MB)
        </label>

        <input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          required
          className="w-full cursor-pointer overflow-hidden rounded-xl border border-[#ff6b2c] bg-[#202223] text-xs text-gray-400 outline-none
          file:mr-3
          file:border-0
          file:bg-transparent
          file:px-3
          file:py-2
          file:text-xs
          file:font-medium
          file:text-white"
        />

        <p className="mt-1 text-[10px] text-gray-500">
          Upload your CV - applications require it.
        </p>
      </div>


      {/* Save Button */}
      <button
        type="submit"
        className="rounded-xl bg-[#ff6b2c] px-4 py-2 text-xs font-semibold text-black transition hover:bg-[#ff7b45]"
      >
        Save Profile
      </button>

    </form>
  </div>

</div>
        </div>
    )
}

export default MyProfile;