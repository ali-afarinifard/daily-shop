'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import CategoryType from "@/types/category"
import { getAllCategories } from "@/libs/apiUrls"
import Container from "../Container"


const CategoryList = () => {

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
                <div className="flex items-center gap-16 py-2 text-[0.9rem]">
                    {categories.map(category => (
                        <Link
                            key={category._id}
                            href={`/category/${category._id}`}
                        >
                            {category?.name}
                        </Link>
                    ))}
                    <Link href={'#'}>درباره ما</Link>
                </div>
            </Container>
        </div>
    )
}

export default CategoryList