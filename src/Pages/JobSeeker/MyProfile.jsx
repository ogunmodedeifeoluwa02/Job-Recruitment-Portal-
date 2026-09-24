import { useEffect, useState } from "react";
import api from "../../Core/Api";
import { ShieldCheck } from "lucide-react";

function MyProfile() {
    const [profile, setProfile] = useState({ headline: "", skills: "", education: "", experience: "" });
    const [cv, setCv] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
      async function loadProfile() {
        try {
          const data = await api.getProfile();
          setProfile({
            headline: data.headline || "",
            skills: data.skills || "",
            education: data.education || "",
            experience: data.experience || ""
          });
          setCv(data.cv_url);
        } catch (error) {
          setError(error.message);
        }
        setLoading(false);
      }
      loadProfile();
    }, []);

    const handleChange = (e) => {
      setProfile({ ...profile, [e.target.name]: e.target.value });
      setMessage("");
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setSaving(true);
      setError("");
      setMessage("");
      try {
        await api.updateProfile(profile);
        console.log("Profile saved successfully");
        setMessage("Profile saved successfully!");
      } catch (err) {
        setError(err.message);
      }
      setSaving(false);
    };


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
  <div className="w-full max-w-[880px] rounded-md border border-white/10 bg-[#191a1a] p-4 sm:p-5">

    {/* Card Header */}
    <header className="mb-4 flex items-start justify-between gap-4">
      <h3 className="text-base font-semibold text-white">
        My Profile
      </h3>

      <div className="shrink-0 rounded-lg border border-white/10 px-2 py-1">
        <p className="text-xs text-gray-500">
          {cv ? "CV attached" : "Resume missing"}
        </p>
      </div>
    </header>


    {loading && <p className="mb-4 text-sm text-gray-400">Loading profile...</p>}
    {error && <p role="alert" className="mb-4 text-sm text-red-400">{error}</p>}
    {message && <p role="status" className="mb-4 text-sm text-green-400">{message}</p>}
    <form onSubmit={handleSubmit} className="space-y-5">
    <fieldset disabled={loading || saving} className="space-y-5">

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
          value={profile.headline}
          onChange={handleChange}
          maxLength={200}
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
          value={profile.skills}
          onChange={handleChange}
          maxLength={2000}
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
          value={profile.education}
          onChange={handleChange}
          maxLength={5000}
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
          value={profile.experience}
          onChange={handleChange}
          maxLength={10000}
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

        {cv && /^https?:\/\//i.test(cv) && (
          <a href={cv} target="_blank" rel="noreferrer" className="text-sm text-[#ff6b2c] underline">View current CV</a>
        )}
        <p className="mt-1 text-xs text-gray-400">
          CV upload is not available yet. You can save your profile details above.
        </p>
      </div>


      {/* Save Button */}
      <button
        type="submit"
        className="rounded-sm bg-[#f57830] px-7 py-3 text-xs font-semibold text-black transition hover:bg-[#ff7b45]"
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>

    </fieldset>
    </form>
  </div>

</div>
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
    )
}

export default MyProfile;