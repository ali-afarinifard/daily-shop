'use client'


// ** React
import { useEffect } from "react";

// ** apiSlice - RTK-Q
import { useGetCommentsQuery } from "@/store/apiSlice";

// ** MUI
import { Box, Divider, Rating, Typography } from "@mui/material";

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
        <Box>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <Box key={comment._id}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1.5rem'
                                    }}
                                >
                                    <Typography variant="h4">{comment?.user?.fullName || 'مهمان'}</Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>{formatDistanceToNow(parseISO(comment.createdAt), { addSuffix: true, locale: faIR })}</Typography>
                                </Box>
                                <Rating
                                    value={comment.rating || 0}
                                    readOnly
                                    sx={{ direction: 'ltr' }}
                                />
                            </Box>
                            <Typography variant="body1" sx={{ color: '#475569' }}>{comment.content}</Typography>
                        </Box>
                        <Divider sx={{ my: '1rem' }} />
                    </Box>
                ))
            ) : (
                <Typography variant="h4" sx={{ mt: '2.5rem' }}>هیچ دیدگاهی ثبت نشده</Typography>
            )}
        </Box>
    )
}

export default CommentList