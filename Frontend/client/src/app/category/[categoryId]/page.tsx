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
import { Box, Divider, Typography } from '@mui/material';



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
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translateY(350%)'
            }}>
            <Spinner size={35} />
        </Box>
    );

    if (!categoryId || products.length === 0) {
        return (
            <Box>
                <NullData title='محصولی وجود ندارد' center='!text-md' />
            </Box>
        )
    }


    return (
        <Box
            sx={{
                marginTop: { xs: '2.5rem', lg: '5rem' }
            }}
        >
            <Container>
                {/* Heading */}
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            textAlign: 'center',
                            width: 'fit-content'
                        }}
                    >
                        <Typography variant='h2'>
                            {category?.name}
                        </Typography>

                        <Divider
                            sx={{
                                width: '100%',
                                height: '2px',
                                background: '#94a3b8',
                                position: 'absolute',
                                left: 0,
                                bottom: '-0.5rem'
                            }}
                        />
                    </Box>
                </Box>

                {/* Content */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', '2sm': 'row' },
                            alignItems: { xs: 'stretch', '2sm': 'center' },
                            justifyContent: 'space-between',
                            mt: '2.5rem',
                            gap: { xs: '1rem', '2sm': 0 }
                        }}
                    >

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Typography variant='body1'>نمایش : </Typography>
                            <Box
                                sx={{
                                    maxWidth: '20rem'
                                }}
                            >
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
                            </Box>

                        </Box>

                        <Box
                            sx={{
                                mt: '2.5rem'
                            }}
                        >
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
                        </Box>

                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', '2xs': 'repeat(2, 1fr)', '2sm': 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
                            gap: { xs: '0.5rem', '2sm': '1rem', lg: '2rem' },
                            my: '2rem'
                        }}
                    >
                        {paginatedProducts && paginatedProducts.map((product) => (
                            <Box key={product._id}>
                                <ProductBox product={product} user={user} />
                            </Box>
                        ))}
                    </Box>


                    <Box>
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
                    </Box>

                </Box>
            </Container>
        </Box>
    );
}

export default CategoryPage;
