// Metric card for employer dashboards. Value + label + supporting hint,
// with an icon tile. Only render numbers that come from real data.
function StatCard({ icon: Icon, label, value, hint, accent = false }) {
  return (
    <div
      className={`td-card group p-5 transition hover:-translate-y-0.5 ${
        accent ? "border-[#ff6b2c]/30" : "hover:border-white/20"
      }`}
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#aaa8a3]">
          {label}
        </span>
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
            accent
              ? "bg-[#ff6b2c] text-[#151616]"
              : "bg-[#ff6b2c]/10 text-[#ff6b2c] group-hover:bg-[#ff6b2c] group-hover:text-[#151616]"
          }`}
        >
          <Icon size={18} />
        </span>
      </div>
      <p className="font-fraunces text-4xl font-bold text-white">{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export default StatCard;
