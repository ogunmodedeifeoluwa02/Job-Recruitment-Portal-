import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowRight, Briefcase, Building2, KeyRound, UserRound } from "lucide-react";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router";

const AUTH_STEPS = [
  { icon: Briefcase, title: "Discover roles", text: "Browse live openings on the marketplace." },
  { icon: UserRound, title: "One profile", text: "Your profile powers every application." },
  { icon: KeyRound, title: "Track progress", text: "Follow each step to decision." },
];

function Login() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("mode") === "register" ? "register" : "login";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("job-seeker");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const navigate = useNavigate();

  // Where to go after login/register (e.g. /jobs/:id when Apply Now
  // sent a logged-out user here). Only allow same-origin relative paths.
  const rawReturnTo = searchParams.get("returnTo");
  const returnTo =
    rawReturnTo && rawReturnTo.startsWith("/") && !rawReturnTo.startsWith("//")
      ? rawReturnTo
      : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");

    if (activeTab === "register") {
      try {
        await registerUser({
          email,
          password,
          fullname: name,
          account_type: role === "job-seeker" ? "JobSeeker" : "Employer",
        });
        // register returns no token — auto-login to get jwt_token
        const loginData = await loginUser({ email, password });
        localStorage.setItem("token", loginData.jwt_token);
        localStorage.setItem("user", JSON.stringify(loginData.user));

        if (role === "job-seeker") {
          navigate(returnTo || "/jobseekerdashboard");
        } else {
          navigate(returnTo || "/employer");
        }
      } catch (error) {
        setFormError(error.message);
      }
    } else {
      try {
        const data = await loginUser({ email, password });
        localStorage.setItem("token", data.jwt_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate(returnTo || (data.user.account_type === "Employer" ? "/employer" : "/jobseekerdashboard"));
      } catch (error) {
        setFormError(error.message);
      }
    }
    setLoading(false);
  };

  const API_URL = "https://jobportal.collinswilson.com/api";

  const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text };
    }
    if (!response.ok) {
      throw new Error(data.message || data.raw || `Registration failed (${response.status})`);
    }
    return data;
  };

  const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain",
      },
      body: JSON.stringify(userData),
    });
    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text };
    }
    if (!response.ok) {
      throw new Error(data.message || data.raw || `Login failed (${response.status})`);
    }
    return data;
  };

  const tabStyle = (tab) =>
    `flex-1 rounded-full py-2 text-[13px] font-bold transition ${
      activeTab === tab
        ? "bg-[#ff6b2c] text-[#151616]"
        : "text-gray-400 hover:text-white"
    }`;

  const roleCard = (id, title, hint, Icon) => (
    <button
      key={id}
      type="button"
      aria-pressed={role === id}
      onClick={() => setRole(id)}
      className={`flex-1 rounded-2xl border p-4 text-left transition ${
        role === id
          ? "border-[#ff6b2c]/60 bg-[#ff6b2c]/5"
          : "border-white/10 bg-white/[0.02] hover:border-white/25"
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
          role === id ? "bg-[#ff6b2c] text-[#151616]" : "bg-white/5 text-gray-400"
        }`}
      >
        <Icon size={17} />
      </span>
      <span className="mt-3 block text-sm font-bold text-white">{title}</span>
      <span className="mt-1 block text-xs leading-5 text-gray-500">{hint}</span>
    </button>
  );

  return (
    <div className="td-glow min-h-screen bg-[#151616] font-jakarta text-white">
      <div className="mx-auto grid min-h-screen w-full max-w-[1120px] items-center gap-10 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_440px]">
        {/* Brand panel */}
        <div className="td-animate-in hidden lg:block">
          <Link to="/home" className="flex items-center gap-2.5">
            <img src={logo} alt="TalentDesk logo" className="h-11 w-11 object-contain" />
            <span className="font-fraunces text-2xl font-bold text-[#f5f1ea]">
              Talent<span className="text-[#ff6b2c]">Desk</span>
            </span>
          </Link>
          <h1 className="mt-8 max-w-md font-fraunces text-5xl font-bold leading-[1.05] tracking-tight">
            Hiring, with a clear <span className="text-[#ff6b2c]">next step.</span>
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-[#aaa8a3]">
            One workspace for candidates and hiring teams — from application
            to offer without losing the thread.
          </p>
          <div className="mt-8 space-y-4">
            {AUTH_STEPS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-[#ff6b2c]">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{title}</p>
                  <p className="text-[13px] text-gray-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="td-animate-in td-card mx-auto w-full max-w-[440px] p-6 sm:p-8">
          <Link to="/home" className="flex items-center gap-2 lg:hidden">
            <img src={logo} alt="TalentDesk logo" className="h-9 w-9 object-contain" />
            <span className="font-fraunces text-xl font-bold text-[#f5f1ea]">
              Talent<span className="text-[#ff6b2c]">Desk</span>
            </span>
          </Link>

          <h2 className="mt-4 font-fraunces text-2xl font-bold lg:mt-0">
            {activeTab === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-1 text-[13px] text-gray-500">
            {activeTab === "login"
              ? "Log in to continue to your workspace."
              : "Join as a job seeker or an employer."}
          </p>

          <div className="mt-6 flex rounded-full border border-white/10 bg-white/[0.03] p-1">
            <button type="button" className={tabStyle("login")} onClick={() => setActiveTab("login")}>
              Log in
            </button>
            <button type="button" className={tabStyle("register")} onClick={() => setActiveTab("register")}>
              Register
            </button>
          </div>

          {formError && (
            <p role="alert" className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-[13px] text-red-400">
              {formError}
            </p>
          )}

          {activeTab === "login" ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="td-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="td-input"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="td-label !mb-0">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgot(!showForgot);
                      setForgotMessage("");
                    }}
                    className="text-xs font-semibold text-[#ff6b2c] hover:text-[#ff7d45]"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  value={password}
                  minLength={8}
                  onChange={(e) => setPassword(e.target.value)}
                  className="td-input mt-2"
                />
              </div>

              {showForgot && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <label htmlFor="forgot-email" className="td-label">
                    Reset email
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    placeholder="you@example.com"
                    value={forgotEmail}
                    onChange={(e) => {
                      setForgotEmail(e.target.value);
                      setForgotMessage("");
                    }}
                    className="td-input"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForgotMessage(
                        "Password reset is not available yet — the backend has no forgot/reset-password endpoint. Please contact support.",
                      )
                    }
                    className="td-btn-ghost mt-3 w-full !py-2.5"
                  >
                    Send reset link
                  </button>
                  {forgotMessage && (
                    <p role="status" className="mt-2 text-xs leading-5 text-gray-400">
                      {forgotMessage}
                    </p>
                  )}
                </div>
              )}

              <button type="submit" disabled={loading} className="td-btn-primary w-full !py-3.5">
                {loading ? "Logging in…" : "Log in"}
                {!loading && <ArrowRight size={15} />}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <span className="td-label">I am joining as</span>
                <div className="flex gap-3">
                  {roleCard("job-seeker", "Job seeker", "Build your profile and apply.", UserRound)}
                  {roleCard("Employer", "Employer", "Post jobs, review applicants.", Building2)}
                </div>
              </div>
              <div>
                <label htmlFor="name" className="td-label">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="td-input"
                />
              </div>
              <div>
                <label htmlFor="reg-email" className="td-label">
                  Email
                </label>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="td-input"
                />
              </div>
              <div>
                <label htmlFor="reg-password" className="td-label">
                  Password
                </label>
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  required
                  value={password}
                  minLength={8}
                  onChange={(e) => setPassword(e.target.value)}
                  className="td-input"
                />
              </div>
              <button type="submit" disabled={loading} className="td-btn-primary w-full !py-3.5">
                {loading ? "Creating account…" : "Create account"}
                {!loading && <ArrowRight size={15} />}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-xs text-gray-500">
            <Link to="/home" className="font-semibold text-[#ff6b2c] hover:text-[#ff7d45]">
              ← Back to TalentDesk home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
