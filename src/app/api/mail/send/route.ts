import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const secret = req.headers.get('x-mail-secret');
    const expectedSecret = process.env.MAIL_RELAY_SECRET || 'engnest_secret_mail_relay_2026';
    if (secret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized mail relay request' }, { status: 401 });
    }

    const body = await req.json();
    const { to, subject, html, text, from } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Missing required email fields: to, subject, html' },
        { status: 400 },
      );
    }

    const smtpUser = process.env.SMTP_USER || 'vanmanh8930@gmail.com';
    const smtpPass = (process.env.SMTP_PASS || 'rtpr qddq qjlj endl').replace(/\s+/g, '');
    const sender = from || `EngNest <${smtpUser}>`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    const info = await transporter.sendMail({
      from: sender,
      to,
      subject,
      html,
      text: text || '',
    });

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (err: any) {
    console.error('[MailRelay API Error]:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to send email via Gmail Relay' },
      { status: 500 },
    );
  }
}
