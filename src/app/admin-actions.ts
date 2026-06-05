"use server";

import { prisma } from "@/lib/db";
import { login as authLogin, logout as authLogout, isAuthenticated } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ─── Authentication ────────────────────────────────────────────────────────────

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const ok = await authLogin(password);
  if (!ok) {
    return { error: "Password salah. Coba lagi." };
  }
  redirect("/admin");
}

export async function logoutAction() {
  await authLogout();
  redirect("/login");
}

// ─── Guard helper ──────────────────────────────────────────────────────────────
async function requireAdmin() {
  const ok = await isAuthenticated();
  if (!ok) redirect("/login");
}

// ─── Config (Hero / About text) ────────────────────────────────────────────────

export async function getConfig() {
  return prisma.config.findMany();
}

export async function upsertConfig(key: string, value: string) {
  await requireAdmin();
  await prisma.config.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function upsertConfigBatch(pairs: { key: string; value: string }[]) {
  await requireAdmin();
  for (const { key, value } of pairs) {
    await prisma.config.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

// ─── Education ────────────────────────────────────────────────────────────────

export async function getEducationItems() {
  return prisma.educationItem.findMany({ orderBy: { id: "asc" } });
}

export async function upsertEducationItem(data: {
  id?: number;
  school: string;
  degree: string;
  major: string;
  period: string;
  gpa: string;
  description: string;
  highlights: string;
}) {
  await requireAdmin();
  if (data.id) {
    await prisma.educationItem.update({ where: { id: data.id }, data });
  } else {
    await prisma.educationItem.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteEducationItem(id: number) {
  await requireAdmin();
  await prisma.educationItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// ─── Experience ───────────────────────────────────────────────────────────────

export async function getExperienceItems() {
  return prisma.experienceItem.findMany({ orderBy: { id: "asc" } });
}

export async function upsertExperienceItem(data: {
  id?: number;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string;
  gallery: string;
}) {
  await requireAdmin();
  if (data.id) {
    await prisma.experienceItem.update({ where: { id: data.id }, data });
  } else {
    await prisma.experienceItem.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteExperienceItem(id: number) {
  await requireAdmin();
  await prisma.experienceItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export async function getSkillItems() {
  return prisma.skillItem.findMany({ orderBy: { id: "asc" } });
}

export async function upsertSkillItem(data: {
  id?: number;
  category: string;
  items: string;
}) {
  await requireAdmin();
  if (data.id) {
    await prisma.skillItem.update({ where: { id: data.id }, data });
  } else {
    await prisma.skillItem.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteSkillItem(id: number) {
  await requireAdmin();
  await prisma.skillItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function getProjectItems() {
  return prisma.projectItem.findMany({ orderBy: { id: "asc" } });
}

export async function upsertProjectItem(data: {
  id?: number;
  title: string;
  category: string;
  period: string;
  role: string;
  description: string;
  highlights: string;
  gallery: string;
}) {
  await requireAdmin();
  if (data.id) {
    await prisma.projectItem.update({ where: { id: data.id }, data });
  } else {
    await prisma.projectItem.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProjectItem(id: number) {
  await requireAdmin();
  await prisma.projectItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// ─── Organizations ────────────────────────────────────────────────────────────

export async function getOrganizationItems() {
  return prisma.organizationItem.findMany({ orderBy: { id: "asc" } });
}

export async function upsertOrganizationItem(data: {
  id?: number;
  title: string;
  role: string;
  period: string;
  desc: string;
  details: string;
  highlights: string;
  gallery: string;
}) {
  await requireAdmin();
  if (data.id) {
    await prisma.organizationItem.update({ where: { id: data.id }, data });
  } else {
    await prisma.organizationItem.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteOrganizationItem(id: number) {
  await requireAdmin();
  await prisma.organizationItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// ─── Publications ─────────────────────────────────────────────────────────────

export async function getPublicationItems() {
  return prisma.publicationItem.findMany({ orderBy: { id: "asc" } });
}

export async function upsertPublicationItem(data: {
  id?: number;
  title: string;
  journal: string;
  year: string;
  type: string;
  details: string;
  highlights: string;
}) {
  await requireAdmin();
  if (data.id) {
    await prisma.publicationItem.update({ where: { id: data.id }, data });
  } else {
    await prisma.publicationItem.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deletePublicationItem(id: number) {
  await requireAdmin();
  await prisma.publicationItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// ─── Messages (read-only in admin) ────────────────────────────────────────────

export async function getMessages() {
  await requireAdmin();
  return prisma.message.findMany({ orderBy: { createdAt: "desc" } });
}

export async function deleteMessage(id: number) {
  await requireAdmin();
  await prisma.message.delete({ where: { id } });
  revalidatePath("/admin");
}

// ─── Seeding ──────────────────────────────────────────────────────────────────

export async function runSeed() {
  await requireAdmin();
  const { seedDatabase } = await import("@/lib/seed");
  await seedDatabase();
  revalidatePath("/");
  revalidatePath("/admin");
}

// ─── File Upload ──────────────────────────────────────────────────────────────

export async function uploadImageAction(formData: FormData) {
  await requireAdmin();
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // We need to import fs and path. We can use dynamic import or require to avoid cluttering the top.
  const fs = require("fs/promises");
  const path = require("path");

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  
  try {
    await fs.mkdir(uploadsDir, { recursive: true });
  } catch (e) {
    // directory might already exist
  }

  const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const filename = `${uniquePrefix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const filepath = path.join(uploadsDir, filename);

  await fs.writeFile(filepath, buffer);
  
  return `/uploads/${filename}`;
}
