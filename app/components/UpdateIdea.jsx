"use client"

import { useState } from "react";
import { editIdea } from "../server-actions/editIdea";

export default function UpdateIdea({ idea }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        idea: idea.idea,
        description: idea.description,
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <>
            <button 
                onClick={() => setShowModal(true)} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Edit
            </button>
            {showModal && (
                <div 
                    className="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300 ease-out opacity-100"
                    style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
                >
                    <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md relative transform transition-transform duration-300 ease-out scale-100">
                    <span className="close text-white text-xl leading-none hover:text-gray-300 cursor-pointer float-right" onClick={() => setShowModal(false)}>&times;</span>
                        <form action={editIdea} onSubmit={() => setShowModal(false)} className="mt-4">
                            <input type="hidden" name="id" value={idea.id} />
                            <div className="mb-4">
                                <label htmlFor="idea" className="block text-gray-300 mb-2">Idea</label>
                                <input
                                    type="text"
                                    id="idea"
                                    name="idea"
                                    value={formData.idea}
                                    onChange={handleChange}
                                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-300 mb-2">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Update Idea
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
