'use client'

import { useEffect, useRef, useState } from "react";
import SearchBar from "../nav/SearchBar/SearchBar"
import ProductType from "@/types/product";
import { getAllCategories, getProductsBySearch } from "@/libs/apiUrls";
import SearchBarItem from "../nav/SearchBar/SearchBarItem";
import CatSearchBar from "./CatSearchBar";
import Link from "next/link";
import CategoryItem from "./CategoryItem";
import { usePathname } from "next/navigation";
import CategoryType from "@/types/category";
import { FaInstagram } from "react-icons/fa";
import { SiTelegram } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io5";


interface CategoryListMobileProps {
    toggleMenu: () => void;
}



const CategoryListMobile:React.FC<CategoryListMobileProps> = ({toggleMenu}) => {

    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const allCategories = await getAllCategories();
            setCategories(allCategories);
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <div className="flex flex-col">

                <div className="mt-3">
                    <CatSearchBar toggleMenu={toggleMenu} />
                </div>

                <div className="w-full h-12 bg-gray-200 border-b-[2px] border-b-slate-700 flex items-center justify-center">
                    <h1 className="font-bold text-[1rem]">منو</h1>
                </div>

                <div className="mt-3">

                    <Link href={'/'} onClick={toggleMenu}>
                        <CategoryItem
                            label="دیجی شاپ"
                            centerParent="!justify-start"
                            centerChild="!font-bold !text-[1rem]"
                        />
                    </Link>

                    <hr className="w-full h-[1px] bg-slate-300 my-2" />

                    <Link href={'/products'} onClick={toggleMenu}>
                        <CategoryItem
                            label="همه محصولات"
                            centerParent="!justify-start"
                            centerChild="!font-bold !text-[1rem]"
                        />
                    </Link>

                    <hr className="w-full h-[1px] bg-slate-300 my-2" />

                    {categories.map((category) => (
                        <>
                            <Link
                                key={category._id}
                                href={`/category/${category._id}`}
                                onClick={toggleMenu}
                            >
                                <CategoryItem
                                    label={category.name}
                                    centerParent="!justify-start"
                                    centerChild="!font-bold !text-[1rem]"
                                />
                            </Link>
                            <hr className="w-full h-[1px] bg-slate-300 my-2" />
                        </>
                    ))}

                    <Link href={'/top-sales-products'} onClick={toggleMenu}>
                        <CategoryItem
                            label="فروش ویژه"
                            centerParent="!justify-start"
                            centerChild="!font-bold !text-[1rem]"
                        />
                    </Link>

                    <hr className="w-full h-[1px] bg-slate-300 my-2" />

                    <Link href={'#'} onClick={toggleMenu}>
                        <CategoryItem
                            label="وبلاگ"
                            centerParent="!justify-start"
                            centerChild="!font-bold !text-[1rem]"
                        />
                    </Link>

                    <hr className="w-full h-[1px] bg-slate-300 my-2" />

                    <Link href={'#'} onClick={toggleMenu}>
                        <CategoryItem
                            label="درباره ما"
                            centerParent="!justify-start"
                            centerChild="!font-bold !text-[1rem]"
                        />
                    </Link>

                    <hr className="w-full h-[1px] bg-slate-500 my-2" />

                    <div className="flex items-center justify-center gap-4 py-5">

                        <Link href={'#'}>
                            <FaInstagram size={30} />
                        </Link>

                        <Link href={'#'}>
                            <SiTelegram size={30} />
                        </Link>

                        <Link href={'#'}>
                            <IoLogoWhatsapp size={32} />
                        </Link>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default CategoryListMobile