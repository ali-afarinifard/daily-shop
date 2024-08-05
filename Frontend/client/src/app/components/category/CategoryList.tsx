'use client'

import Image from "next/image"
import Link from "next/link"

import mainCategory1 from "../../../../public/images/category/main/main-category-1.webp"
import mainCategory2 from "../../../../public/images/category/main/main-category-2.webp"
import mainCategory3 from "../../../../public/images/category/main/main-category-3.webp"
import { useEffect, useState } from "react"
import CategoryType from "@/types/category"
import { getAllCategories } from "@/libs/apiUrls"


const CategoryList = () => {

    const [categories, setCategories] = useState<CategoryType[]>([]);


    useEffect(() => {
        const fetchCategories = async () => {
            const allCategories = await getAllCategories();
            setCategories(allCategories);
        };

        fetchCategories();
    }, []);


    return (
        // <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        //     {/* #1 */}
        //     <Link href={'/category/womens'}>
        //         <div className="w-full h-full">
        //             <Image
        //                 src={mainCategory1}
        //                 alt="دسته بندی مردانه"
        //                 objectFit="cover"
        //                 className="rounded-lg shadow-lg"
        //             />
        //         </div>
        //     </Link>

        //     {/* #2 */}
        //     <Link href={'/category/men'}>
        //         <div className="w-full h-full">
        //             <Image
        //                 src={mainCategory2}
        //                 alt="دسته بندی زنانه"
        //                 objectFit="cover"
        //                 className="rounded-lg shadow-lg"
        //             />
        //         </div>
        //     </Link>

        //     {/* #3 */}
        //     <Link href={'/category/kids'}>
        //         <div className="w-full h-full">
        //             <Image
        //                 src={mainCategory3}
        //                 alt="دسته بندی کودک"
        //                 objectFit="cover"
        //                 className="rounded-lg shadow-lg"
        //             />
        //         </div>
        //     </Link>
        // </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map(category => (
                <Link
                    key={category._id} // Assuming `_id` is the unique identifier
                    href={`/category/${category._id}`} // Using the category's unique ID in the URL
                    className="relative block aspect-w-1 aspect-h-1"
                >
                    <span className="block p-4 border rounded shadow-lg">
                        <h2 className="text-lg font-bold">{category.name}</h2>
                    </span>
                </Link>
            ))}
        </div>
    )
}

export default CategoryList