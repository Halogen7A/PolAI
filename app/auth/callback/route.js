import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    const {searchParams} = new URL(req.url)

    const code = searchParams.get('code')

    if(code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(accessToken);
        if (error) {
            console.error('Error exchanging token for session:', error);
        }
        else {
            console.log('Session data:', data);
        }

    }
    return NextResponse.redirect(new URL('/profile', req.url))
}
