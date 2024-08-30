'use client'

import { getComments } from "@/libs/apiUrls";
import CommentType from "@/types/comment";
import { useEffect, useState } from "react";


interface CommentListProps {
    productId: string | undefined;
    commentsUpdated: boolean;
}



const CommentList: React.FC<CommentListProps> = ({ productId, commentsUpdated }) => {

    const [comments, setComments] = useState<CommentType[]>([]);


    useEffect(() => {
        const fetchComments = async () => {
            try {

                if (productId) {
                    const commentsData = await getComments(productId);
                    setComments(commentsData);
                }

            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [productId, commentsUpdated]);


    return (
        <div>
            {comments.length > 0 ? (
                comments.map(comment => (
                        <div key={comment._id} className="mb-4 flex flex-col gap-8">
                            <div className="flex items-center gap-6">
                                <p className="font-semibold">{comment?.user?.fullName || 'مهمان'}</p>
                                <p className="text-xs text-slate-500">{new Date(comment.createdAt).toLocaleString()}</p>
                            </div>
                            <p className="text-slate-600">{comment.content}</p>
                        </div>
                ))
            ) : (
                <p>هیچ دیدگاهی ثبت نشده</p>
            )}
        </div>
    )
}

export default CommentList