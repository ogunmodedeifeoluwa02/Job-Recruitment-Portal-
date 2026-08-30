import { Link } from 'react-router';

function Navbar() {
  return (
    <header className="border-b border-[#2a2a2a] bg-[#151616]">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-5">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 font-fraunces text-lg">
            <img
              src="src/assests/logo.svg"
              alt="TalentDesk Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="font-bold text-[#f5f1ea]">
              Talent<span className="text-[#ff6b2c]">Desk</span>
            </span>
          </div>
          <div className="flex items-center font-jakarta">
            <span className="ml-4 text-xs font-[100] font-semibold text-[10px] tracking-[0.18em] text-[#9b9b96]">
              HIRING WORKSPACE
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <a
            href="#pipeline"
            className="text-sm font-medium text-[#b8b6b0] transition hover:text-white font-semibold"
          >
            Pipeline
          </a>

          <a
            href="#engineering"
            className="text-sm font-medium text-[#b8b6b0] transition hover:text-white font-semibold"
          >
            Engineering
          </a>

          <a
            href="#proof"
            className="text-sm font-medium text-[#b8b6b0] transition hover:text-white font-semibold"
          >
            Proof
          </a>

          <Link
            to="/login"
            className="rounded-lg border border-[#91451f] px-5 py-3 text-sm font-semibold text-[#ff6b2c] transition hover:bg-[#ff6b2c] hover:text-[#151616]"
          >
            Open the app
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;