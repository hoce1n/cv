import Link from "next/link";

const routes = [
  { href: "/cv/fa", label: "رزومه فارسی", detail: "Public, printable CV" },
  { href: "/cv/en", label: "English CV", detail: "Public, printable CV" },
  { href: "/admin", label: "Admin panel", detail: "Edit your CV content" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3f0ea] px-6 py-12 text-[#1f2924] sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col justify-between rounded-[2rem] border border-[#d7d0c5] bg-[#fbfaf7] p-8 shadow-[0_24px_80px_rgba(56,47,34,0.08)] sm:p-12 lg:p-16">
        <header className="flex items-center justify-between border-b border-[#ded8ce] pb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#68756c]">CV Studio</p>
          <span className="rounded-full bg-[#e3ebe1] px-3 py-1 text-xs font-medium text-[#45604c]">Bilingual workspace</span>
        </header>

        <section className="grid gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-[#9b6e42]">Your professional story, structured</p>
            <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-[#1f2924] sm:text-7xl">
              A calm home for the work that defines you.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#68756c]">
              A database-backed foundation for editing one CV and publishing it cleanly in Persian and English.
            </p>
          </div>
          <div className="border-l border-[#ded8ce] pl-6 text-sm leading-7 text-[#68756c]">
            <p>Content is stored per locale where language changes, while visibility settings stay centralized for reliable rendering.</p>
          </div>
        </section>

        <nav aria-label="CV Studio routes" className="grid gap-3 border-t border-[#ded8ce] pt-6 sm:grid-cols-3">
          {routes.map((route) => (
            <Link key={route.href} href={route.href} className="group rounded-2xl border border-[#ded8ce] bg-white/70 p-5 transition-colors hover:border-[#9b6e42] hover:bg-[#f6f1e9]">
              <span className="block text-base font-semibold text-[#1f2924]">{route.label}</span>
              <span className="mt-2 block text-sm text-[#68756c]">{route.detail}</span>
              <span aria-hidden="true" className="mt-6 block text-[#9b6e42] transition-transform group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
