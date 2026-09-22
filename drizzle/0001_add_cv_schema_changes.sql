ALTER TABLE "summary" ADD COLUMN "professional_title" text;
--> statement-breakpoint
ALTER TABLE "experience_bullets" ADD CONSTRAINT "experience_bullets_experience_id_experience_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "project_bullets" ADD CONSTRAINT "project_bullets_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE TABLE "languages" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "language_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"language_id" integer NOT NULL,
	"locale" text NOT NULL,
	"name" text NOT NULL,
	"proficiency" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "language_details" ADD CONSTRAINT "language_details_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE UNIQUE INDEX "languages_key_idx" ON "languages" USING btree ("key");
