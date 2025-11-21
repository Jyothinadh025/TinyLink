import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, context) {
  // Await context.params!
  const { code } = await context.params;
  console.log("REDIRECT DEBUG - looking for code:", code);

  try {
    const result = await pool.query(
      'SELECT * FROM links WHERE code = $1',
      [code]
    );

    if (result.rows.length === 0) {
      console.log("REDIRECT DEBUG - NOT FOUND:", code);
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }

    const link = result.rows[0];

    await pool.query(
      'UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code = $1',
      [code]
    );

    console.log("REDIRECT DEBUG - redirecting to:", link.target_url);
    return Response.redirect(link.target_url, 302);
  } catch (error) {
    console.log("REDIRECT DEBUG - ERROR:", error);
    return NextResponse.json(
      { error: 'Failed to redirect', info: error.message },
      { status: 500 }
    );
  }
}
