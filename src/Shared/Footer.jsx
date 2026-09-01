function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#151616] text-[#f5f1ea]">
      {/* Main footer content */}
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between">
        {/* Logo + tagline */}
        <div className="flex items-center gap-3">
          <img
            src="./src/assets/logo.svg"
            alt="TalentDesk Logo"
            className="h-8 w-8 object-contain"
          />

          <span className="font-fraunces text-lg font-bold">
            Talent<span className="text-[#ff6b2c]">Desk</span>
          </span>

          <span className="hidden text-xs text-gray-500 md:block">
            The hiring workspace with a clear next step.
          </span>
        </div>

        {/* Footer navigation */}
        <nav className="flex flex-wrap items-center gap-6 text-xs text-gray-400">
          <a href="#pipeline" className="transition hover:text-[#ff6b2c]">
            Pipeline
          </a>

          <a href="#engineering" className="transition hover:text-[#ff6b2c]">
            Engineering
          </a>

          <a href="#proof" className="transition hover:text-[#ff6b2c]">
            Proof
          </a>

          <a className="px-4 py-2 transition hover:bg-[#ff6b2c] hover:text-[#151616]">
            Open the app
          </a>
        </nav>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-white/10 w-full">
        <div className="mx-auto max-w-[1180px] px-6 py-5  flex items-center justify-center">
          <p className="text-xs text-gray-500">
            copyright ©️ 2026 TalentDesk · Capstone home
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
