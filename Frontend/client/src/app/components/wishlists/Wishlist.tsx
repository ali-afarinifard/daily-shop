'use client'


import ProductType from "@/types/product";
import { useEffect, useState } from "react";
import WishlistProduct from "../products/WishlistProduct";
import Spinner from "../Spinner";
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/store/apiSlice";


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
        <div>

            {isLoading ? (
                <div className="mt-10 flex items-center justify-center">
                    <Spinner size={40} />
                </div>
            ) : (
                <>
                    <div className='w-full flex items-center justify-center'>
                        <div className='relative text-center w-fit'>
                            <h1 className='font-bold text-2xl'>علاقه مندی ها</h1>
                            <span className="w-full h-[2px] bg-slate-400 absolute left-0 -bottom-2"></span>
                        </div>
                    </div>


                    <div className='grid grid-cols-4 gap-8 mt-10'>
                        {wishlist.length > 0 && wishlist.map((product: ProductType) => (
                            <div key={product._id}>
                                <WishlistProduct
                                    product={product}
                                    userId={userId}
                                    onRemove={handleRemoveFromWishlist}
                                />
                            </div>
                        ))}
                    </div>


                    {wishlist.length === 0 && (
                        <div className="w-full text-center text-xl">
                            محصولی به این لیست اضافه نشده است
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Wishlist