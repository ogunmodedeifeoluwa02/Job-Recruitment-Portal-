import { useEffect, useState } from "react";
import { Briefcase, CheckCircle2, GraduationCap, Lightbulb, ShieldCheck, Sparkles } from "lucide-react";
import api from "../../Core/Api";
import Footer from "../../Shared/Footer";
import PageHeader from "../../Shared/PageHeader";
import { Avatar } from "../../Shared/States";

const FIELDS = [
  { name: "headline", label: "Professional headline", placeholder: "e.g. Frontend Engineer", max: 200, icon: Sparkles },
  { name: "skills", label: "Skills (comma-separated)", placeholder: "JavaScript, React, Node.js", max: 2000, icon: Lightbulb },
  { name: "education", label: "Education history", placeholder: "B.Sc. Computer Science, University of Lagos, 2024", max: 5000, icon: GraduationCap },
  { name: "experience", label: "Work experience", placeholder: "Frontend Intern, Acme Inc — Jun 2023 to Dec 2023", max: 10000, icon: Briefcase },
];

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

function MyProfile() {
  const [profile, setProfile] = useState({ headline: "", skills: "", education: "", experience: "" });
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const storedUser = getStoredUser();

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await api.getProfile();
        setProfile({
          headline: data.headline || "",
          skills: data.skills || "",
          education: data.education || "",
          experience: data.experience || "",
        });
        setCv(data.cv_url);
      } catch {
        setError("Unable to load your profile right now.");
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
      setMessage("Profile saved successfully!");
    } catch (err) {
      setError(err.message || "Unable to save your profile right now.");
    }
    setSaving(false);
  };

  const filled = FIELDS.filter((f) => profile[f.name]?.trim()).length;
  const completeness = Math.round((filled / FIELDS.length) * 100);

  return (
    <div className="font-jakarta text-white">
      <main className="mx-auto w-full max-w-[1180px] px-5 py-8">
        <PageHeader
          eyebrow="Job seeker"
          title="My profile"
          description="One profile, reused for every application — employers see exactly what you save here."
        />

        {/* Identity header */}
        <div className="td-card td-animate-in mb-6 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
          <Avatar name={storedUser?.fullname || "Job Seeker"} className="h-16 w-16 text-xl" />
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-fraunces text-2xl font-bold text-white">
              {storedUser?.fullname || "Job Seeker"}
            </h2>
            <p className="truncate text-[13px] text-gray-500">{storedUser?.email || ""}</p>
            <div className="mt-3 flex max-w-sm items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#ff6b2c] to-[#ff9a5c] transition-all"
                  style={{ width: `${loading ? 0 : completeness}%` }}
                />
              </div>
              <span className="text-xs font-bold text-[#ff6b2c]">
                {loading ? "…" : `${completeness}%`}
              </span>
            </div>
          </div>
          <span className="flex w-fit items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-gray-400">
            <ShieldCheck size={13} className="text-[#ff6b2c]" />
            {cv ? "CV attached" : "Resume missing"}
          </span>
        </div>

        <div className="td-card td-animate-in p-6 sm:p-8">
          {loading ? (
            <div className="space-y-4" aria-busy="true" aria-label="Loading profile">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="td-shimmer h-3 w-32 rounded" />
                  <div className="td-shimmer mt-2 h-11 w-full rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
              {error && (
                <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-[13px] text-red-400 sm:col-span-2">
                  {error}
                </p>
              )}
              {message && (
                <p role="status" className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/5 p-3 text-[13px] text-green-400 sm:col-span-2">
                  <CheckCircle2 size={15} />
                  {message}
                </p>
              )}

              {FIELDS.map(({ name, label, placeholder, max, icon: Icon }) => (
                <div key={name} className={name === "experience" ? "sm:col-span-2" : ""}>
                  <label htmlFor={name} className="td-label flex items-center gap-1.5">
                    <Icon size={12} className="text-[#ff6b2c]" />
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    value={profile[name]}
                    onChange={handleChange}
                    maxLength={max}
                    type="text"
                    placeholder={placeholder}
                    required
                    disabled={saving}
                    className="td-input"
                  />
                </div>
              ))}

              <div className="sm:col-span-2">
                <span className="td-label">CV / Resume</span>
                {cv && /^https?:\/\//i.test(cv) ? (
                  <a
                    href={cv}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-[#ff6b2c] underline hover:text-[#ff7d45]"
                  >
                    View current CV
                  </a>
                ) : (
                  <p className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-[13px] text-gray-500">
                    CV upload is not available yet — your saved details above are
                    what employers see.
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <button type="submit" disabled={saving} className="td-btn-primary w-full sm:w-auto">
                  {saving ? "Saving…" : "Save profile"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer minimal />
    </div>
  );
}

export default MyProfile;
