import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, productId, productName } = await request.json();

    if (!email || !productId) {
      return NextResponse.json(
        { error: 'Email and Product ID are required' },
        { status: 400 }
      );
    }

    // In a real implementation: you would insert carefully into Supabase waitlist here.
    // For now we simulate success. We can just log to the server.
    console.log(`[WAITLIST ADD] ${email} joined waitlist for ${productName} (${productId})`);

    return NextResponse.json(
      { success: true, message: 'Added to waitlist successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[WAITLIST ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
