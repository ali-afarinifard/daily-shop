'use client';

import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import ProductBox from '@/app/components/products/ProductBox';
import { getCategoryById, getProductsByCategory } from '@/libs/apiUrls';
import CategoryType from '@/types/category';
import ProductType from '@/types/product';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const CategoryPage = () => {
    const pathname = usePathname();

    console.log(pathname)

    const categoryId = pathname.split('/').pop();

    const [products, setProducts] = useState<ProductType[]>([]);
    const [category, setCategory] = useState<CategoryType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log("Category ID:", categoryId);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (categoryId) {
                    // Fetch products for this category
                    const products = await getProductsByCategory(categoryId);
                    setProducts(products);
                    console.log(products);

                    const categories = await getCategoryById(categoryId);
                    setCategory(categories);
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
        <div className='mt-10'>
            <Container>
                <div className='w-full flex items-center justify-center'>
                    <div className='relative text-center w-fit'>
                        <h1 className='font-bold text-2xl'>{category?.name}</h1>
                        <span className="w-full h-[2px] bg-slate-400 absolute left-0 -bottom-2"></span>
                    </div>
                </div>

                <div className='grid grid-cols-4 gap-8 mt-10'>
                    {products && products.map((product) => (
                        <div key={product._id}>
                            <ProductBox product={product} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default CategoryPage;
