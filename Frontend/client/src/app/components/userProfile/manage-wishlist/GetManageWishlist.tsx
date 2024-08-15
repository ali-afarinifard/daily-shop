'use client'

import { getWishlist } from "@/libs/apiUrls";
import ProductType from "@/types/product";
import { useEffect, useState } from "react";
import ManageWishlistItem from "./ManageWishlistItem";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import NullData from "../../NullData";


interface GetManageWishlistProps {
    userId: string | null;
}


const GetManageWishlist: React.FC<GetManageWishlistProps> = ({ userId }) => {

    const [wishlist, setWishlist] = useState<ProductType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Number of products per page
    const itemsPerPage = 4;


    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                if (!userId) return;
                const data = await getWishlist(userId);
                setWishlist(data);
                console.log('My Manage Wishlists >> ', data);
            } catch (error) {
                console.error('error getting wishlist', error);
            }
        };

        fetchWishlist();
    }, [userId]);


    // Calculate the products to display based on the current page
    const paginatedWishlist = wishlist.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    // Handle pagination change
    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };


    if (wishlist.length === 0) {
        return (
            <NullData title="محصولی اضافه نشده" center="!text-base" />
        )
    }


    return (
        <div className="h-full">
            <div className="flex flex-col justify-between h-full">

                <div className="flex flex-col gap-2 w-full">
                    {paginatedWishlist.length > 0 && paginatedWishlist.map((product) => (
                        <div className="w-full h-full overflow-hidden rounded-md border border-slate-200 pl-3" key={product._id}>
                            <ManageWishlistItem product={product} />
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
        </div>
    )
}

export default GetManageWishlist