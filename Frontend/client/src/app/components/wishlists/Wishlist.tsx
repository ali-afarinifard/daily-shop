'use client'

import { getWishlist, removeFromWishlist } from "@/libs/apiUrls";
import ProductType from "@/types/product";
import { useEffect, useState } from "react";
import ProductBox from "../products/ProductBox";
import Heading from "../Heading";
import WishlistProduct from "../products/WishlistProduct";


interface WishlistProps {
    userId: string | null;
}


const Wishlist: React.FC<WishlistProps> = ({ userId }) => {

    const [wishlist, setWishlist] = useState<ProductType[]>([]);
    const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
    const [showWishlistMessage, setShowWishlistMessage] = useState(false);


    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                if (!userId) return;
                const data = await getWishlist(userId);
                setWishlist(data);
                console.log('My Wishlists>>>>', data);
            } catch (error) {
                console.error('error getting wishlist', error);
            }
        };

        fetchWishlist();
    }, [userId]);



    const handleRemoveFromWishlist = async (productId: string) => {
        try {
            if (!userId) {
                console.warn("No userId available.");
                return;
            }
            await removeFromWishlist(userId, productId);
            setWishlist((prevWishlist) =>
                prevWishlist.filter((product) => product._id !== productId)
            );
            setIsWhitelisted(false);
            localStorage.removeItem(`showWishlistMessage_${productId}`);
        } catch (error) {
            console.error("Error while removing from wishlist", error);
        }
    };



    if (!userId) {
        return <div>Please log in to view your wishlist.</div>;
    }

    return (
        <div>

            <div className='w-full flex items-center justify-center'>
                <div className='relative text-center w-fit'>
                    <h1 className='font-bold text-2xl'>علاقه مندی ها</h1>
                    <span className="w-full h-[2px] bg-slate-400 absolute left-0 -bottom-2"></span>
                </div>
            </div>

            <div className='grid grid-cols-4 gap-8 mt-10'>
                {wishlist.length > 0 && wishlist.map((product) => (
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
                    هیچ محصولی به این لیست اضافه نشده است
                </div>
            )}
        </div>
    )
}

export default Wishlist