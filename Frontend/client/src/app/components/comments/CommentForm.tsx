'use client'

import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react"
import toast from "react-hot-toast";
import Heading from "../Heading";
import { Rating } from "@mui/material";
import { useCreateCommentMutation } from "@/store/apiSlice";



interface CommentFormProps {
    productId: string | undefined;
    onCommentAdded: () => void;
}


const CommentForm: React.FC<CommentFormProps> = ({ productId, onCommentAdded }) => {

    const [content, setContent] = useState<string>('');
    const [rating, setRating] = useState<number | null>(null);

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user, isAuthenticated } = authContext;


    const [createComment] = useCreateCommentMutation();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated || !user) {
            console.error('User must be logged in to post a comment');
            toast.error('ابتدا در سایت عضو شوید');
            return;
        };

        if (rating === null) { // Ensure rating is selected
            toast.error('لطفا امتیاز دهید');
            return;
        };

        try {

            await createComment({
                userId: user?._id,
                productId,
                content,
                rating,
            }).unwrap();
            
            setContent('');
            setRating(null);
            onCommentAdded();
            toast.success('دیدگاه با موفقیت ثبت شد');
            // window.location.reload();

        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    }


    return (
        <div className="sticky top-28">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="w-fit">
                        <Heading title="امتیاز و دیدگاه کاربران" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-start">
                            <Rating
                                value={rating || 0}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                                sx={{ direction: 'ltr', fontSize: '1.8rem' }}
                            />
                        </div>
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
                </div>
            </form>
        </div>
    )
}

export default CommentForm