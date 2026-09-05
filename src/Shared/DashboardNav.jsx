import { User } from "lucide-react"
import { Search } from "lucide-react"
import { FileText } from "lucide-react"
import { TextAlignStart } from "lucide-react"
import { Link } from "react-router";
import logo from "../assets/logo.svg";

function DashboardNav({activeTab, setActiveTab}) {

  // Get logged-in user from localStorage (API returns fullname, not name)
  const storedUser = localStorage.getItem("user");
  const raw = JSON.parse(storedUser);
  const user = raw
    ? { name: raw.fullname, email: raw.email }
    : { name: "Job Seeker", email: "" };


  // Create initials from user's name
  const getInitials = (name) => {
    if (!name) return "";

    const names = name.split(/\s+/);

    if (names.length === 1) {
      return names[0][0].toUpperCase();
    }

    return (
      names[0][0] +
      names[names.length - 1][0]
    ).toUpperCase();
  };


  const navLinkStyle = (tab) =>
    `flex items-center gap-1.5 border-b-2 py-3 text-[11px] transition ${
      activeTab === tab
        ? "border-[#ff6b2c] font-semibold text-white"
        : "border-transparent text-gray-400 hover:text-white"
    }`;


  return (
    <header className="w-full bg-[#151616] text-white">

      {/* ================= TOP NAV ================= */}
      <nav className="mx-auto flex w-full max-w-[1260px] items-center justify-between border-b border-[#2a2a2a] px-5 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2">

          <img
            src={logo}
            alt="TalentDesk Logo"
            className="h-10 w-10 object-contain"
          />

          <div className="flex items-center gap-3">
            <div>
              <span className="font-fraunces text-lg font-bold text-[#f5f1ea]">
                Talent<span className="text-[#ff6b2c]">Desk</span>
              </span>

              <p className="text-[9px] font-semibold tracking-[0.18em] text-[#9b9b96]">
                HIRING WORKSPACE
              </p>
            </div>
          </div>

        </div>


        {/* Right side */}
        <div className="flex items-center gap-5">

          {/* Job Seeker */}
          <div className="rounded-lg border border-[#3b4248] px-2.5 py-1 text-[9px] font-semibold text-[#c6cbd0]">
            JOB SEEKER
          </div>


          {/* User information */}
          <div className="flex items-center gap-2">

            {/* Initials */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#29295c] text-[11px] font-bold text-white">
              {getInitials(user.name)}
            </div>


            {/* Name + Email */}
            <div className="hidden leading-tight sm:block">
              <p className="text-[11px] font-semibold text-white">
                {user.name}
              </p>

              <p className="text-[9px] uppercase text-gray-500">
                {user.email}
              </p>
            </div>

          </div>


          {/* Logout */}
          <Link to="/logout" className="text-[11px] font-semibold text-white transition hover:text-[#ff6b2c]">
            Log Out
          </Link>

        </div>

      </nav>


      {/* ================= SECOND NAV ================= */}
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-3">

        {/* Left navigation */}
        <div className="flex items-center gap-5">

          <button type="button"
            onClick={()=>setActiveTab("search-jobs")}
            className={navLinkStyle("search-jobs")}
          >
            <Search size={13} strokeWidth={1.8}/>
            <span>Search Jobs</span>
          </button>


          <button type="button"
            onClick={()=>setActiveTab("my-applications")}
            className={navLinkStyle("my-applications")}
          >
            <FileText size={13} strokeWidth={1.8}/>
            <span>My Applications</span>
          </button>


          <button type="button"
          onClick={()=>setActiveTab("my-profile")}
            className={navLinkStyle("my-profile")}
          >
            <User size={13} strokeWidth={1.8}/>
            <span>My Profile</span>
          </button>

        </div>


        {/* Developer tools */}
        <a href="https://jobportal.collinswilson.com/swagger/index.html" target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-1.5 py-3 text-[10px] text-gray-400 transition hover:text-white">
          <TextAlignStart size={13} />
          <span>Developer Tools</span>
        </a>

      </div>

    </header>
  );
}

export default DashboardNav;