import {
  boolean,
  date,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const personalInfo = pgTable('personal_info', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone'),
  email: text('email'),
  links: jsonb('links')
    .$type<{ label: string; url: string }[]>()
    .notNull()
    .default([]),
  photoUrl: text('photo_url'),
  birthdate: date('birthdate'),
  militaryStatus: text('military_status'),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const summaries = pgTable(
  'summary',
  {
    id: serial('id').primaryKey(),
    locale: text('locale').notNull(),
    professionalTitle: text('professional_title'),
    text: text('text').notNull(),
  },
  (table) => [uniqueIndex('summary_locale_idx').on(table.locale)]
);

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  category: text('category').notNull(),
  items: jsonb('items').$type<string[]>().notNull().default([]),
  displayOrder: integer('display_order').notNull().default(0),
});

export const experiences = pgTable('experience', {
  id: serial('id').primaryKey(),
  company: text('company').notNull(),
  title: text('title').notNull(),
  location: text('location'),
  startDate: date('start_date'),
  endDate: date('end_date'),
  displayOrder: integer('display_order').notNull().default(0),
});

export const experienceBullets = pgTable('experience_bullets', {
  id: serial('id').primaryKey(),
  experienceId: integer('experience_id')
    .notNull()
    .references(() => experiences.id, { onDelete: 'cascade' }),
  locale: text('locale').notNull(),
  text: text('text').notNull(),
  displayOrder: integer('display_order').notNull().default(0),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  url: text('url'),
  repoUrl: text('repo_url'),
  displayOrder: integer('display_order').notNull().default(0),
});

export const projectBullets = pgTable('project_bullets', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  locale: text('locale').notNull(),
  text: text('text').notNull(),
  displayOrder: integer('display_order').notNull().default(0),
});

export const education = pgTable('education', {
  id: serial('id').primaryKey(),
  institution: text('institution').notNull(),
  degree: text('degree').notNull(),
  field: text('field'),
  location: text('location'),
  startDate: date('start_date'),
  endDate: date('end_date'),
  displayOrder: integer('display_order').notNull().default(0),
});

export const languages = pgTable(
  'languages',
  {
    id: serial('id').primaryKey(),
    key: text('key').notNull(),
    displayOrder: integer('display_order').notNull().default(0),
  },
  (table) => [uniqueIndex('languages_key_idx').on(table.key)]
);

export const languageDetails = pgTable('language_details', {
  id: serial('id').primaryKey(),
  languageId: integer('language_id')
    .notNull()
    .references(() => languages.id, { onDelete: 'cascade' }),
  locale: text('locale').notNull(),
  name: text('name').notNull(),
  proficiency: text('proficiency').notNull(),
});

export const localeVisibilityConfig = pgTable(
  'locale_visibility_config',
  {
    id: serial('id').primaryKey(),
    locale: text('locale').notNull(),
    showPhoto: boolean('show_photo').notNull().default(false),
    showBirthdate: boolean('show_birthdate').notNull().default(false),
    showMilitaryStatus: boolean('show_military_status')
      .notNull()
      .default(false),
  },
  (table) => [uniqueIndex('locale_visibility_locale_idx').on(table.locale)]
);

export type Locale = 'fa' | 'en';
export type Link = { label: string; url: string };
export type PersonalInfo = typeof personalInfo.$inferSelect;
export type Summary = typeof summaries.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type ExperienceBullet = typeof experienceBullets.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type ProjectBullet = typeof projectBullets.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Language = typeof languages.$inferSelect;
export type LanguageDetail = typeof languageDetails.$inferSelect;
export type LocaleVisibilityConfig = typeof localeVisibilityConfig.$inferSelect;
