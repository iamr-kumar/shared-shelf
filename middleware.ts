import { passage } from '@/utils/passage';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get('psg_auth_token')?.value;

  if (!authToken) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  const userId = await passage.validAuthToken(authToken);
  if (!userId) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  const headers = new Headers(request.headers);
  headers.set('x-user-id', userId);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ['/shelf/:path*', '/api/:path*'],
};
