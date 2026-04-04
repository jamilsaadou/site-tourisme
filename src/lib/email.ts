import nodemailer from "nodemailer";

type LeadMailPayload = {
  type: "CONTACT" | "CIRCUIT_REQUEST";
  fullName: string;
  email: string;
  phone: string;
  message: string;
  locale: string;
};

function hasSmtpConfig() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendLeadNotification(payload: LeadMailPayload) {
  if (!hasSmtpConfig()) {
    console.log("[lead-notification:log]", payload);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const to = process.env.SMTP_TO ?? process.env.SMTP_FROM;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: `[Tourisme Niger] Nouveau lead ${payload.type}`,
    text: `Type: ${payload.type}\nNom: ${payload.fullName}\nEmail: ${payload.email}\nTelephone: ${payload.phone}\nLangue: ${payload.locale}\nMessage: ${payload.message}`,
  });
}
