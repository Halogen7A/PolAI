'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function saveTest({ questions, answers, result }) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const { data: { user }} = await supabase.auth.getUser();

    if (!user) {
        console.error("User is not authenticated within saveTest server action");
        return;
    }

    const { error } = await supabase
        .from('political_tests')
        .insert([
            {
                user_id: user.id,
                questions,
                answers,
                result
            }
        ]);

    if (error) {
        console.error('Error saving test data', error);
        return;
    }

    revalidatePath('/profile');
    return { message: 'Success' };
}
