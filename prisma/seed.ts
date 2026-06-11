import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing
  await prisma.certificate.deleteMany();
  await prisma.hazardReport.deleteMany();
  await prisma.message.deleteMany();

  // Create certificates
  await prisma.certificate.createMany({
    data: [
      {
        title: "NEBOSH International General Certificate",
        issuer: "NEBOSH (National Examination Board in Occupational Safety and Health)",
        issueDate: "Januari 2024",
        expiryDate: "Seumur Hidup",
        credentialId: "NEBOSH-IGC-998877",
        category: "Occupational Safety",
        imageName: "nebosh",
      },
      {
        title: "ISO 45001 Lead Auditor (Occupational Health & Safety)",
        issuer: "IRCA / CQI (Chartered Quality Institute)",
        issueDate: "Mei 2023",
        expiryDate: "Mei 2028",
        credentialId: "LA45001-5544",
        category: "Auditing",
        imageName: "iso45001",
      },

      {
        title: "Basic First Aid & CPR Certification",
        issuer: "Palang Merah Indonesia (Red Cross)",
        issueDate: "November 2023",
        expiryDate: "November 2025",
        credentialId: "FA-CPR-3321",
        category: "First Aid",
        imageName: "firstaid",
      },
    ],
  });

  // Create default reports
  await prisma.hazardReport.createMany({
    data: [
      {
        reporter: "Andi Saputra",
        location: "Warehouse A - Rak 4",
        description: "Kabel daya pada forklift terkelupas, berisiko korsleting listrik.",
        severity: "High",
        status: "Under Review",
      },
      {
        reporter: "Siti Rahma",
        location: "Lobby Utama Lantai 2",
        description: "Lantai licin di dekat pintu masuk karena rembesan AC, belum ada tanda peringatan (wet floor sign).",
        severity: "Medium",
        status: "Reported",
      },
      {
        reporter: "Gita Andini",
        location: "Area Konstruksi Barat",
        description: "Pekerja tidak menggunakan safety harness saat bekerja di ketinggian > 2 meter. Instruksi kerja dihentikan sementara.",
        severity: "Critical",
        status: "Resolved",
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
