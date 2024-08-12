'use client';

import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import NullData from '@/app/components/NullData';
import ProductBox from '@/app/components/products/ProductBox';
import Spinner from '@/app/components/Spinner';
import { AuthContext } from '@/context/AuthContext';
import { getCategoryById, getProductsByCategory } from '@/libs/apiUrls';
import CategoryType from '@/types/category';
import ProductType from '@/types/product';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

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


    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user } = authContext;


    if (!user) {
        return <p>Please log in to view your wishlist.</p>;
    }



    if (loading) return (
        <div className='flex items-center justify-center translate-y-[350%]'>
            <Spinner size={35} />
        </div>
    );

    if (!categoryId || products.length === 0) {
        return (
            <div>
                <NullData title='محصولی وجود ندارد' />
            </div>
        )
    }


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
                            <ProductBox product={product} userId={user?._id} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default CategoryPage;
