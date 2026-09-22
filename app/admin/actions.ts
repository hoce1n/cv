"use server";
import { db } from "@/lib/db";
import * as s from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { createAdminSession, clearAdminSession, isAdmin, verifyAdminPassword } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const fields = z.object({ table: z.string(), id: z.coerce.number().optional(), data: z.string() });
// The table map is dynamic because one form serves all schema tables.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tables: Record<string, any> = { personal_info: s.personalInfo, summary: s.summaries, skills: s.skills, experience: s.experiences, experience_bullets: s.experienceBullets, projects: s.projects, project_bullets: s.projectBullets, education: s.education, locale_visibility_config: s.localeVisibilityConfig };
const allowed = new Set(Object.keys(tables));
function parseData(raw: string) { const value = JSON.parse(raw); if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid data"); delete value.id; delete value.updatedAt; return value; }
export async function login(_: string | undefined, formData: FormData) { const password = String(formData.get("password") ?? ""); if (!verifyAdminPassword(password)) return "Invalid password"; await createAdminSession(); redirect("/admin"); }
export async function logout() { await clearAdminSession(); redirect("/admin/login"); }
export async function saveRecord(formData: FormData) { if (!(await isAdmin())) redirect("/admin/login"); const parsed = fields.parse({ table: formData.get("table"), id: formData.get("id") || undefined, data: formData.get("data") }); if (!allowed.has(parsed.table)) throw new Error("Unknown table"); const table = tables[parsed.table]; const data = parseData(parsed.data); if (parsed.id) await db.update(table).set(data).where(eq(table.id, parsed.id)); else await db.insert(table).values(data); revalidatePath("/admin"); }
export async function deleteRecord(formData: FormData) { if (!(await isAdmin())) redirect("/admin/login"); const tableName = String(formData.get("table")); const id = Number(formData.get("id")); if (!allowed.has(tableName) || !Number.isInteger(id)) throw new Error("Invalid record"); await db.delete(tables[tableName]).where(eq(tables[tableName].id, id)); revalidatePath("/admin"); }
