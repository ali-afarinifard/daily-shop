'use client'


import { getComments } from "@/libs/apiUrls";
import CommentType from "@/types/comment";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { faIR } from 'date-fns/locale';


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
                    <>
                        <div key={comment._id} className="mb-4 flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-6">
                                    <p className="font-semibold">{comment?.user?.fullName || 'مهمان'}</p>
                                    <p className="text-xs text-slate-500">
                                        {formatDistanceToNow(parseISO(comment.createdAt), { addSuffix: true, locale: faIR })}
                                    </p>
                                </div>
                                <Rating
                                    value={comment.rating}
                                    readOnly
                                    sx={{ direction: 'ltr' }}
                                />
                            </div>
                            <p className="text-slate-600">{comment.content}</p>
                        </div>
                        <hr className="my-4" />
                    </>
                ))
            ) : (
                <p>هیچ دیدگاهی ثبت نشده</p>
            )}
        </div>
    )
}

export default CommentList