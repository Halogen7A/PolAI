import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    const {searchParams} = new URL(req.url)

    const accessToken = searchParams.get('access_token'); // Updated parameter

    if (accessToken) {
        const { error } = await supabase.auth.exchangeCodeForSession(accessToken);
        if (error) {
            console.error('Error exchanging token for session:', error);
            return NextResponse.redirect(new URL('/', req.url)); // Redirect to login on error
        }
    }
    return NextResponse.redirect(new URL('/profile', req.url))
}