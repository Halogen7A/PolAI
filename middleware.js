import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const { data: { user } } = await supabase.auth.getUser();

    // Authenticated user trying to access home page
    if (user && req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/profile', req.url));
    }

    // Unauthenticated user trying to access profile page
    if (!user && req.nextUrl.pathname === '/profile') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return res;
}

export const config = {
    matcher: ['/', '/profile'],
};
