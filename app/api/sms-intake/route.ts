import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Called by the Twilio SMS Function when a user replies with case details.
// Secured with a shared secret so only the Twilio Function can trigger it.
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('x-intake-secret');
    if (authHeader !== process.env.INTAKE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { from, body } = await req.json();

    if (!from || !body) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'TWIY Health <sales@twiyhealth.com>',
      to: 'sales@twiyhealth.com',
      subject: `New SMS Case Intake — ${from}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="color: #0a1a3a; border-bottom: 2px solid #B7E4FA; padding-bottom: 12px;">
            New SMS Case Intake
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #555; width: 160px;"><strong>From (SMS)</strong></td>
              <td style="padding: 8px 0;"><a href="sms:${from}">${from}</a></td>
            </tr>
          </table>
          <div style="margin-top: 24px;">
            <strong style="color: #555;">Message:</strong>
            <p style="margin-top: 8px; padding: 16px; background: #f5f9ff; border-left: 3px solid #B7E4FA; border-radius: 4px; white-space: pre-wrap;">${body.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>
          <p style="margin-top: 32px; font-size: 12px; color: #999;">
            Received via SMS intake — twiyhealth.com
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SMS intake email error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
