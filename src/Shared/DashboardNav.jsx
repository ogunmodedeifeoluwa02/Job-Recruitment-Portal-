import { FileText, Search, User } from "lucide-react";
import { Link } from "react-router";
import logo from "../assets/logo.svg";
import ThemeToggle from "./ThemeToggle";
import { Avatar } from "./States";

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

const TABS = [
  { id: "search-jobs", label: "Find jobs", icon: Search },
  { id: "my-applications", label: "Applications", icon: FileText },
  { id: "my-profile", label: "Profile", icon: User },
];

// Seeker workspace nav: identity bar + tab bar. Tabs scroll on mobile.
function DashboardNav({ activeTab, setActiveTab }) {
  const raw = getUser();
  const user = raw
    ? { name: raw.fullname, email: raw.email }
    : { name: "Job Seeker", email: "" };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#151616]/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-[1260px] items-center justify-between gap-3 px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="TalentDesk logo" className="h-9 w-9 object-contain" />
          <span className="hidden font-fraunces text-lg font-bold text-[#f5f1ea] min-[420px]:block">
            Talent<span className="text-[#ff6b2c]">Desk</span>
          </span>
          <span className="rounded-full border border-white/15 px-2.5 py-1 text-[9px] font-bold tracking-wider text-[#c6cbd0]">
            JOB SEEKER
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <Avatar name={user.name} className="h-8 w-8 text-[10px]" />
            <div className="hidden leading-tight lg:block">
              <p className="max-w-[180px] truncate text-[12px] font-bold text-white">
                {user.name}
              </p>
              <p className="max-w-[180px] truncate text-[10px] uppercase text-gray-500">
                {user.email}
              </p>
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
          {TABS.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-3 text-[13px] transition ${
                  active
                    ? "border-[#ff6b2c] font-bold text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={14} strokeWidth={2} />
                {label}
              </button>
            );
          })}
          <a
            href="https://jobportal.collinswilson.com/swagger/index.html"
            target="_blank"
            rel="noreferrer"
            className="ml-auto hidden shrink-0 px-3 py-3 text-[12px] text-gray-500 transition hover:text-white sm:block"
          >
            API docs
          </a>
        </div>
      </div>
    </header>
  );
}

export default DashboardNav;
