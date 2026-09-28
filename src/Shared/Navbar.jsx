import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { LayoutDashboard, LogOut, Menu, Search, X } from "lucide-react";
import logo from "../assets/logo.svg";
import ThemeToggle from "./ThemeToggle";
import { Avatar } from "./States";

function getSession() {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return token && user ? { token, user } : null;
  } catch {
    return null;
  }
}

// Public product navbar. Adapts to auth state + role, collapses on mobile.
function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const session = getSession();
  const isEmployer = session?.user?.account_type === "Employer";
  const home = isEmployer ? "/employer" : "/jobseekerdashboard";

  const closeAnd = (fn) => () => {
    setOpen(false);
    fn();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#151616]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-3.5">
        <Link to={session ? home : "/home"} className="flex items-center gap-2.5">
          <img src={logo} alt="TalentDesk logo" className="h-9 w-9 object-contain" />
          <span>
            <span className="block font-fraunces text-lg font-bold leading-none text-[#f5f1ea]">
              Talent<span className="text-[#ff6b2c]">Desk</span>
            </span>
            <span className="mt-1 block text-[9px] font-bold tracking-[0.22em] text-[#9b9b96]">
              HIRING WORKSPACE
            </span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-2 md:flex">
          {!session ? (
            <>
              <Link
                to="/"
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-[#b8b6b0] transition hover:bg-white/5 hover:text-white"
              >
                <Search size={14} />
                Find jobs
              </Link>
              <Link
                to="/home"
                className="rounded-full px-4 py-2 text-[13px] font-semibold text-[#b8b6b0] transition hover:bg-white/5 hover:text-white"
              >
                Why TalentDesk
              </Link>
            </>
          ) : (
            <Link
              to={home}
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-[#b8b6b0] transition hover:bg-white/5 hover:text-white"
            >
              <LayoutDashboard size={14} />
              {isEmployer ? "Employer workspace" : "My workspace"}
            </Link>
          )}
          <ThemeToggle />
          {!session ? (
            <>
              <Link to="/login" className="td-btn-ghost !px-5 !py-2">
                Log in
              </Link>
              <Link to="/login?mode=register" className="td-btn-primary !px-5 !py-2">
                Get started
              </Link>
            </>
          ) : (
            <div className="ml-1 flex items-center gap-3 border-l border-white/10 pl-4">
              <Avatar name={session.user.fullname} className="h-8 w-8 text-[10px]" />
              <button
                type="button"
                onClick={() => navigate("/logout")}
                className="flex items-center gap-1.5 text-[13px] font-semibold text-[#b8b6b0] transition hover:text-[#ff6b2c]"
              >
                <LogOut size={14} />
                Log out
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-300"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-white/10 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {!session ? (
              <>
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Find jobs
                </Link>
                <Link
                  to="/home"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Why TalentDesk
                </Link>
                <div className="mt-2 flex gap-2">
                  <Link to="/login" onClick={() => setOpen(false)} className="td-btn-ghost flex-1">
                    Log in
                  </Link>
                  <Link
                    to="/login?mode=register"
                    onClick={() => setOpen(false)}
                    className="td-btn-primary flex-1"
                  >
                    Get started
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link
                  to={home}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  {isEmployer ? "Employer workspace" : "My workspace"}
                </Link>
                <button
                  type="button"
                  onClick={closeAnd(() => navigate("/logout"))}
                  className="rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#ff6b2c]"
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
