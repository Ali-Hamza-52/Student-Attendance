import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
const protectedRoutes = [
  '/profile',
  '/s',
  '/settings',
  '/orders',
  '/purchases'
];

export const middleware = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  const token = request.cookies.get('teacherId')?.value;

  if (token && (url.pathname === '/login' || url.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && protectedRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};
