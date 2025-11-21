import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// GET /api/links  → List all links
export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM links ORDER BY created_at DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch links', info: error.message },
      { status: 500 }
    );
  }
}

// POST /api/links  → Create new short link
export async function POST(request) {
  try {
    const body = await request.json();
    const { target_url, code: customCode } = body;

    if (!target_url || !/^https?:\/\/.+/.test(target_url)) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    const randomCode = () =>
      Math.random().toString(36).substring(2, 8);

    let code = customCode || randomCode();

    if (customCode && !/^[a-zA-Z0-9]{6,8}$/.test(customCode)) {
      return NextResponse.json(
        { error: 'Custom code must be 6-8 alphanumeric characters' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'INSERT INTO links (code, target_url) VALUES ($1, $2) RETURNING *',
      [code, target_url]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'Code already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create link', info: error.message },
      { status: 500 }
    );
  }
}
