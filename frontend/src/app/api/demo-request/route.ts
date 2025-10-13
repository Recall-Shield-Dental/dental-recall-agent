import { NextRequest, NextResponse } from 'next/server';
import { AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE } from './airtableConfig';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { name, email, org } = await req.json();
    if (!name || !email || !org) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Airtable API call
    const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            Organization: org,
            RequestedAt: new Date().toISOString(),
          },
        }),
      }
    );
    if (!res.ok) {
      const error = await res.text();
      return NextResponse.json({ error: 'Airtable error', details: error }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
