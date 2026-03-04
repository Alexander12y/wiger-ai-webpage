import nodemailer from 'nodemailer'

export function createGmailTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_FROM_EMAIL,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  })
}

export interface LeadEmailData {
  name: string
  email: string
  company: string
  role: string
  phone?: string | null
  companySize: string
  industry: string
  howHeard?: string | null
  message: string
  source?: string | null
}

export async function sendLeadNotification(data: LeadEmailData) {
  const transporter = createGmailTransport()

  const howHeardLine = data.howHeard ? `\n¿Cómo nos conociste?   ${data.howHeard}` : ''
  const phoneLine = data.phone ? `\nTeléfono               ${data.phone}` : ''

  const text = `
Nuevo lead de contacto — Wiger AI
──────────────────────────────────

Nombre                 ${data.name}
Correo empresarial     ${data.email}${phoneLine}
Empresa                ${data.company}
Cargo / Puesto         ${data.role}
Tamaño de empresa      ${data.companySize}
Industria              ${data.industry}${howHeardLine}
Fuente                 ${data.source ?? 'desconocida'}

Mensaje:
${data.message}

──────────────────────────────────
Enviado automáticamente desde wiger.ai
  `.trim()

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#0E1C2F;padding:24px 32px;">
      <h1 style="color:#E8650A;font-size:20px;margin:0;">Nuevo lead — Wiger AI</h1>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#555;width:40%;">Nombre</td><td style="padding:8px 0;font-weight:600;color:#111;">${data.name}</td></tr>
        <tr style="background:#f9f9f9;"><td style="padding:8px 4px;color:#555;">Correo empresarial</td><td style="padding:8px 4px;"><a href="mailto:${data.email}" style="color:#E8650A;">${data.email}</a></td></tr>
        ${data.phone ? `<tr><td style="padding:8px 0;color:#555;">Teléfono</td><td style="padding:8px 0;color:#111;">${data.phone}</td></tr>` : ''}
        <tr style="background:#f9f9f9;"><td style="padding:8px 4px;color:#555;">Empresa</td><td style="padding:8px 4px;font-weight:600;color:#111;">${data.company}</td></tr>
        <tr><td style="padding:8px 0;color:#555;">Cargo / Puesto</td><td style="padding:8px 0;color:#111;">${data.role}</td></tr>
        <tr style="background:#f9f9f9;"><td style="padding:8px 4px;color:#555;">Tamaño de empresa</td><td style="padding:8px 4px;color:#111;">${data.companySize}</td></tr>
        <tr><td style="padding:8px 0;color:#555;">Industria</td><td style="padding:8px 0;color:#111;">${data.industry}</td></tr>
        ${data.howHeard ? `<tr style="background:#f9f9f9;"><td style="padding:8px 4px;color:#555;">¿Cómo nos conociste?</td><td style="padding:8px 4px;color:#111;">${data.howHeard}</td></tr>` : ''}
        <tr><td style="padding:8px 0;color:#555;">Fuente</td><td style="padding:8px 0;color:#111;">${data.source ?? 'desconocida'}</td></tr>
      </table>

      <div style="margin-top:24px;padding:16px;background:#f9f7f4;border-left:3px solid #E8650A;border-radius:4px;">
        <p style="font-size:12px;color:#888;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.1em;">Mensaje</p>
        <p style="font-size:14px;color:#333;margin:0;white-space:pre-wrap;">${data.message}</p>
      </div>
    </div>
    <div style="padding:16px 32px;background:#f0f0f0;text-align:center;">
      <p style="font-size:11px;color:#999;margin:0;">Enviado automáticamente desde wiger.ai</p>
    </div>
  </div>
</body>
</html>
  `.trim()

  await transporter.sendMail({
    from: `"Wiger AI" <${process.env.GMAIL_FROM_EMAIL}>`,
    to: process.env.CONTACT_EMAIL_TO,
    subject: `Nuevo lead: ${data.name} — ${data.company}`,
    text,
    html,
  })
}
