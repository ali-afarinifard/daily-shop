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

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const CategoryPage = () => {
    const pathname = usePathname();

    console.log(pathname)

    const categoryId = pathname.split('/').pop();

    const [products, setProducts] = useState<ProductType[]>([]);
    const [category, setCategory] = useState<CategoryType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('all');

    // Number of products per page
    const itemsPerPage = 16;

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


    // Apply filtering and sorting based on selected option
    const filteredProducts = products
        .filter(product => {
            if (filter === 'isStatus') {
                return product.isStatus === true;
            }
            return true;
        })
        .sort((a, b) => {
            if (filter === 'priceDesc') {
                return b.price - a.price; // Sort by price descending
            } else if (filter === 'priceAsc') {
                return a.price - b.price; // Sort by price ascending
            }
            return 0; // No sorting for other options
        });


    // Calculate the products to display based on the current page
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    // Handle pagination change
    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    // This useEffect will trigger whenever currentPage changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]); // Dependency array with currentPage


    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user } = authContext;



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
        <div className='mt-28'>
            <Container>
                {/* Heading */}
                <div className='w-full flex items-center justify-center'>
                    <div className='relative text-center w-fit'>
                        <h1 className='font-bold text-2xl'>{category?.name}</h1>
                        <span className="w-full h-[2px] bg-slate-400 absolute left-0 -bottom-2"></span>
                    </div>
                </div>

                {/* Content */}
                <div className='flex flex-col'>

                    <div className='flex items-center justify-between'>

                        <div className='flex items-center gap-2'>
                            <label htmlFor="filter">نمایش بر اساس :</label>
                            <select
                                name="filter"
                                id="filter"
                                className='border py-2 px-5 rounded-md cursor-pointer outline-none'
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value='all'>همه محصولات</option>
                                <option value='isStatus'>کالاهای موجود</option>
                                <option value='priceDesc'>گران ترین</option>
                                <option value='priceAsc'>ارزان ترین</option>
                            </select>
                        </div>

                        <div className='mt-10'>
                            <Stack spacing={2} sx={{ direction: 'ltr' }}>
                                <Pagination
                                    count={Math.ceil(filteredProducts.length / itemsPerPage)}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    variant="outlined"
                                    color="primary"
                                    sx={{
                                        "& .MuiPagination-ul": {
                                            justifyContent: "start", // Center the pagination
                                        },
                                    }}
                                />
                            </Stack>
                        </div>

                    </div>

                    <div className='grid grid-cols-4 gap-8 my-8'>
                        {paginatedProducts && paginatedProducts.map((product) => (
                            <div key={product._id}>
                                <ProductBox product={product} user={user} />
                            </div>
                        ))}
                    </div>


                    <div>
                        <Stack spacing={2} sx={{ direction: 'ltr' }}>
                            <Pagination
                                count={Math.ceil(filteredProducts.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                variant="outlined"
                                color="primary"
                                sx={{
                                    "& .MuiPagination-ul": {
                                        justifyContent: "center", // Center the pagination
                                    },
                                }}
                            />
                        </Stack>
                    </div>

                </div>
            </Container>
        </div>
    );
}

export default CategoryPage;
