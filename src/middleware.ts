import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
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

  // Check for authorization header
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    const expectedUser = process.env.ADMIN_EMAIL;
    const expectedPwd = process.env.ADMIN_PASSWORD;

    // Validate credentials
    if (user === expectedUser && pwd === expectedPwd) {
      return NextResponse.next();
    }
  }

  // If no auth or invalid auth, prompt for credentials
  return new NextResponse('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/products/:path*',
    '/api/gallery/:path*'
  ],
};
