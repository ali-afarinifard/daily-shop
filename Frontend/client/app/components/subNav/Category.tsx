'use client'

import { CategoryType, ItemType } from "@/types"
import { categoryData } from "@/utils/categories";
import Link from "next/link";

interface CategoryProps {
    category: CategoryType;
    onHover: (items: ItemType[]) => void;
    label: string;
}


const Category: React.FC<CategoryProps> = ({ category, onHover, label }) => {
    return (
        <div>
            <ul className="flex items-center justify-center text-center gap-1 p-2">
                <li
                    onMouseEnter={() => onHover(category.items || [])}
                    onMouseLeave={() => onHover([])}
                >
                    <Link
                        href={`/category/${label}`}
                    >
                        {label}
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Category