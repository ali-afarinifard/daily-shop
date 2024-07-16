'use client'


import { useState } from "react";
import { ItemType } from "@/types";
import Category from "../Category";
import Container from "../../Container";
import { categoryData } from "@/utils/categories";
import { usePathname } from "next/navigation";

const SubNavbar = () => {

    const [items, setItems] = useState<ItemType[]>([]);

    const pathname = usePathname();
    const isLoginPage = pathname === '/login' || pathname === '/register';
    if (isLoginPage) return null;

    return (
        <div className="bg-white">
            <Container>
                <div className="pt-4 flex items-center gap-5 md:gap-16 py-3 md:py-0 overflow-x-auto text-sm">
                    {categoryData.map((item) => (
                        <Category 
                            key={item.id}
                            label={item.label}
                            category={item}
                            onHover={setItems}
                        />
                    ))}
                    {/* <div className="absolute rounded-md shadow-md w-[10.63rem] bg-white overflow-hidden text-sm flex flex-col cursor-pointer">
                        {items && items.map((item) => (
                            <div>{item.name}</div>
                        ))}
                    </div> */}
                </div>
            </Container>
        </div>
    )
}

export default SubNavbar