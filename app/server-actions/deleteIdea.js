'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteIdea(formData) {
    const ideaId = formData.get('id')
    

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const { data: { user }} = await supabase.auth.getUser();

    if(!user) {
        console.error("User is not authenticated within deleteIdea server action")
        return
    }

    const {error} = await supabase
        .from('pols')
        .delete()
        .match({id: ideaId, user_id: user.id});

    if(error) {
        console.error('Error deleting data', error)
        return;
    }

    revalidatePath('/profile')
    return {message: 'Success'}
}
