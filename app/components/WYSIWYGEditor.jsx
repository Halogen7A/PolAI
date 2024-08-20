import { useForm } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function IdeaForm() {
    const { register, handleSubmit, setValue } = useForm();
    
    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
        onUpdate: ({ editor }) => {
            // Update the form value when the editor content changes
            setValue("description", editor.getHTML());
        },
    });

    const onSubmit = (data) => {
        console.log("Form data:", data);
        // You can then pass this data to your addIdea function or API
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="idea" className="block text-gray-300 text-sm font-semibold mb-2">
                    Idea
                </label>
                <input
                    type="text"
                    id="idea"
                    {...register("idea", { required: true })}
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-300 text-sm font-semibold mb-2">
                    Description
                </label>
                <div className="border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <EditorContent editor={editor} />
                </div>
                {/* Hidden input to store editor content */}
                <input
                    type="hidden"
                    {...register("description", { required: true })}
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Add Idea
            </button>
        </form>
    );
}

