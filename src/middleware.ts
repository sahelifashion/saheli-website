import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Define protected paths
  const isAdminPath = path.startsWith('/admin');
  const isApiMutation = 
    (path.startsWith('/api/products') || path.startsWith('/api/gallery')) && 
    (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE');

  // If it's not a protected path, allow access
  if (!isAdminPath && !isApiMutation) {
    return NextResponse.next();
  }

  // Check for admin_session cookie
  const sessionToken = req.cookies.get('admin_session')?.value;
  const isAuthenticated = await verifyToken(sessionToken);

  if (isAuthenticated) {
    return NextResponse.next();
  }

  // If not authenticated:
  // For API mutations, return 401 JSON
  if (isApiMutation) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin session required' },
      { status: 401 }
    );
  }

  // For Admin pages, redirect to login
  const loginUrl = new URL('/login', req.url);
  return NextResponse.redirect(loginUrl);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/products/:path*',
    '/api/gallery/:path*'
  ],
};
