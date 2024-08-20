'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addIdea(formData) {
    const idea = formData.get('idea')
    const description = formData.get('description')

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const { data: { user }} = await supabase.auth.getUser();

    if(!user) {
        console.error("User is not authenticated within addIdea server action")
        return
    }

    const {data, error} = await supabase
        .from('pols')
        .insert([
            {
                idea,
                description,
                user_id: user.id
            }
        ])

    if(error) {
        console.error('Error inserting data', error)
        return;
    }

    revalidatePath('/profile')
    return {message: 'Success'}
}
