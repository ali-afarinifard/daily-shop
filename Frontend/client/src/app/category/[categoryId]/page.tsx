'use client';

import { getProductsByCategory } from '@/libs/apiUrls';
import ProductType from '@/types/product';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const CategoryPage = () => {
    const pathname = usePathname();

    const categoryId = pathname.split('/').pop();

    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log("Category ID:", categoryId);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (categoryId) {
                    const products = await getProductsByCategory(categoryId);
                    setProducts(products);
                    console.log(products)
                }
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    return (
        <div>
            <h1></h1>
            {/* Render more content related to the category here */}
        </div>
    );
}

export default CategoryPage;
