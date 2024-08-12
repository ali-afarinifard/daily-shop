'use client'

import Product from "@/types/product"
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Button from "../Button";
import { MdDeleteOutline } from "react-icons/md";
import ProductType from "@/types/product";
import { getWishlist, removeFromWishlist } from "@/libs/apiUrls";



interface WishlistProductProps {
    product: Product;
    userId: string | null;
    onRemove: (productId: string) => void;
}


const WishlistProduct: React.FC<WishlistProductProps> = ({ product, userId, onRemove }) => {

    const firstImage = product.images[0];
    const secondImage = product.images[1];


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

                    {/* <div
                        className="absolute top-4 left-4 transform -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
                        onClick={handleWhitelistClick}
                    >
                        {isWhitelisted ? (
                            <FaHeart className="h-6 w-6 text-red-500" /> // Filled red heart when whitelisted
                        ) : (
                            <FaRegHeart className="h-6 w-6 text-white" /> // Outlined heart when not whitelisted
                        )}
                    </div> */}

                </div>

                <div className="p-4 bg-white">
                    <div className="text-center text-gray-600 text-md">{product.title}</div>
                    <div className="text-center text-slate-700 text-lg mt-2 flex justify-center gap-2">
                        <span>تومان</span>
                        <span>{product.price}</span>
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