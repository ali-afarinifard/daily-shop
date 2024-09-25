'use client'


import ProductType from "@/types/product";
import { useEffect, useState } from "react";
import ManageWishlistItem from "./ManageWishlistItem";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import NullData from "../../NullData";
import Image from "next/image";

import not_product from "../../../../../public/images/product/no-product.webp";
import { IoMdClose } from "react-icons/io";
import Spinner from "../../Spinner";
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/store/apiSlice";
import { Box } from "@mui/material";


interface GetManageWishlistProps {
    userId: string | null;
}


const GetManageWishlist: React.FC<GetManageWishlistProps> = ({ userId }) => {

    // const [wishlist, setWishlist] = useState<ProductType[]>([]);
    const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);

    // Number of products per page
    const itemsPerPage = 4;


    const { data: wishlist = [], isLoading, isError, error, refetch } = useGetWishlistQuery(userId || '', {
        skip: !userId,
    });

    const [removeFromWishlist] = useRemoveFromWishlistMutation();


    useEffect(() => {
        if (wishlist) {
            refetch();
        }
    }, [wishlist]);


    // Calculate the products to display based on the current page
    const paginatedWishlist = wishlist.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    // Handle pagination change
    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };


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


    if (wishlist.length === 0 && !isLoading) {
        return (
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2.5rem'
                }}
            >
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        src={not_product}
                        alt="لیست علاقه مندی ها خالی است"
                        width={400}
                        height={400}
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                </Box>
                <NullData title="محصولی اضافه نشده" center="!text-base !h-full" />
            </Box>
        )
    };


    return (
        <Box
            component="div"
            sx={{
                height: '100%'
            }}
        >
            {isLoading ? (
                <Box
                    component="div"
                    sx={{
                        mt: '8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Spinner size={40} />
                </Box>
            ) : (
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%'
                    }}
                >

                    <Box
                        component="div"
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}
                    >
                        {paginatedWishlist.length > 0 && paginatedWishlist.map((product: ProductType) => (
                            <Box
                                component="div"
                                key={product._id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }}
                            >

                                <Box
                                    component="div"
                                    onClick={() => handleRemoveFromWishlist(product._id)}
                                    sx={{
                                        cursor: 'pointer',
                                        color: '#e11d48',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            p: '5px',
                                            background: '#e2e8f0',
                                            borderRadius: '100%'
                                        }
                                    }}
                                >
                                    <IoMdClose size={22} />
                                </Box>

                                <Box
                                    component="div"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        overflow: 'hidden',
                                        borderRadius: '0.37rem',
                                        border: '1px solid',
                                        borderColor: '#e2e8f0',
                                        pl: '0.75rem'
                                    }}
                                >
                                    <ManageWishlistItem product={product} />
                                </Box>

                            </Box>
                        ))}
                    </Box>


                    <Box
                        component="div"
                        sx={{
                            mt: { xs: 0, lg: '2rem' }
                        }}
                    >
                        <Stack spacing={2} sx={{ direction: 'ltr' }}>
                            <Pagination
                                count={Math.ceil(wishlist.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                variant="outlined"
                                color="primary"
                                sx={{
                                    "& .MuiPagination-ul": {
                                        justifyContent: "center", // Center the pagination
                                    },
                                }}
                            />
                        </Stack>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default GetManageWishlist