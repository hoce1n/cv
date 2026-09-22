import Link from 'next/link';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import * as s from '@/lib/db/schema';
import { isAdmin } from '@/lib/admin-auth';
import { logout } from './actions';
import { AdminRecordForm } from '@/components/admin-record-form';

const configs = [
  ['personal_info', 'Personal information', s.personalInfo],
  ['summary', 'Per-locale summaries', s.summaries],
  ['skills', 'Skills by category', s.skills],
  ['experience', 'Experience', s.experiences],
  ['experience_bullets', 'Experience bullets', s.experienceBullets],
  ['projects', 'Projects', s.projects],
  ['project_bullets', 'Project bullets', s.projectBullets],
  ['education', 'Education', s.education],
  ['languages', 'Languages', s.languages],
  ['language_details', 'Language details', s.languageDetails],
  ['locale_visibility_config', 'Locale visibility', s.localeVisibilityConfig],
] as const;

async function rows(table: (typeof configs)[number][2]) {
  return db.select().from(table);
}

export default async function AdminPage() {
  if (!(await isAdmin())) redirect('/admin/login');

  const sections = await Promise.all(
    configs.map(
      async ([table, label, definition]) =>
        [table, label, await rows(definition)] as const
    )
  );

  return (
    <main className="bg-background text-foreground min-h-dvh">
      <header className="border-border bg-card/95 sticky top-0 z-10 border-b backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div>
            <p className="text-muted-foreground font-mono text-[11px] font-medium tracking-[0.28em] uppercase">
              CV Studio
            </p>
            <h1 className="font-serif text-2xl tracking-[-0.03em]">
              Admin editor
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/cv/fa"
              className="border-border hover:bg-muted inline-flex h-11 items-center border px-3 text-sm"
            >
              Preview FA
            </Link>
            <Link
              href="/cv/en"
              className="border-border hover:bg-muted inline-flex h-11 items-center border px-3 text-sm"
            >
              Preview EN
            </Link>
            <form action={logout}>
              <button className="border-primary bg-primary text-primary-foreground hover:border-accent hover:bg-accent inline-flex h-11 items-center border px-3 text-sm">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-8 sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <nav
          aria-label="Editor sections"
          className="flex gap-2 overflow-x-auto lg:sticky lg:top-24 lg:block lg:h-fit lg:space-y-1 lg:overflow-visible"
        >
          {sections.map(([table, label, data]) => (
            <a
              key={table}
              href={`#${table}`}
              className="border-border bg-card hover:bg-muted inline-flex h-11 shrink-0 items-center border px-3 text-sm whitespace-nowrap lg:flex lg:w-full lg:justify-between"
            >
              <span>{label}</span>
              <span className="text-muted-foreground ml-3 font-mono text-[11px]">
                {data.length}
              </span>
            </a>
          ))}
        </nav>

        <div className="space-y-12">
          <p className="text-muted-foreground max-w-2xl text-sm leading-7">
            Manage every record directly. Values are validated as JSON against
            the database schema before writing.
          </p>

          {sections.map(([table, label, data]) => (
            <section key={table} id={table} className="scroll-mt-28 space-y-4">
              <div className="border-border border-b pb-3">
                <h2 className="font-serif text-3xl tracking-[-0.03em]">
                  {label}
                </h2>
                <p className="text-muted-foreground mt-1 font-mono text-[11px] tracking-[0.16em] uppercase">
                  {data.length} record{data.length === 1 ? '' : 's'}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {data.map((row) => (
                  <AdminRecordForm
                    key={row.id}
                    table={table}
                    label={label}
                    row={row as Record<string, unknown> & { id?: number }}
                  />
                ))}
                <AdminRecordForm table={table} label={label} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
