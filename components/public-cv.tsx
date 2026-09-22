'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/db/schema';
import type { CvData } from '@/lib/cv-data';

const labels = {
  fa: {
    summary: 'خلاصه',
    skills: 'مهارت‌ها',
    experience: 'تجربه کاری',
    projects: 'پروژه‌های منتخب',
    education: 'تحصیلات',
    languages: 'زبان‌ها',
    download: 'دریافت PDF',
    phone: 'تلفن',
    email: 'ایمیل',
    birthdate: 'تاریخ تولد',
    military: 'وضعیت نظام وظیفه',
    switchEn: 'English',
    switchFa: 'فارسی',
    empty: 'محتوایی ثبت نشده است.',
  },
  en: {
    summary: 'Summary',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Selected Projects',
    education: 'Education',
    languages: 'Languages',
    download: 'Download as PDF',
    phone: 'Phone',
    email: 'Email',
    birthdate: 'Birthdate',
    military: 'Military status',
    switchEn: 'English',
    switchFa: 'فارسی',
    empty: 'No content yet.',
  },
} as const;

function formatDate(value: string | null, locale: Locale) {
  if (!value) return '';
  return new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
    year: 'numeric',
    month: 'short',
  }).format(new Date(`${value}T00:00:00`));
}

function dateRange(
  start: string | null,
  end: string | null,
  locale: Locale,
  present: string
) {
  const startLabel = formatDate(start, locale);
  if (!startLabel) return '';
  return `${startLabel} – ${formatDate(end, locale) || present}`;
}

export function PublicCv({ locale, data }: { locale: Locale; data: CvData }) {
  const t = labels[locale];
  const isFa = locale === 'fa';
  const visibility = data.visibility;
  const showPhoto = isFa && visibility?.showPhoto && data.personal?.photoUrl;
  const present = isFa ? 'اکنون' : 'Present';
  const links = data.personal?.links?.filter((link) => link?.url) ?? [];

  return (
    <main
      className={`cv-page ${isFa ? 'cv-rtl' : 'cv-ltr'}`}
      dir={isFa ? 'rtl' : 'ltr'}
    >
      <div className="cv-shell">
        <div className="cv-toolbar" aria-label="Document actions">
          <nav className="cv-locale" aria-label="Language">
            <Link href="/cv/fa" aria-current={isFa ? 'page' : undefined}>
              {t.switchFa}
            </Link>
            <Link href="/cv/en" aria-current={!isFa ? 'page' : undefined}>
              {t.switchEn}
            </Link>
          </nav>
          <button type="button" onClick={() => window.print()}>
            {t.download}
          </button>
        </div>

        <article className="cv-document">
          <header className="cv-header">
            <div>
              <p className="cv-kicker">Curriculum Vitae</p>
              <h1>{data.personal?.name || (isFa ? 'بدون نام' : 'Untitled')}</h1>
              {data.summary?.professionalTitle && (
                <p className="cv-subtitle">{data.summary.professionalTitle}</p>
              )}
              <div className="cv-meta">
                {data.personal?.phone && (
                  <p>
                    <strong>{t.phone}:</strong> {data.personal.phone}
                  </p>
                )}
                {data.personal?.email && (
                  <p>
                    <strong>{t.email}:</strong> {data.personal.email}
                  </p>
                )}
                {links.map((link) => (
                  <p key={`${link.label}-${link.url}`}>
                    <a href={link.url}>{link.label}</a>
                  </p>
                ))}
                {isFa &&
                  visibility?.showBirthdate &&
                  data.personal?.birthdate && (
                    <p>
                      <strong>{t.birthdate}:</strong>{' '}
                      {formatDate(data.personal.birthdate, locale)}
                    </p>
                  )}
                {isFa &&
                  visibility?.showMilitaryStatus &&
                  data.personal?.militaryStatus && (
                    <p>
                      <strong>{t.military}:</strong>{' '}
                      {data.personal.militaryStatus}
                    </p>
                  )}
              </div>
            </div>
            {showPhoto && (
              <Image
                className="cv-photo"
                src={data.personal.photoUrl!}
                alt={data.personal.name || ''}
                width={112}
                height={144}
              />
            )}
          </header>

          <section>
            <h2>{t.summary}</h2>
            {data.summary?.text ? (
              <p>{data.summary.text}</p>
            ) : (
              <p className="cv-empty">{t.empty}</p>
            )}
          </section>

          <section>
            <h2>{t.skills}</h2>
            {data.skills.length > 0 ? (
              <div className="cv-list">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <h3>{skill.category}</h3>
                    <p>
                      {skill.items.filter(Boolean).join(isFa ? '، ' : ', ')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="cv-empty">{t.empty}</p>
            )}
          </section>

          <section>
            <h2>{t.experience}</h2>
            {data.experiences.length > 0 ? (
              data.experiences.map((experience) => (
                <div className="cv-entry" key={experience.id}>
                  <div className="cv-entry-heading">
                    <h3>
                      {experience.title}
                      {experience.company ? ` — ${experience.company}` : ''}
                    </h3>
                    <p>
                      {[
                        experience.location,
                        dateRange(
                          experience.startDate,
                          experience.endDate,
                          locale,
                          present
                        ),
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </div>
                  {experience.bullets.length > 0 && (
                    <ul>
                      {experience.bullets.map((bullet) => (
                        <li key={bullet.id}>{bullet.text}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p className="cv-empty">{t.empty}</p>
            )}
          </section>

          <section>
            <h2>{t.projects}</h2>
            {data.projects.length > 0 ? (
              data.projects.map((project) => (
                <div className="cv-entry" key={project.id}>
                  <h3>{project.name}</h3>
                  {[project.url, project.repoUrl].filter(Boolean).length >
                    0 && (
                    <p>
                      {[project.url, project.repoUrl]
                        .filter(Boolean)
                        .map((link) => (
                          <a href={link!} key={link}>
                            {link}
                          </a>
                        ))}
                    </p>
                  )}
                  {project.bullets.length > 0 && (
                    <ul>
                      {project.bullets.map((bullet) => (
                        <li key={bullet.id}>{bullet.text}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p className="cv-empty">{t.empty}</p>
            )}
          </section>

          <section>
            <h2>{t.education}</h2>
            {data.education.length > 0 ? (
              data.education.map((item) => (
                <div className="cv-entry" key={item.id}>
                  <h3>
                    {[item.degree, item.field]
                      .filter(Boolean)
                      .join(isFa ? '، ' : ', ')}
                  </h3>
                  <p>
                    {[
                      item.institution,
                      item.location,
                      dateRange(item.startDate, item.endDate, locale, present),
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>
              ))
            ) : (
              <p className="cv-empty">{t.empty}</p>
            )}
          </section>

          <section>
            <h2>{t.languages}</h2>
            {data.languages.length > 0 ? (
              <div className="cv-list">
                {data.languages.map((language) => (
                  <div key={language.id}>
                    {language.details.map((detail) => (
                      <p key={detail.id}>
                        <strong>{detail.name}:</strong> {detail.proficiency}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <p className="cv-empty">{t.empty}</p>
            )}
          </section>
        </article>
      </div>
    </main>
  );
}
