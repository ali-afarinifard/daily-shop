'use client'

import Image from "next/image"
import Link from "next/link";
import Button from "../Button";
import { MdDeleteOutline } from "react-icons/md";
import ProductType from "@/types/product";
import { formatPriceToFarsi } from "@/utils/formatPriceToFarsi";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import CommentType from "@/types/comment";
import { getComments } from "@/libs/apiUrls";



interface WishlistProductProps {
    product: ProductType;
    userId: string | null;
    onRemove: (productId: string) => void;
}


const WishlistProduct: React.FC<WishlistProductProps> = ({ product, userId, onRemove }) => {

    const [averageRating, setAverageRating] = useState<number>(0);

    const firstImage = product.images[0];
    const secondImage = product.images[1];


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


    return (
        <div className="w-full rounded-md overflow-hidden shadow-md">
            <Link href={`/product/${product._id}`}>

                <div className="relative w-full h-80 group">
                    {firstImage && (
                        <Image
                            src={firstImage}
                            alt={product.title}
                            className="object-cover rounded-t-md transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        />
                    )}

                    {secondImage && (
                        <Image
                            src={secondImage}
                            alt={product.title}
                            className="object-cover absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        />
                    )}

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
                    <div className="text-center text-slate-700 text-lg mt-2 flex justify-center gap-2">
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
            </Link>

            <div className="bg-slate-600">
                <Button
                    label="حذف"
                    icon={MdDeleteOutline}
                    custom="!py-1 !text-[0.9rem] !gap-1"
                    onClick={() => onRemove(product._id)}
                />
            </div>
        </div>
    )
}

export default WishlistProduct