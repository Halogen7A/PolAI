import { cookies } from "next/headers";
import IdeaForm from "../components/IdeaList";
import UpdateIdea from "../components/UpdateIdea";
import {deleteIdea} from "../server-actions/deleteIdea"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import PoliticalTestButton from "../components/Test";

export default async function Profile() {

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const { data: { user }} = await supabase.auth.getUser();

    const {data: ideas, error} = await supabase
        .from('pols')
        .select('*')
        .eq('user_id', user.id)
        .order('idea', {ascending: true})

    if (error) {
        console.error("Error fetching ideas")
    }

    console.log(ideas)
    
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 dark:bg-gray-900 dark:text-white">
            <div className="max-w-screen-xl mx-auto bg-gray-800 shadow-lg rounded-lg p-6 dark:bg-gray-800 dark:border-gray-700">
                <h1 className="text-3xl font-bold mb-4">My Profile</h1>
                <form action="/auth/signout" method="post" className="mb-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
                    >
                        Sign Out
                    </button>
                </form>
                <PoliticalTestButton/>
                <h1 class="text-4xl font-bold text-center my-4">Add an Idea!</h1>
                <br></br>
                <IdeaForm />
                <div className="mt-8 space-y-4">
                    {ideas.map((idea) => (
                        <div
                            key={idea.id}
                            className="bg-gray-700 shadow-md rounded-lg p-4 border border-gray-600 dark:bg-gray-700 dark:border-gray-600"
                        >
                            <h2 className="text-xl font-semibold mb-2">{idea.idea}</h2>
                            <p className="text-gray-300 mb-4 dark:text-gray-300">{idea.description}</p>
                            <div className="flex items-center space-x-4">
                                <form action={deleteIdea}>
                                    <input type="hidden" name="id" value={idea.id} />
                                    <button
                                        type="submit"
                                        className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition duration-300"
                                    >
                                        Delete
                                    </button>
                                </form>
                                <UpdateIdea idea={idea} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
