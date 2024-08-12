'use client'

import ProductType from "@/types/product"
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addToWishlist, getWishlist, removeFromWishlist } from "@/libs/apiUrls";


interface ProductBoxProps {
    product: ProductType
    userId: string | null;
}


const ProductBox: React.FC<ProductBoxProps> = ({ product, userId }) => {

    const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
    const [showWishlistMessage, setShowWishlistMessage] = useState(false);

    const firstImage = product.images[0];
    const secondImage = product.images[1];


    const handleWhitelistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsWhitelisted(!isWhitelisted)
    };



    useEffect(() => {
        const checkWishlistStatus = async () => {
            try {
                if (userId) {
                    const wishlist = await getWishlist(userId);
                    const isInWishlist = wishlist.some((item: ProductType) => item._id === product._id);
                    setIsWhitelisted(isInWishlist);
                }
            } catch (error) {
                console.error('Error fetching wishlist status', error);
            }
        };

        checkWishlistStatus();
    }, [userId, product._id]);


    useEffect(() => {
        const storedWishlistMessage = localStorage.getItem(`showWishlistMessage_${product._id}`);
        if (storedWishlistMessage === "true") {
            setShowWishlistMessage(true);
        }
    }, [product._id]);



    const handleAddToWishlist = async (productId: string) => {
        try {
            if (!userId) {
                console.warn("No userId available.");
                return;
            }
            await addToWishlist(userId, productId);
            setIsWhitelisted(true);
            localStorage.setItem(`showWishlistMessage_${productId}`, "true");
        } catch (error) {
            console.error('Error while adding to wishlist', error);
        }
    };


    const handleRemoveFromWishlist = async (productId: string) => {
        try {
            if (!userId) {
                console.warn("No userId available.");
                return;
            }
            await removeFromWishlist(userId, productId);
            setIsWhitelisted(false);
            localStorage.removeItem(`showWishlistMessage_${productId}`);
        } catch (error) {
            console.error("Error while removing from wishlist", error);
        }
    };


    return (
        <div className="w-full rounded-md overflow-hidden shadow-md">
            <Link href={`/product/${product._id}`}>

                <div className="relative w-full h-80 group">
                    {firstImage && (
                        <Image
                            src={`http://localhost:5000/${firstImage.replace(/\\/g, '/')}`}
                            alt={product.title}
                            className="object-cover rounded-t-md transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        />
                    )}

                    {secondImage && (
                        <Image
                            src={`http://localhost:5000/${secondImage.replace(/\\/g, '/')}`}
                            alt={product.title}
                            className="object-cover absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        />
                    )}

                    <div
                        className="absolute top-4 left-4 transform -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
                        onClick={handleWhitelistClick}
                    >


                        {isWhitelisted ? (
                            <button onClick={() => handleRemoveFromWishlist(product._id)}>
                                <FaHeart className="h-6 w-6 text-red-500" />
                            </button>
                        ) : (
                            <button onClick={() => handleAddToWishlist(product._id)}>
                                <FaRegHeart className="h-6 w-6 text-white" />
                            </button>
                        )}
                    </div>

                </div>

                <div className="p-4 bg-white">
                    <div className="text-center text-gray-600 text-md">{product.title}</div>
                    <div className="text-center text-slate-700 text-lg mt-2 flex justify-center gap-2">
                        <span>تومان</span>
                        <span>{product.price}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductBox