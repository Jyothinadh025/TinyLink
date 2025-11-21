import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Allow healthz to pass through
  if (path === '/healthz') {
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
