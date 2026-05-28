export default function Header() {
  return (
    <header className="w-full bg-[#002868] shadow-md">
      <div className="max-w-2xl mx-auto px-4 py-4 flex flex-col items-center text-center">
        {/* Pharmacy name placeholder */}
        <p className="text-white/70 text-xs font-medium tracking-widest uppercase mb-1">
          Your Pharmacy Name Here
        </p>

        {/* Brand name */}
        <h1 className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
          SolutionsRx<span className="text-[#bf0a30] align-super text-sm font-bold">®</span>
        </h1>

        {/* Tagline */}
        <p className="text-[#bf0a30] text-sm font-semibold tracking-wide mt-0.5">
          Pharmacist Formulated
        </p>

        {/* Sub-title */}
        <p className="text-white/80 text-xs mt-1 tracking-wide">
          Supplement Advisor
        </p>
      </div>
    </header>
  )
}
