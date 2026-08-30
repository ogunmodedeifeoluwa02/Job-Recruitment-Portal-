import { useState } from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router";


function Login() {
  const [activeTab, setActiveTab] = useState("login")
  const ActiveTabStyle = "flex-1 rounded-lg bg-[#ff6b2c] py-2 text-sm font-semibold text-[#151616]"
  const InactiveTabStyle = "flex-1 rounded-lg py-2 text-sm font-semibold text-gray-400 transition hover:text-white"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("active-tab", activeTab)

    if (activeTab === "register") {
      console.log("userdata", {
        email,
        password,
        fullname: name,
        account_type: role === 'job-seeker' ? 0 : 1,
      });
      try {
        const data = await registerUser({
          email,
          password,
          fullname: name,
          account_type: role === 'job-seeker' ? 0 : 1,
        });

        console.log("Account created successfully:", data);
        // register returns no token — auto-login to get jwt_token
        const loginData = await loginUser({ email, password });
        console.log("Auto-login successful:", loginData);
        localStorage.setItem('token', loginData?.jwt_token || loginData?.token || '');
        localStorage.setItem('user', JSON.stringify(loginData?.user || null));

        alert("Account creation successful!")

        if (role === 'job-seeker') {
          navigate("/jobseekerdashboard");
        } else {
          navigate("/employerdashboard")
        }
      } catch (error) {
        console.error("Registration error:", error);

        alert(
          error?.errors?.Password?.[0] ||
          error?.message ||
          'An unexpected error occurred'
        );



      }

    } else {
      try {
        console.log("Login data:", {
          email,
          password,
        });

        const data = await loginUser({
          email,
          password,
        });

        console.log("Login successful:", data);
        localStorage.setItem('token', data?.jwt_token || data?.token || '');
        localStorage.setItem('user', JSON.stringify(data?.user || null));

        alert("login successful!")

        navigate("/jobseekerdashboard");

      } catch (error) {
        console.error("Login error:", error);
        alert(error.message);
      }
    }
  };

  const API_URL = "https://jobportal.collinswilson.com/api";

  const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      data = { raw: text };
    }

    console.log('Register response status:', response.status, 'body:', data);

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
      "Accept": "application/json, text/plain",
    },
    body: JSON.stringify(userData),
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (e) {
    data = { raw: text };
  }

  console.log("Login status:", response.status);
  console.log("Login response:", data);

  if (!response.ok) {
    throw new Error(data.message || data.raw || `Login failed (${response.status})`);
  }

  return data;
  };

  return (
    <div className="min-h-screen bg-[#151616] px-4 py-10 text-white">
      {/* Login Card */}
      <div className="mx-auto w-full max-w-[430px] rounded-[24px] border border-white/10 bg-[#1b1d1e] px-6 py-8">

        {/* Logo / Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <img
              src={logo}
              alt="TalentDesk Logo"
              className="h-10 w-10 object-contain"
            />

            <span className="text-xl font-bold text-[#ff6b2c]">
              TalentDesk
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-400">
            TalentDesk · Hiring Workspace
          </p>
        </div>




        {/* Login / Register Tabs */}
        <div className="mt-6 flex rounded-xl bg-[#252829] p-1">
          <button
            type="button"
            className={
              activeTab === 'login' ? ActiveTabStyle : InactiveTabStyle}
            onClick={() => {
              setActiveTab("login")
            }}
          >
            Log In
          </button>

          <button
            type="button"
            className={
              activeTab === 'register' ? ActiveTabStyle : InactiveTabStyle
            }
            onClick={() => {
              setActiveTab("register")
            }}

          >
            Register
          </button>
        </div>

        {activeTab === 'login' ?
          // Login Form
          <form onSubmit={handleSubmit} className="mt-6">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold text-[#f5f1ea]"
              >
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
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#202223] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#ff6b2c]"
              />
            </div>

            {/* Password */}
            <div className="mt-5">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-[#f5f1ea]"
              >
                Password
              </label>

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
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#202223] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#ff6b2c]"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="mt-5 w-full rounded-xl bg-[#ff6b2c] py-3 text-sm font-semibold text-[#151616] transition hover:bg-[#ff7d45]"
            >
              Log In
            </button>
          </form>
          :
          // register form
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <p>i am registering as...</p>
              <div>
                <div className="mt-2 flex  gap-3">
                  {/* Role Selection */}
                  <div
                    onClick={() => setRole("job-seeker")}
                    className={`grid cursor-pointer gap-3 border rounded-lg px-3 py-3 ${role === "job-seeker"
                      ? "border - [#ff6b2c]"
                      : "border-white/5 hoover:border-[#ff6b2c]"
                      } `}>
                    <h4>Job Seeker</h4>
                    <p className="text-sm text-gray-500">build your profile and apply</p>
                  </div>

                  <div
                    onClick={() => setRole("Employer")}
                    className={`grid cursor-pointer gap-3 border rounded-lg px-3 py-3 ${role === "Employer"
                      ? "border - [#ff6b2c]"
                      : "border-white/5 hoover:border-[#ff6b2c]"
                      } `}>
                    <h4>Employer</h4>
                    <p className="text-sm text-gray-500">Post job and manage applications</p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-[#f5f1ea]"
                  >
                    FullName
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full-name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#202223] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#ff6b2c]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-[#f5f1ea]">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#202223] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#ff6b2c]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#f5f1ea]">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={password}
                    minLength={8}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#202223] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#ff6b2c]" />
                </div>
                <button
                  type="submit"
                  className="mt-5 w-full rounded-xl bg-[#ff6b2c] py-3 text-sm font-semibold text-[#151616] transition hover:bg-[#ff7d45]"

                >
                  create account
                </button>
              </div>
            </div>
            ------------------------------------------------------------
          </form>
        }

        {/* Demo Accounts */}
        <div className="mt-5 border-t border-white/10 pt-5">
          <p className="text-xs text-gray-400">
            Demo accounts · password demo1234
          </p>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300 transition hover:border-[#ff6b2c]/50 hover:text-[#ff6b2c]"
            >
              Job Seeker
            </button>

            <button
              type="button"
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300 transition hover:border-[#ff6b2c]/50 hover:text-[#ff6b2c]"
            >
              Employer
            </button>
          </div>
        </div>

        {/* Information Box */}
        <div className="mt-5 rounded-xl border border-white/10 bg-[#202223] p-4">
          <p className="text-xs leading-5 text-gray-300">
            A private workspace for hiring teams. Explore both roles with the
            demo accounts, or register fresh. Developer tools in the top
            navigation inspect the API console.
          </p>

          <Link
            to="/"
            className="mt-2 inline-block text-xs font-semibold text-[#ff6b2c] hover:text-[#ff7d45]"
          >
            ← Back to TalentDesk home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;