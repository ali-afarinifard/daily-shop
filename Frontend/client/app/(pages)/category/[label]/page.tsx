'use client'

import Container from "@/app/components/Container";
import { CategoryType } from "@/types";
import { categoryData } from "@/utils/categories";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


interface CategoryPageProps {
    category: CategoryType | null;
}


const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {

    const pathname = usePathname();

    const [currentCategory, setCurrentCategory] = useState<CategoryType | null>(category);

    useEffect(() => {
        const encodedLabel = pathname.split('/').pop();
        if (encodedLabel) {
            const decodedLabel = decodeURIComponent(encodedLabel);
            console.log('Current Pathname:', pathname);
            console.log('Derived Label:', decodedLabel);

            const foundCategory = categoryData.find(c => c.label === decodedLabel) || null;
            console.log('Found Category:', foundCategory);
            setCurrentCategory(foundCategory);
        }
    }, [pathname]);

    if (!currentCategory) {
        return <div className="mt-60">Category not found</div>;
    };


    return (
        <Container>
            <div className="py-40">
                <h1>Hello</h1>
            </div>
        </Container>
    )
};


export default CategoryPage