'use client';


// ** Next
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

// ** apiSlice - RTK-Q
import { useGetCategoryByIdQuery, useGetProductsByCategoryQuery } from '@/store/apiSlice';

// ** Auth Context
import { AuthContext } from '@/context/AuthContext';

// ** MUI
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// ** Components
import Container from '@/app/components/Container';
import NullData from '@/app/components/NullData';
import ProductBox from '@/app/components/products/ProductBox';
import Spinner from '@/app/components/Spinner';



const CategoryPage = () => {


    const pathname = usePathname();

    const categoryId = pathname.split('/').pop() || '';

    const searchParams = useSearchParams();

    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('all');

    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }
    const { user } = authContext;

    // Number of products per page
    const itemsPerPage = 16;


    // GET Products by Category
    const { data: products = [], isLoading: productsLoading, } = useGetProductsByCategoryQuery(categoryId || '');


    // GET Category By Id
    const { data: category } = useGetCategoryByIdQuery(categoryId || '');


    useEffect(() => {

        // Get the page number from the URL query parameters
        const pageFromURL = searchParams.get('page');
        if (pageFromURL) {
            setCurrentPage(Number(pageFromURL));
        }

    }, [categoryId, searchParams]);


    // Apply filtering and sorting based on selected option
    const filteredProducts = products
        .filter(product => {
            if (filter === 'isStatus') {
                return product.isStatus === true;
            }
            return true;  // No filter, include all products
        })
        .sort((a, b) => {
            const priceA = a.offer && a.offer < a.price ? a.offer : a.price;
            const priceB = b.offer && b.offer < b.price ? b.offer : b.price;

            if (filter === 'priceDesc') {
                return priceB - priceA;  // Sort by effective price descending
            } else if (filter === 'priceAsc') {
                return priceA - priceB;  // Sort by effective price ascending
            }
            return 0;  // No sorting for other options
        });


    // Calculate the products to display based on the current page
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    // Handle pagination change
    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        // Update the URL with the current page number
        router.push(`?page=${page}`);
    };


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);



    if (productsLoading) return (
        <div className='flex items-center justify-center translate-y-[350%]'>
            <Spinner size={35} />
        </div>
    );

    if (!categoryId || products.length === 0) {
        return (
            <div>
                <NullData title='محصولی وجود ندارد' center='!text-md' />
            </div>
        )
    }


    return (
        <div className='mt-20 xl:mt-10'>
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

                    <div className='flex items-center justify-between mt-10 s:flex-col s:gap-4 s:items-stretch'>

                        <div className='flex items-center gap-2'>
                            <span>نمایش : </span>
                            <div className="max-w-[20rem]">
                                <FormControl fullWidth>
                                    <Select
                                        id="demo-simple-select"
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        sx={{
                                            fontFamily: 'Vazir',
                                            width: "10rem",
                                            height: "2.5rem",
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: "#252525", // Outline border color
                                            },
                                        }}
                                    >
                                        <MenuItem value={'all'} sx={{ fontFamily: 'Vazir' }}>پیش فرض</MenuItem>
                                        <MenuItem value={'isStatus'} sx={{ fontFamily: 'Vazir' }}>کالاهای موجود</MenuItem>
                                        <MenuItem value={'priceDesc'} sx={{ fontFamily: 'Vazir' }}>گران ترین</MenuItem>
                                        <MenuItem value={'priceAsc'} sx={{ fontFamily: 'Vazir' }}>ارزان ترین</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

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

                    <div className='grid grid-cols-4 gap-8 my-8 xl:grid-cols-3 xl:gap-4 s:grid-cols-2 s:gap-2 xm:grid-cols-1'>
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
