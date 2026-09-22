import Link from "next/link";

const routes = [
  {
    href: "/cv/fa",
    kicker: "FA",
    label: "رزومه فارسی",
    detail: "Public Persian CV, ready to print.",
  },
  {
    href: "/cv/en",
    kicker: "EN",
    label: "English CV",
    detail: "Public English CV, ready to print.",
  },
  {
    href: "/admin",
    kicker: "Edit",
    label: "Admin panel",
    detail: "Update content, visibility, and records.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background px-5 py-8 text-foreground sm:px-10 lg:px-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(28,25,23,0.08) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl flex-col justify-between border border-border bg-card px-6 py-8 shadow-[0_24px_80px_rgba(28,25,23,0.08)] sm:px-10 lg:px-14 lg:py-12">
        <header className="flex items-center justify-between gap-4 border-b border-border pb-6">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            CV Studio
          </p>
          <span className="border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            FA / EN
          </span>
        </header>

        <section className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] lg:items-end lg:gap-16 lg:py-16">
          <div>
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
              Bilingual resume workspace
            </p>
            <h1 className="max-w-[14ch] font-serif text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.04em] text-foreground">
              One story. Two languages. Print-ready.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Edit once, publish a calm Persian and English CV from the same source of truth.
            </p>
          </div>
          <aside className="border-t border-border pt-6 text-sm leading-7 text-muted-foreground lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <p>
              Locale-specific copy lives per language. Visibility rules stay centralized so both versions render reliably.
            </p>
          </aside>
        </section>

        <nav aria-label="CV Studio routes" className="grid gap-px border border-border bg-border sm:grid-cols-3">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="group flex min-h-44 flex-col justify-between bg-card p-5 transition-colors duration-200 hover:bg-muted focus-visible:bg-muted sm:p-6"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{route.kicker}</span>
              <span>
                <span className="block font-serif text-2xl leading-tight tracking-[-0.02em]">{route.label}</span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">{route.detail}</span>
              </span>
              <span aria-hidden="true" className="font-mono text-sm text-accent transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
