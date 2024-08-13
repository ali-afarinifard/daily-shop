'use client'

import { getWishlist } from "@/libs/apiUrls";
import ProductType from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";


interface GetManageWishlistProps {
    userId: string | null;
}


const GetManageWishlist: React.FC<GetManageWishlistProps> = ({ userId }) => {

    const [wishlist, setWishlist] = useState<ProductType[]>([]);


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


    return (
        <div>
            <div className="flex flex-col gap-2 w-full">
                {wishlist.length > 0 && wishlist.map((product) => (
                    <div className="w-full h-full overflow-hidden rounded-md border border-slate-200 pl-3" key={product._id}>
                        <Link href={`/product/${product._id}`}>

                            <div className="flex items-center justify-between gap-2">

                                <div className="flex items-center gap-3">
                                    <div className="w-16 h-full">
                                        <Image
                                            src={`http://localhost:5000/${product.images[0].replace(/\\/g, '/')}`}
                                            alt={product.title}
                                            width={100}
                                            height={100}
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col items-start gap-1 py-3">
                                        <span className="text-slate-400">{product.title}</span>
                                        <span className="text-slate-500">{product.price}</span>
                                    </div>
                                </div>


                                <div>
                                    <FaChevronLeft size={20} />
                                </div>

                            </div>

                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GetManageWishlist