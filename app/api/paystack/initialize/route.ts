import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, amount, songTitle, songId } = await req.json()

    if (!email || !amount || !songTitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        // Paystack expects amount in kobo (KES pesewas = amount * 100)
        amount: Math.round(amount * 100),
        currency: 'KES',
        metadata: {
          song_title: songTitle,
          song_id: songId,
          custom_fields: [
            {
              display_name: 'Song',
              variable_name: 'song_title',
              value: songTitle,
            },
          ],
        },
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/albums?payment=success`,
        channels: ['card', 'mobile_money', 'ussd', 'bank_transfer'],
      }),
    })

    const data = await response.json()

    if (!data.status) {
      return NextResponse.json({ error: data.message }, { status: 400 })
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: data.data.reference,
    })
  } catch (err) {
    console.error('Paystack init error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
