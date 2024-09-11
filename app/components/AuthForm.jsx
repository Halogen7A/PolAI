'use client';

import {Auth} from '@supabase/auth-ui-react';
import {useEffect} from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthForm(){
    const supabase = createClientComponentClient();
    useEffect(() => {
        const getSession = async () => {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (session) {
            console.log('Session found:', session);
            router.push('/profile');
          } else {
            console.log('No session found');
          }
        };
        getSession();
      }, []);
      
    return (
        <Auth
            supabaseClient={supabase}
            view="magic_link"
            showLinks={false}
            providers={[]}
            redirectTo='https://pol-ai.vercel.app/auth/callback'
        />
    )
}