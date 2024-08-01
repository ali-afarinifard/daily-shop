'use client'

import { getAllProducts } from "@/libs/apiUrls";
import { useEffect, useState } from "react";
import Heading from "./Heading";
import ProductType from "@/types/product";
import ProductBox from "./products/ProductBox";


const TopProducts = () => {

    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const allProducts = await getAllProducts();
            if (allProducts) {
                // Shuffle and select 10 random products
                const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());
                setProducts(shuffledProducts.slice(0, 10));
            }
        };

        fetchProducts();
    }, []);

    console.log(products)

    return (
        <div className="mt-10">
            <div>
                <div className="relative w-fit">
                    <Heading title="پرفروش ترین محصولات" />
                    <span className="w-full h-[2px] bg-slate-400 absolute left-0 -bottom-2"></span>
                </div>

                <div className="mt-10">
                    {products.map((product) => (
                        <ProductBox product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopProducts