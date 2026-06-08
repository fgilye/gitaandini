"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

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

    // Send email using nodemailer if configured
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO } = process.env;

    // Fetch contact email destination from DB
    const destinationEmailRecord = await prisma.config.findUnique({
      where: { key: "contact_email" }
    });
    const destinationEmail = destinationEmailRecord?.value || SMTP_TO || SMTP_USER;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const mailOptions = {
        from: '"Notifikasi Portfolio" <noreply@portfolio-gita.com>', // sender name and noreply address
        to: destinationEmail, // list of receivers
        replyTo: data.email, // so when user clicks reply, it replies to the sender
        subject: `Pesan Baru: ${data.subject} - dari ${data.name}`,
        text: `Anda mendapat pesan baru dari portfolio!\n\nNama: ${data.name}\nEmail: ${data.email}\nSubjek: ${data.subject}\n\nPesan:\n${data.message}`,
        html: `
<div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E8E2D5; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
  <div style="background-color: #6B0F0F; padding: 24px; text-align: center;">
    <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">Pesan Baru Portfolio</h1>
  </div>
  <div style="background-color: #FDFBF7; padding: 32px 24px;">
    <p style="color: #66756F; font-size: 14px; margin-top: 0;">Halo,</p>
    <p style="color: #0B1D17; font-size: 15px; line-height: 1.6;">Anda baru saja menerima pesan baru melalui form kontak di website portfolio Anda.</p>
    
    <div style="background-color: #ffffff; border: 1px solid #E8E2D5; border-radius: 8px; padding: 20px; margin: 24px 0;">
      <h3 style="margin-top: 0; color: #6B0F0F; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #E8E2D5; padding-bottom: 10px;">Detail Pengirim</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #66756F; font-size: 13px; width: 80px;"><strong>Nama</strong></td>
          <td style="padding: 8px 0; color: #0B1D17; font-size: 14px; font-weight: 500;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #66756F; font-size: 13px;"><strong>Email</strong></td>
          <td style="padding: 8px 0; color: #0B1D17; font-size: 14px;">
            <a href="mailto:${data.email}" style="color: #6B0F0F; text-decoration: none; font-weight: 500;">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #66756F; font-size: 13px;"><strong>Subjek</strong></td>
          <td style="padding: 8px 0; color: #0B1D17; font-size: 14px; font-weight: 500;">${data.subject}</td>
        </tr>
      </table>
    </div>

    <h3 style="color: #0B1D17; font-size: 14px; margin-bottom: 8px;">Isi Pesan:</h3>
    <div style="background-color: #ffffff; border-left: 4px solid #6B0F0F; padding: 16px; border-radius: 0 8px 8px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
      <p style="color: #0B1D17; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0;">${data.message}</p>
    </div>
    
    <div style="margin-top: 32px; text-align: center;">
      <a href="mailto:${data.email}" style="display: inline-block; background-color: #6B0F0F; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 10px rgba(107, 15, 15, 0.2);">Balas Pesan Ini</a>
    </div>
  </div>
  
  <div style="background-color: #E8E2D5; padding: 16px; text-align: center;">
    <p style="color: #66756F; font-size: 11px; margin: 0; font-family: monospace;">Pesan ini dikirim secara otomatis dari sistem website Anda. Harap tidak membalas langsung ke alamat noreply ini.</p>
  </div>
</div>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email notification sent successfully.");
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // We don't fail the submission if email fails, just log it
      }
    }

    return { success: true, msg };
  } catch (error) {
    console.error("Failed to submit contact message:", error);
    return { success: false, error: "Gagal mengirimkan pesan." };
  }
}
