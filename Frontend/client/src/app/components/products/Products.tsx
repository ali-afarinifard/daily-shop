'use client'

import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react"
import Spinner from "../Spinner";
import NullData from "../NullData";
import { Pagination, Stack } from "@mui/material";
import ProductBox from "./ProductBox";


import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllProductsQuery } from "@/store/apiSlice";


const Products = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('all');

    // Number of products per page
    const itemsPerPage = 16;

    // React Router hooks for navigation and search params
    const router = useRouter();
    const searchParams = useSearchParams();


    const { data: products = [], isLoading, error } = useGetAllProductsQuery();


    useEffect(() => {

        // Get the page number from the URL query parameters
        const pageFromURL = searchParams.get('page');
        if (pageFromURL) {
            setCurrentPage(Number(pageFromURL));
        }

    }, [searchParams]);


    // This useEffect will trigger whenever currentPage changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]); // Dependency array with currentPage



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


    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user } = authContext;


    if (isLoading) return (
        <div className='flex items-center justify-center translate-y-[150%] xl:translate-y-[50%] 2xl:translate-y-[50%]'>
            <Spinner size={35} />
        </div>
    );


    if (!products) {
        return (
            <div>
                <NullData title='محصولی وجود ندارد' />
            </div>
        )
    }


    return (
        <div>

            {/* Heading */}
            <div className='w-full flex items-center justify-center'>
                <div className='relative text-center w-fit'>
                    <h1 className='font-bold text-2xl'>محصولات</h1>
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

        </div>
    )
}

export default Products