
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';

const WysiwygEditor = ({ value, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic
        ],
        content: value,
        onUpdate: ({ editor }) => {
            // Send the editor content as HTML to the parent component
            onChange(editor.getHTML());
        }
    });

    return (
        <div className="rounded bg-gray-800 text-white border border-gray-700 p-4">
            <div className="mb-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`mr-2 p-1 ${editor.isActive('bold') ? 'bg-blue-500' : 'bg-gray-700'}`}
                >
                    Bold
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-1 ${editor.isActive('italic') ? 'bg-blue-500' : 'bg-gray-700'}`}
                >
                    Italic
                </button>
            </div>
            <EditorContent editor={editor} className="bg-gray-900 p-2 min-h-[150px] rounded" />
        </div>
    );
};

export default WysiwygEditor;
