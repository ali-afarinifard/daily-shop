'use client'

import ProductType from "@/types/product"
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addToWishlist, getComments, getWishlist, removeFromWishlist } from "@/libs/apiUrls";
import { User } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { formatPriceToFarsi } from "@/utils/formatPriceToFarsi";
import CommentType from "@/types/comment";
import { Rating } from "@mui/material";
import Spinner from "../Spinner";


interface ProductBoxProps {
    product: ProductType
    user: User | null;
}


const ProductBox: React.FC<ProductBoxProps> = ({ product, user }) => {

    const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
    const [showWishlistMessage, setShowWishlistMessage] = useState(false);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [averageRating, setAverageRating] = useState<number>(0);

    const firstImage = product.images[0];
    const secondImage = product.images[1];


    const handleWhitelistClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (user) {
            setIsWhitelisted(!isWhitelisted)
        } else {
            toast.error('ابتدا در سایت عضو شوید');
        };
    };


    // Fetch comments and calculate average rating on component mount
    useEffect(() => {
        const fetchAndCalculateRating = async () => {
            try {
                const commentsData: CommentType[] = await getComments(product._id); // Fetch comments for the product
                calculateAverageRating(commentsData); // Calculate the average rating
            } catch (error) {
                console.error("Error fetching comments for average rating calculation:", error);
            }
        };

        fetchAndCalculateRating(); // Call the function
    }, [product._id]);



    // Function to calculate average rating
    const calculateAverageRating = (comments: CommentType[]) => {
        if (comments.length === 0) {
            setAverageRating(0);
            return;
        }
        const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0); // Calculate total rating
        const average = totalRating / comments.length; // Calculate average rating
        setAverageRating(average); // Update state with average rating
    };



    useEffect(() => {
        const checkWishlistStatus = async () => {
            try {
                if (user?._id) {
                    const wishlist = await getWishlist(user?._id);
                    const isInWishlist = wishlist.some((item: ProductType) => item._id === product._id);
                    setIsWhitelisted(isInWishlist);
                }
            } catch (error) {
                console.error('Error fetching wishlist status', error);
            }
        };

        checkWishlistStatus();
    }, [user?._id, product._id]);


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
            const updatedWishlist = await addToWishlist(user._id, productId);
            setWishlist(updatedWishlist);
            setShowWishlistMessage(true);
            localStorage.setItem(`showWishlistMessage_${user._id}_${productId}`, "true");
            toast.success('به علاقه مندی ها اضافه شد');
        } catch (error) {
            console.error('Error while adding wishlist', error);
        }
    };


    const handleRemoveFromWishlist = async (productId: string) => {
        try {
            if (!user?._id) {
                console.warn("No userId available.");
                return;
            }
            await removeFromWishlist(user._id, productId);
            setIsWhitelisted(false);
            localStorage.removeItem(`showWishlistMessage_${user._id}_${productId}`);
        } catch (error) {
            console.error("Error while removing from wishlist", error);
        }
    };


    return (
        <div className="w-full rounded-md overflow-hidden shadow-md relative">
            <Link href={`/product/${product._id}`} className="relative">

                <div className="relative w-full h-80 group">
                    {firstImage && (
                        <Image
                            src={firstImage}
                            alt={product.title}
                            className="object-cover rounded-t-md transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        />
                    )}

                    {secondImage && (
                        <Image
                            src={secondImage}
                            alt={product.title}
                            className="object-cover absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                            fill
                            priority
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

                <div className="p-4 bg-white flex flex-col gap-3">
                    <div className="text-center text-gray-600 text-md">{product.title}</div>
                    <div className="flex items-center justify-center">
                        <Rating
                            readOnly
                            value={averageRating || 0} // Set the calculated average rating
                            precision={0.5} // Optional: set precision for half-star ratings
                            sx={{ direction: 'ltr' }}
                        />
                    </div>
                    <hr className="w-full h-[1px] bg-slate-700" />
                    <div className="text-center text-slate-700 text-lg w-full">
                        {product.isStatus ? (
                            <div className="flex items-center justify-center gap-1">
                                {product.offer ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-offer text-sm text-slate-500">{formatPriceToFarsi(product.price)}</span>
                                        <span className="text-[1.2rem] text-slate-500">{formatPriceToFarsi(product.offer)}</span>
                                    </div>
                                ) : (
                                    <span className="text-[1.2rem] text-slate-500">{formatPriceToFarsi(product.price)}</span>
                                )}
                                <span className="text-sm text-slate-500">تومان</span>
                            </div>
                        ) : (
                            <div>
                                <div className="rounded-md bg-rose-500 text-white px-3 py-[0.05rem] text-[0.8rem] w-full border-slate-700 flex items-center justify-center">ناموجود</div>
                            </div>
                        )}
                    </div>
                </div>

                {product.offer && (
                    <div className="border-rose-500 border absolute top-0 right-0 bg-rose-500 py-1 px-2 rounded-b-md">
                        <span className="text-white text-sm">% تخفیف</span>
                    </div>
                )}
            </Link>
        </div>
    )
}

export default ProductBox