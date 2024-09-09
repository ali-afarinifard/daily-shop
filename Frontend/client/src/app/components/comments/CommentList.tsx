'use client'


// ** React
import { useEffect } from "react";

// ** apiSlice - RTK-Q
import { useGetCommentsQuery } from "@/store/apiSlice";

// ** MUI
import { Rating } from "@mui/material";

// ** Date FNS
import { formatDistanceToNow, parseISO } from 'date-fns';
import { faIR } from 'date-fns/locale';

// ** Components
import Spinner from "../Spinner";


interface CommentListProps {
    productId: string | undefined;
    commentsUpdated: boolean;
}


const CommentList: React.FC<CommentListProps> = ({ productId, commentsUpdated }) => {

    const { data: comments = [], refetch, isLoading } = useGetCommentsQuery(productId!, {
        skip: !productId,
    });


    useEffect(() => {
        if (commentsUpdated) {
            refetch();
        }
    }, [commentsUpdated, refetch]);

    if (isLoading) {
        <Spinner size={25} />
    };


    return (
        <div>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment._id}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-6">
                                    <p className="font-semibold">{comment?.user?.fullName || 'مهمان'}</p>
                                    <p className="text-xs text-slate-500">{formatDistanceToNow(parseISO(comment.createdAt), { addSuffix: true, locale: faIR })}</p>
                                </div>
                                <Rating
                                    value={comment.rating || 0}
                                    readOnly
                                    sx={{ direction: 'ltr' }}
                                />
                            </div>
                            <p className="text-slate-600">{comment.content}</p>
                        </div>
                        <hr className="my-4" />
                    </div>
                ))
            ) : (
                <p className="mt-10">هیچ دیدگاهی ثبت نشده</p>
            )}
        </div>
    )
}

export default CommentList