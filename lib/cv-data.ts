import { and, asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  education,
  experienceBullets,
  experiences,
  localeVisibilityConfig,
  personalInfo,
  projectBullets,
  projects,
  skills,
  summaries,
  type Locale,
} from "@/lib/db/schema";

export async function getCvData(locale: Locale) {
  const [personal, summary, skillRows, experienceRows, projectRows, educationRows, visibility] = await Promise.all([
    db.select().from(personalInfo).limit(1),
    db.select().from(summaries).where(eq(summaries.locale, locale)).limit(1),
    db.select().from(skills).orderBy(asc(skills.displayOrder), asc(skills.id)),
    db.select().from(experiences).orderBy(asc(experiences.displayOrder), asc(experiences.id)),
    db.select().from(projects).orderBy(asc(projects.displayOrder), asc(projects.id)),
    db.select().from(education).orderBy(asc(education.displayOrder), asc(education.id)),
    db.select().from(localeVisibilityConfig).where(eq(localeVisibilityConfig.locale, locale)).limit(1),
  ]);

  const [experienceBulletRows, projectBulletRows] = await Promise.all([
    experienceRows.length
      ? db.select().from(experienceBullets).where(and(eq(experienceBullets.locale, locale))).orderBy(asc(experienceBullets.displayOrder), asc(experienceBullets.id))
      : Promise.resolve([]),
    projectRows.length
      ? db.select().from(projectBullets).where(and(eq(projectBullets.locale, locale))).orderBy(asc(projectBullets.displayOrder), asc(projectBullets.id))
      : Promise.resolve([]),
  ]);

  return {
    personal: personal[0] ?? null,
    summary: summary[0] ?? null,
    skills: skillRows,
    experiences: experienceRows.map((experience) => ({
      ...experience,
      bullets: experienceBulletRows.filter((bullet) => bullet.experienceId === experience.id),
    })),
    projects: projectRows.map((project) => ({
      ...project,
      bullets: projectBulletRows.filter((bullet) => bullet.projectId === project.id),
    })),
    education: educationRows,
    visibility: visibility[0] ?? null,
  };
}

export type CvData = Awaited<ReturnType<typeof getCvData>>;
