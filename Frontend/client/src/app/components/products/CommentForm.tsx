'use client'

import { AuthContext, User } from "@/context/AuthContext";
import { createComment } from "@/libs/apiUrls";
import { useContext, useState } from "react";


interface CommentFormProps {
    productId: string | undefined;
    onCommentAdded: () => void;
}


const CommentForm: React.FC<CommentFormProps> = ({ productId, onCommentAdded }) => {

    const [content, setContent] = useState<string>('');

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user, isAuthenticated } = authContext;



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated || !user) {
            console.error('User must be logged in to post a comment');
            return;
        }

        try {

            await createComment(user?._id, productId, content);
            setContent('');
            onCommentAdded();

        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="متن نظر..."
                        required
                        className="resize-none text-sm border-[1px] border-slate-300 outline-slate-500 rounded-md h-[10rem] p-3"
                    />
                    <button
                        type="submit"
                        className="disabled:opacity-70 disabled:cursor-not-allowed bg-slate-700 text-white py-2 rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2"
                    >
                        ثبت دیدگاه
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CommentForm