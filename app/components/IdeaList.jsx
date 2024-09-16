import { useState } from 'react';
import { addIdea } from "../server-actions/addIdea";
import WysiwygEditor from '../components/WYSIWYGEditor'

export default function IdeaForm() {
    const [description, setDescription] = useState('');

    return (
        <form action={addIdea} className="bg-gray-800 p-6 rounded-lg shadow-md max-w mx-auto">
            {/* Idea Input */}
            <div className="mb-4">
                <label htmlFor="idea" className="block text-gray-300 text-sm font-semibold mb-2">
                    Idea
                </label>
                <input
                    type="text"
                    id="idea"
                    name="idea"
                    required
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* WYSIWYG Editor for Description */}
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-300 text-sm font-semibold mb-2">
                    Description
                </label>
                {/* WysiwygEditor */}
                <WysiwygEditor
                    value={description}  // Initial value of the editor
                    onChange={setDescription}  // Update the state with editor content
                />
                {/* Hidden input to store description content for form submission */}
                <input
                    type="hidden"
                    name="description"
                    value={description}
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Add Idea
            </button>
        </form>
    );
}
