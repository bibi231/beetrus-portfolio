import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const { email, subject, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    if (!resend) {
      console.warn("RESEND_API_KEY is not set. Simulating success.");
      return NextResponse.json({ success: true, simulated: true });
    }

    const data = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>', // Update with verified domain later
      to: ['bitrusgadzama02@gmail.com'],
      subject: `New Signal: ${subject || 'General Inquiry'}`,
      text: `From: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    return NextResponse.json(
      { success: true, id: data.data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('[CONTACT ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
