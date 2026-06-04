"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getCertificates() {
  try {
    return await prisma.certificate.findMany();
  } catch (error) {
    console.error("Failed to fetch certificates:", error);
    return [];
  }
}

export async function getHazardReports() {
  try {
    return await prisma.hazardReport.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch hazard reports:", error);
    return [];
  }
}

export async function submitHazardReport(data: {
  reporter: string;
  location: string;
  description: string;
  severity: string;
}) {
  try {
    const report = await prisma.hazardReport.create({
      data: {
        reporter: data.reporter,
        location: data.location,
        description: data.description,
        severity: data.severity,
        status: "Reported",
      },
    });
    revalidatePath("/");
    return { success: true, report };
  } catch (error) {
    console.error("Failed to submit hazard report:", error);
    return { success: false, error: "Gagal mengirimkan laporan bahaya." };
  }
}

export async function submitMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const msg = await prisma.message.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });
    return { success: true, msg };
  } catch (error) {
    console.error("Failed to submit contact message:", error);
    return { success: false, error: "Gagal mengirimkan pesan." };
  }
}
