'use client'


// ** Next
import Image from "next/image"
import { useEffect, useState } from "react";

// ** Auth Context
import { User } from "@/context/AuthContext";

// ** apiSlice - RTK-Q
import { useAddToWishlistMutation, useGetCommentsQuery, useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/store/apiSlice";

// ** Types
import ProductType from "@/types/product"
import CommentType from "@/types/comment";

// ** Utils
import { formatPriceToFarsi } from "@/utils/formatPriceToFarsi";

// ** MUI
import { Box, Divider, IconButton, Link, Rating, Typography } from "@mui/material";

// ** Toast
import toast from "react-hot-toast";

// ** Icons
import { FaRegHeart, FaHeart } from "react-icons/fa";


interface ProductBoxProps {
    product: ProductType
    user: User | null;
}


const ProductBox: React.FC<ProductBoxProps> = ({ product, user }) => {

    const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
    const [showWishlistMessage, setShowWishlistMessage] = useState(false);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [hovered, setHovered] = useState<boolean>(false);

    const firstImage = product.images[0];
    const secondImage = product.images[1];


    const { data: comments = [] } = useGetCommentsQuery(product._id);

    const { data: wishlist = [] } = useGetWishlistQuery(user?._id!, {
        skip: !user?._id, // Skip fetching if no user is logged in
    });


    const [addToWishlist] = useAddToWishlistMutation();
    const [removeFromWishlist] = useRemoveFromWishlistMutation();


    const handleWhitelistClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (user) {
            setIsWhitelisted(!isWhitelisted);
        } else {
            toast.error('ابتدا در سایت عضو شوید');
        }
    };


    const calculateAverageRating = (comments: CommentType[]) => {
        if (comments.length === 0) {
            setAverageRating(0);
            return;
        }
        const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
        const average = totalRating / comments.length;
        setAverageRating(average);
    };


    useEffect(() => {
        if (comments.length > 0) {
            calculateAverageRating(comments);
        }
    }, [comments]);


    useEffect(() => {
        if (wishlist.length > 0) {
            const isInWishlist = wishlist.some((item: ProductType) => item._id === product._id);
            setIsWhitelisted(isInWishlist);
        }
    }, [wishlist, product._id]);


    useEffect(() => {
        if (user) {
            const storedWishlistMessage = localStorage.getItem(`showWishlistMessage_${user._id}_${product._id}`);
            if (storedWishlistMessage === "true") {
                setShowWishlistMessage(true);
            }
        }
    }, [user, product._id]);


    const handleAddToWishlist = async (productId: string) => {
        try {
            if (!user?._id) {
                return;
            }
            await addToWishlist({ userId: user._id, productId });
            setIsWhitelisted(true);
            setShowWishlistMessage(true);
            localStorage.setItem(`showWishlistMessage_${user._id}_${productId}`, "true");
            toast.success('به علاقه مندی ها اضافه شد');
        } catch (error) {
            console.error('Error while adding to wishlist', error);
        }
    };


    const handleRemoveFromWishlist = async (productId: string) => {
        try {
            if (!user?._id) {
                console.warn("No userId available.");
                return;
            }
            await removeFromWishlist({ userId: user._id, productId }); // Using RTK mutation to remove from wishlist
            setIsWhitelisted(false);
            localStorage.removeItem(`showWishlistMessage_${user._id}_${productId}`);
        } catch (error) {
            console.error("Error while removing from wishlist", error);
        }
    };


    return (
        <Box
            sx={{
                width: '100%',
                borderRadius: '0.37rem',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '2px 10px 9px -2px rgba(0,0,0,0.05);'
            }}
        >
            <Link href={`/product/${product._id}`} sx={{ position: 'relative', textDecoration: 'none' }}>

                <Box
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '20rem',
                        overflow: 'hidden'
                    }}
                >
                    {firstImage && (
                        <Image
                            src={firstImage}
                            alt={product.title}
                            style={{
                                objectFit: 'cover',
                                borderTopLeftRadius: '0.37rem',
                                borderTopRightRadius: '0.37rem',
                                transition: 'opacity 0.5s ease-in-out',
                                opacity: hovered ? 0 : 1
                            }}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        />
                    )}

                    {secondImage && (
                        <Image
                            src={secondImage}
                            alt={product.title}
                            style={{
                                objectFit: 'cover',
                                transition: 'opacity 0.5s ease-in-out',
                                opacity: hovered ? 1 : 0,
                                position: 'absolute',
                                inset: 0,
                            }}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        />
                    )}

                    <Box
                        sx={{
                            position: 'absolute',
                            top: '1rem',
                            left: '1rem',
                            transform: hovered ? 'translateX(0)' : 'translateX(-2.5rem)',
                            transition: 'all 0.3s ease-in-out',
                        }}
                        onClick={handleWhitelistClick}
                    >


                        {isWhitelisted ? (
                            <IconButton sx={{ p: 0 }} onClick={() => handleRemoveFromWishlist(product._id)}>
                                <FaHeart style={{ height: '1.5rem', width: '1.5rem', color: '#ef4444' }} />
                            </IconButton>
                        ) : (
                            <IconButton sx={{ p: 0 }} onClick={() => handleAddToWishlist(product._id)}>
                                <FaRegHeart style={{ height: '1.5rem', width: '1.5rem', color: '#fff' }} />
                            </IconButton>
                        )}

                    </Box>

                </Box>

                <Box
                    sx={{
                        p: '1rem',
                        background: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                    }}
                >
                    <Typography sx={{ textAlign: 'center', color: '#4b5563', fontSize: '1.2rem', fontWeight: 700 }}>{product.title}</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Rating
                            readOnly
                            value={averageRating || 0} // Set the calculated average rating
                            precision={0.5} // Optional: set precision for half-star ratings
                            sx={{ direction: 'ltr' }}
                        />
                    </Box>

                    <Divider sx={{ width: '100%', height: '1px', background: '#fcfcfc' }} />

                    <Box
                        sx={{
                            textAlign: 'center',
                            color: '#334155',
                            fontSize: '1.12rem',
                            width: '100%'
                        }}
                    >
                        {product.isStatus ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.25rem'
                                }}
                            >
                                {product.offer ? (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#64748b'
                                            }}
                                        >
                                            {formatPriceToFarsi(product.price)}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: '1.2rem',
                                                fontWeight: '700',
                                                color: '#64748b'
                                            }}
                                        >
                                            {formatPriceToFarsi(product.offer)}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Typography sx={{
                                        fontSize: '1.2rem',
                                        color: '#64748b'
                                    }}>
                                        {formatPriceToFarsi(product.price)}
                                    </Typography>
                                )}
                                <Typography variant="body2">تومان</Typography>
                            </Box>
                        ) : (
                            <Box>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        borderRadius: '0.37rem',
                                        background: '#f43f5e',
                                        color: '#fff',
                                        px: '0.75rem',
                                        py: '0.17rem',
                                        width: '100%',
                                        borderColor: '#334155',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >ناموجود</Typography>
                            </Box>
                        )}
                    </Box>
                </Box>

                {product.offer && (
                    <Box
                        sx={{
                            background: '#f43f5e',
                            border: '1px',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            borderRadius: '#f43f5e',
                            py: '0.5rem',
                            px: '0.5rem',
                            borderBottomLeftRadius: '0.37rem',
                            borderBottomRightRadius: '0.37rem'
                        }}
                    >
                        <Typography variant="body2" sx={{ color: '#fff', fontSize: '0.9rem' }} >% تخفیف</Typography>
                    </Box>
                )}
            </Link>
        </Box>
    )
}

export default ProductBox