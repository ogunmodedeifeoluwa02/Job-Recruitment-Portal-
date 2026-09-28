import { Link } from "react-router";
import { BriefcaseBusiness, CalendarClock, LayoutDashboard, Users } from "lucide-react";
import logo from "../../../assets/logo.svg";
import ThemeToggle from "../../../Shared/ThemeToggle";
import { Avatar } from "../../../Shared/States";

const TABS = [
  { id: "dashboard", label: "Dashboard", to: "/employer", icon: LayoutDashboard },
  { id: "jobs", label: "Jobs", to: "/employer/jobs", icon: BriefcaseBusiness },
  { id: "applicants", label: "Applicants", to: "/employer/applicants", icon: Users },
  { id: "interviews", label: "Interviews", to: "/employer/interviews", icon: CalendarClock },
];

// Unified employer chrome: identity bar + tab bar + content + footer.
// Replaces the per-page hand-rolled navs so every employer page matches.
function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}
function EmployerShell({ activeTab, children }) {
  const raw = getUser();
  const name = raw?.fullname || "Employer";
  const email = raw?.email || "";

  return (
    <div className="flex min-h-screen flex-col bg-[#151616] font-jakarta text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#151616]/90 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-[1260px] items-center justify-between gap-3 px-5 py-3">
          <Link to="/employer" className="flex items-center gap-2">
            <img src={logo} alt="TalentDesk logo" className="h-9 w-9 object-contain" />
            <span className="hidden font-fraunces text-lg font-bold text-[#f5f1ea] min-[420px]:block">
              Talent<span className="text-[#ff6b2c]">Desk</span>
            </span>
            <span className="rounded-full border border-[#ff6b2c]/40 px-2.5 py-1 text-[9px] font-bold tracking-wider text-[#ff6b2c]">
              EMPLOYER
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <Avatar name={name} className="h-8 w-8 text-[10px]" />
              <div className="hidden leading-tight lg:block">
                <p className="max-w-[180px] truncate text-[12px] font-bold text-white">{name}</p>
                <p className="max-w-[180px] truncate text-[10px] uppercase text-gray-500">{email}</p>
              </div>
            </div>
            <ThemeToggle />
            <Link
              to="/logout"
              className="text-[12px] font-bold text-[#b8b6b0] transition hover:text-[#ff6b2c]"
            >
              Log out
            </Link>
          </div>
        </nav>

        <div className="border-t border-white/5">
          <div className="mx-auto flex w-full max-w-[1260px] items-center gap-1 overflow-x-auto px-5">
            {TABS.map(({ id, label, to, icon: Icon }) => (
              <Link
                key={id}
                to={to}
                className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-3 text-[13px] transition ${
                  activeTab === id
                    ? "border-[#ff6b2c] font-bold text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={14} strokeWidth={2} />
                {label}
              </Link>
            ))}
            <Link
              to="/employer/applications"
              className={`shrink-0 border-b-2 px-3 py-3 text-[13px] transition ${
                activeTab === "applications"
                  ? "border-[#ff6b2c] font-bold text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              All applications
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1260px] flex-1 px-5 py-8">{children}</main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1260px] flex-wrap items-center gap-x-5 gap-y-2 px-5 py-6 text-xs">
          <span className="font-bold text-white">TalentDesk</span>
          <span className="text-gray-500">Employer workspace — every hire has a clear next step.</span>
          <span className="ml-auto text-gray-600">© 2026 TalentDesk</span>
        </div>
      </footer>
    </div>
  );
}

export default EmployerShell;
