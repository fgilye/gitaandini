import "dotenv/config";
import Database from 'better-sqlite3';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './src/generated/prisma/client';

async function main() {
  console.log("Menghubungkan ke PostgreSQL (Supabase)...");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  
  console.log("Membaca data dari SQLite lokal (dev.db)...");
  const db = new Database('./dev.db', { fileMustExist: true });
  
  // Baca tabel Config
  const configs = db.prepare('SELECT * FROM Config').all() as any[];
  console.log(`Ditemukan ${configs.length} konfigurasi.`);
  
  // Baca tabel-tabel lainnya
  const educationItems = db.prepare('SELECT * FROM EducationItem').all() as any[];
  const experienceItems = db.prepare('SELECT * FROM ExperienceItem').all() as any[];
  const projects = db.prepare('SELECT * FROM ProjectItem').all() as any[];
  const organizations = db.prepare('SELECT * FROM OrganizationItem').all() as any[];
  const publications = db.prepare('SELECT * FROM PublicationItem').all() as any[];
  const skillItems = db.prepare('SELECT * FROM SkillItem').all() as any[];
  const certificates = db.prepare('SELECT * FROM Certificate').all() as any[];
  const hazardReports = db.prepare('SELECT * FROM HazardReport').all() as any[];
  const messages = db.prepare('SELECT * FROM Message').all() as any[];

  console.log("Memulai transfer data ke PostgreSQL...");

  // Transfer Config
  for (const c of configs) {
    await prisma.config.upsert({
      where: { key: c.key },
      update: { value: c.value },
      create: { key: c.key, value: c.value }
    });
  }

  // Helper untuk transfer data array
  async function transferTable(modelDelegate: any, items: any[], name: string) {
    console.log(`Mentransfer ${items.length} data ${name}...`);
    for (const item of items) {
      const { id, ...data } = item;
      try {
        await modelDelegate.create({ data });
      } catch (e: any) {
         console.log(`Gagal mentransfer item ${name}:`, e.message);
      }
    }
  }

  await transferTable(prisma.educationItem, educationItems, "EducationItem");
  await transferTable(prisma.experienceItem, experienceItems, "ExperienceItem");
  await transferTable(prisma.projectItem, projects, "ProjectItem");
  await transferTable(prisma.organizationItem, organizations, "OrganizationItem");
  await transferTable(prisma.publicationItem, publications, "PublicationItem");
  await transferTable(prisma.skillItem, skillItems, "SkillItem");
  await transferTable(prisma.certificate, certificates, "Certificate");
  await transferTable(prisma.hazardReport, hazardReports, "HazardReport");
  await transferTable(prisma.message, messages, "Message");

  console.log("Transfer selesai!");
}

main()
  .catch(e => {
    console.error("Terjadi kesalahan:", e);
    process.exit(1);
  })
  .finally(async () => {
    const { Pool } = await import('pg');
    const { PrismaPg } = await import('@prisma/adapter-pg');
    const { PrismaClient } = await import('./src/generated/prisma/client');
    
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });
    
    await prisma.$disconnect();
  });
