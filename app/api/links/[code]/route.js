import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(request, context) {
  const { code } = await context.params;  // <-- Must use await here

  try {
    const result = await pool.query(
      'DELETE FROM links WHERE code = $1 RETURNING *',
      [code]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Link deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete link', info: error.message },
      { status: 500 }
    );
  }
}
