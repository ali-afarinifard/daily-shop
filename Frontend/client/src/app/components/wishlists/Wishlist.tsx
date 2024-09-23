'use client'


import ProductType from "@/types/product";
import { useEffect, useState } from "react";
import WishlistProduct from "../products/WishlistProduct";
import Spinner from "../Spinner";
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/store/apiSlice";
import { Box, Typography } from "@mui/material";


interface WishlistProps {
    userId: string | null;
}


const Wishlist: React.FC<WishlistProps> = ({ userId }) => {

    const { data: wishlist = [], isLoading, isError, error, refetch } = useGetWishlistQuery(userId || '', {
        skip: !userId,
    });

    const [removeFromWishlist] = useRemoveFromWishlistMutation();


    useEffect(() => {
        if (wishlist) {
            refetch();
        }
    }, [wishlist]);


    const handleRemoveFromWishlist = async (productId: string) => {
        try {
            if (!userId) {
                console.warn("No userId available.");
                return;
            }
            // Call the mutation
            await removeFromWishlist({ userId, productId }).unwrap();
            // Refetch the wishlist to reflect changes
            refetch();
            // Optionally remove item from localStorage if needed
            localStorage.removeItem(`showWishlistMessage_${userId}_${productId}`);
        } catch (error) {
            console.error("Error while removing from wishlist", error);
        }
    };


    if (!userId) {
        return null;
    };


    return (
        <Box>

            {isLoading ? (
                <Box
                    sx={{
                        mt: '2.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Spinner size={40} />
                </Box>
            ) : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '1005'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                textAlign: 'center',
                                width: 'fit-content'
                            }}
                        >
                            <Typography variant="h2">علاقه مندی ها</Typography>
                            <Box sx={{ width: '100%', height: '2px', background: '#94a3b8', position: 'absolute', left: 0, bottom: '-0.5rem' }} />
                        </Box>
                    </Box>


                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', '2xs': 'repeat(2, 1fr)', '2sm': 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
                            gap: { xs: '1rem', lg: '2rem' },
                            my: '2rem'
                        }}
                    >
                        {wishlist.length > 0 && wishlist.map((product: ProductType) => (
                            <Box key={product._id}>
                                <WishlistProduct
                                    product={product}
                                    userId={userId}
                                    onRemove={handleRemoveFromWishlist}
                                />
                            </Box>
                        ))}
                    </Box>


                    {wishlist.length === 0 && (
                        <Typography
                            variant="h3"
                            sx={{
                                width: '100%',
                                textAlign: 'center'
                            }}
                        >
                            محصولی به این لیست اضافه نشده است
                        </Typography>
                    )}
                </>
            )}
        </Box>
    )
}

export default Wishlist