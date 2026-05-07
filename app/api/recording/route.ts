import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || !id.startsWith('RE')) {
    return new NextResponse('Invalid recording ID', { status: 400 });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    return new NextResponse('Server configuration error', { status: 500 });
  }

  const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Recordings/${id}.mp3`;
  const credentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  const response = await fetch(twilioUrl, {
    headers: { Authorization: `Basic ${credentials}` },
  });

  if (!response.ok) {
    return new NextResponse('Recording not found', { status: 404 });
  }

  const audioBuffer = await response.arrayBuffer();

  return new NextResponse(audioBuffer, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': `inline; filename="recording-${id}.mp3"`,
    },
  });
}
