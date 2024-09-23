'use client'

// ** Next
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

// ** apiSlice - RTK-Q
import { useGetAllCategoriesQuery } from "@/store/apiSlice"

// ** Types
import CategoryType from "@/types/category"

// ** Components
import Container from "../Container"
import CategoryItem from "./CategoryItem"
import { Box } from "@mui/material"


const CategoryList = () => {

    const pathname = usePathname();

    const [isAtTop, setIsAtTop] = useState(true);


    const { data: categories } = useGetAllCategoriesQuery();

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
        <Box
            sx={{
                background: '#f1f5f9',
                mt: '1rem',
                transition: 'transform 300ms ease-in-out, display 300ms ease-in-out',
                transform: isAtTop ? 'translateY(0)' : 'translateY(-100%)',
                display: isAtTop ? 'block' : 'none'
            }}
        >
            <Container>
                <Box className="flex items-center gap-10 py-1 text-[0.94rem]">
                    <Link href={'/products'}>
                        <CategoryItem
                            label="همه"
                            selected={pathname === '/products'}
                        />
                    </Link>
                    {categories?.map((category: CategoryType) => (
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
                    <Link href={'/top-sales-products'}>
                        <CategoryItem
                            label="فروش ویژه"
                            selected={pathname === '/top-sales-products'}
                        />
                    </Link>

                    <Link href={'/weblog'}>
                        <CategoryItem
                            label="وبلاگ"
                            selected={pathname === '/weblog'}
                        />
                    </Link>

                    <Link href={'/about-us'}>
                        <CategoryItem
                            label="درباره ما"
                            selected={pathname === '/about-us'}
                        />
                    </Link>
                </Box>
            </Container>
        </Box>
    )
}

export default CategoryList