import { Link } from "react-router";
import logo from "../assets/logo.svg";

// Compact product footer. Same component everywhere.
function Footer({ minimal = false }) {
  return (
    <footer className="border-t border-white/10 bg-[#151616]">
      <div className="mx-auto flex w-full max-w-[1260px] flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="TalentDesk logo" className="h-7 w-7 object-contain" />
          <span className="font-fraunces text-base font-bold text-[#f5f1ea]">
            Talent<span className="text-[#ff6b2c]">Desk</span>
          </span>
          <span className="hidden text-xs text-gray-500 md:inline">
            The hiring workspace with a clear next step.
          </span>
        </Link>

        {!minimal && (
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-medium text-gray-400">
            <Link to="/" className="transition hover:text-[#ff6b2c]">
              Find jobs
            </Link>
            <Link to="/home" className="transition hover:text-[#ff6b2c]">
              Why TalentDesk
            </Link>
            <Link to="/login" className="transition hover:text-[#ff6b2c]">
              Log in
            </Link>
          </nav>
        )}

        <p className="text-xs text-gray-600">© 2026 TalentDesk</p>
      </div>
    </footer>
  );
}

export default Footer;
