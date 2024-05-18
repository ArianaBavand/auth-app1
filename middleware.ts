import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  // const token = request.cookies.get('token');
  // if (!token) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // try {
  //   const res = verify(token.value, 'superdupersecret');
  //   request.user = {email: res.email, id: res.id};
  // } catch (err) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  // return NextResponse.redirect(new URL('/home', request.url));
  return NextResponse.next();
}

// export const config = {
//   matcher: '/api/jwt/*',
// };
