import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simple database query
    const result = await pool.query('SELECT NOW()');
    
    return NextResponse.json({ 
      success: true, 
      database: 'Connected!',
      time: result.rows[0]
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
