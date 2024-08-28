'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import CategoryType from "@/types/category"
import { getAllCategories } from "@/libs/apiUrls"
import Container from "../Container"
import CategoryItem from "./CategoryItem"
import { usePathname } from "next/navigation"


const CategoryList = () => {

    const pathname = usePathname();

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [isAtTop, setIsAtTop] = useState(true);


    useEffect(() => {
        const fetchCategories = async () => {
            const allCategories = await getAllCategories();
            setCategories(allCategories);
        };

        fetchCategories();
    }, []);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsAtTop(scrollPosition < 50);
    };


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <div className={`bg-slate-100 mt-7 transform transition-all duration-300 ease-in-out ${isAtTop ? 'translate-y-0 opacity-100' : '-translate-y-full hidden mt-0'}`}>
            <Container>
                <div className="flex items-center gap-12 py-2 text-[0.94rem]">
                    <Link href={'/products'}>
                        <CategoryItem
                            label="همه"
                            selected={pathname === '/products'}
                        />
                    </Link>
                    {categories.map(category => (
                        <Link
                            key={category._id}
                            href={`/category/${category._id}`}
                        >
                            <CategoryItem
                                label={category.name}
                                selected={pathname === `/category/${category._id}`}
                            />
                        </Link>
                    ))}
                    <Link href={'/topSalesProducts'}>
                        <CategoryItem
                            label="فروش ویژه"
                            selected={pathname === '/topSalesProducts'}
                        />
                    </Link>
                    <Link href={'#'}>
                    <CategoryItem 
                            label="درباره ما"
                            selected={pathname === '#'} 
                        /> 
                    </Link>
                </div>
            </Container>
        </div>
    )
}

export default CategoryList