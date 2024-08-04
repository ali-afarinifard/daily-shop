'use client'

import Product from "@/types/product"
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";


interface ProductBoxProps {
    product: Product
}


const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {

    const [isWhitelisted, setIsWhitelisted] = useState(false);
    const [addToCart, setAddToCart] = useState(false);

    const firstImage = product.images[0];
    const secondImage = product.images[1];


    const handleWhitelistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsWhitelisted(!isWhitelisted)
    };


    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setAddToCart(!addToCart);
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
                        />
                    )}

                    {secondImage && (
                        <Image
                            src={`http://localhost:5000/${secondImage.replace(/\\/g, '/')}`}
                            alt={product.title}
                            className="object-cover absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                            fill
                        />
                    )}

                    <div
                        className="absolute top-4 left-4 transform -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
                        onClick={handleWhitelistClick}
                    >
                        {isWhitelisted ? (
                            <FaHeart className="h-6 w-6 text-red-500" /> // Filled red heart when whitelisted
                        ) : (
                            <FaRegHeart className="h-6 w-6 text-white" /> // Outlined heart when not whitelisted
                        )}
                    </div>

                    <div
                        className="absolute top-12 left-4 transform -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
                        onClick={handleAddToCartClick}
                    >
                        {addToCart ? (
                            <FaCheck className="h-6 w-6 text-green-500" /> // Tick icon when added to cart
                        ) : (
                            <IoCart className="h-6 w-6 text-white" /> // Cart icon when not added to cart
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