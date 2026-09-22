CREATE TABLE IF NOT EXISTS personal_info (
  id serial PRIMARY KEY,
  name text NOT NULL,
  phone text,
  email text,
  links jsonb NOT NULL DEFAULT '[]'::jsonb,
  photo_url text,
  birthdate date,
  military_status text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS summary (
  id serial PRIMARY KEY,
  locale text NOT NULL,
  text text NOT NULL,
  CONSTRAINT summary_locale_unique UNIQUE (locale)
);

CREATE TABLE IF NOT EXISTS skills (
  id serial PRIMARY KEY,
  category text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  display_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience (
  id serial PRIMARY KEY,
  company text NOT NULL,
  title text NOT NULL,
  location text,
  start_date date,
  end_date date,
  display_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience_bullets (
  id serial PRIMARY KEY,
  experience_id integer NOT NULL,
  locale text NOT NULL,
  text text NOT NULL,
  display_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id serial PRIMARY KEY,
  name text NOT NULL,
  url text,
  repo_url text,
  display_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS project_bullets (
  id serial PRIMARY KEY,
  project_id integer NOT NULL,
  locale text NOT NULL,
  text text NOT NULL,
  display_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS education (
  id serial PRIMARY KEY,
  institution text NOT NULL,
  degree text NOT NULL,
  field text,
  location text,
  start_date date,
  end_date date,
  display_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS locale_visibility_config (
  id serial PRIMARY KEY,
  locale text NOT NULL,
  show_photo boolean NOT NULL DEFAULT false,
  show_birthdate boolean NOT NULL DEFAULT false,
  show_military_status boolean NOT NULL DEFAULT false,
  CONSTRAINT locale_visibility_locale_unique UNIQUE (locale)
);

CREATE INDEX IF NOT EXISTS experience_bullets_experience_locale_idx ON experience_bullets (experience_id, locale);
CREATE INDEX IF NOT EXISTS project_bullets_project_locale_idx ON project_bullets (project_id, locale);
CREATE INDEX IF NOT EXISTS experience_order_idx ON experience (display_order);
CREATE INDEX IF NOT EXISTS projects_order_idx ON projects (display_order);
CREATE INDEX IF NOT EXISTS education_order_idx ON education (display_order);
