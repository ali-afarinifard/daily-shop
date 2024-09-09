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
            <div className="flex flex-col items-center justify-center gap-10">
                <div className="flex items-center justify-center">
                    <Image
                        src={not_product}
                        alt="لیست علاقه مندی ها خالی است"
                        width={400}
                        height={400}
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                </div>
                <NullData title="محصولی اضافه نشده" center="!text-base !h-full" />
            </div>
        )
    };


    return (
        <div className="h-full">
            {isLoading ? (
                <div className="mt-32 flex items-center justify-center">
                    <Spinner size={40} />
                </div>
            ) : (
                <div className="flex flex-col justify-between h-full">

                    <div className="flex flex-col gap-2 w-full">
                        {paginatedWishlist.length > 0 && paginatedWishlist.map((product:ProductType) => (
                            <div className="flex items-center gap-1" key={product._id}>

                                <div className="cursor-pointer text-rose-600 transition-all duration-200 hover:p-[5px] hover:bg-slate-200 hover:rounded-full" onClick={() => handleRemoveFromWishlist(product._id)}>
                                    <IoMdClose size={22} />
                                </div>

                                <div className="w-full h-full overflow-hidden rounded-md border border-slate-200 pl-3">
                                    <ManageWishlistItem product={product} />
                                </div>

                            </div>
                        ))}
                    </div>


                    <div className="xl:mt-8">
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
                    </div>
                </div>
            )}
        </div>
    )
}

export default GetManageWishlist