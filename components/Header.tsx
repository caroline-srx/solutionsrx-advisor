export default function Header() {
  return (
    <header className="w-full bg-[#002868] shadow-md">
      <div className="max-w-2xl mx-auto px-4 py-5 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/SolutionsRX-Logo-020926_White.png"
          alt="SolutionsRx®"
          width={180}
          className="h-auto"
        />
      </div>
    </header>
  )
}
