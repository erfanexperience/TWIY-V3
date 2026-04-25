import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, organization, role, interest, message, consentTransactional, consentNotMarketing } = body;

    await resend.emails.send({
      from: 'TWIY Health <sales@twiyhealth.com>',
      to: 'sales@twiyhealth.com',
      replyTo: email,
      subject: `New Consultation Request — ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="color: #0a1a3a; border-bottom: 2px solid #B7E4FA; padding-bottom: 12px;">
            New Consultation Request
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 8px 0; color: #555; width: 160px;"><strong>Name</strong></td>
                <td style="padding: 8px 0;">${firstName} ${lastName}</td></tr>
            <tr><td style="padding: 8px 0; color: #555;"><strong>Email</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #555;"><strong>Phone</strong></td>
                <td style="padding: 8px 0;">${phone || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #555;"><strong>Organization</strong></td>
                <td style="padding: 8px 0;">${organization}</td></tr>
            <tr><td style="padding: 8px 0; color: #555;"><strong>Role</strong></td>
                <td style="padding: 8px 0;">${role || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #555;"><strong>Interest</strong></td>
                <td style="padding: 8px 0;">${interest || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #555;"><strong>SMS Consent</strong></td>
                <td style="padding: 8px 0;">${consentTransactional ? '✅ Gave transactional SMS consent' : '❌ Did not give SMS consent'}</td></tr>
            <tr><td style="padding: 8px 0; color: #555;"><strong>No-Marketing Ack</strong></td>
                <td style="padding: 8px 0;">${consentNotMarketing ? '✅ Acknowledged no marketing SMS' : '—'}</td></tr>
          </table>

          ${message ? `
          <div style="margin-top: 24px;">
            <strong style="color: #555;">Message:</strong>
            <p style="margin-top: 8px; padding: 16px; background: #f5f9ff; border-left: 3px solid #B7E4FA; border-radius: 4px;">
              ${message.replace(/\n/g, '<br/>')}
            </p>
          </div>` : ''}

          <p style="margin-top: 32px; font-size: 12px; color: #999;">
            Sent from twiyhealth.com consultation form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
