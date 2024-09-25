'use client'

import { useContext, useRef } from "react";
import Heading from "./Heading";

// ** Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css'
import 'swiper/css/pagination'

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductBox from "./products/ProductBox";
import { AuthContext } from "@/context/AuthContext";
import NullData from "./NullData";
import { useGetAllProductsQuery } from "@/store/apiSlice";
import { Box, IconButton } from "@mui/material";


const TopProducts = () => {

    const swiperRef = useRef<SwiperType>();

    const { data: products = [], isLoading, error } = useGetAllProductsQuery();


    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user } = authContext;


    if (!products || products.length === 0) {
        return (
            <NullData title="محصول پرفروشی وجود ندارد" center="h-full mt-20 !text-[1.3rem]" />
        );
    };


    return (
        <Box
            component="div"
            sx={{
                mt: '5rem'
            }}
        >
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start'
                }}
            >
                <Heading title="پرفروش ترین محصولات" />
            </Box>

            <Box className="relative ___swiper-container mt-10" component="div" sx={{ direction: 'ltr' }}>
                <Swiper
                    loop={products.length > 4}
                    slidesPerView={Math.min(1, products.length)}

                    spaceBetween={15}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    breakpoints={{
                        450: {
                            slidesPerView: 2
                        },
                        600: {
                            slidesPerView: 3
                        },
                        950: {
                            slidesPerView: 4
                        },
                    }}
                    className="w-full mySwiper"
                >
                    {products.slice(0, 6).map((product) => (
                        <SwiperSlide key={product._id} dir="rtl">
                            <ProductBox product={product} user={user} />
                        </SwiperSlide>
                    ))}
                </Swiper>


                <Box
                    component="div"
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1.25rem',
                    }}
                    className="___swiper-buttons"
                >
                    <IconButton
                        onClick={() => swiperRef.current?.slidePrev()}
                        sx={{
                            background: '#fff',
                            borderRadius: '100%',
                            fontSize: '1.25rem',
                            lineHeight: '1.75rem',
                            width: { xs: '2.5rem', md: '3.2rem' },
                            height: { xs: '2.5rem', md: '3.2rem' },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0px 0px 3px 1px rgba(165,165,165,0.75)',
                            position: 'absolute',
                            left: { xs: '-0.5rem', md: '-2rem' },
                            top: '0',
                            transform: { xs: 'translateY(340%)', md: 'translateY(270%)' },
                            zIndex: 20,
                            '&:hover': {
                                background: '#fff'
                            }

                        }}
                    >
                        <IoIosArrowBack size={32} style={{ position: 'relative', right: '1px' }} />
                    </IconButton>

                    <IconButton
                        onClick={() => swiperRef.current?.slideNext()}
                        sx={{
                            background: '#fff',
                            borderRadius: '100%',
                            fontSize: '1.25rem',
                            lineHeight: '1.75rem',
                            width: { xs: '2.5rem', md: '3.2rem' },
                            height: { xs: '2.5rem', md: '3.2rem' },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0px 0px 3px 1px rgba(165,165,165,0.75)',
                            position: 'absolute',
                            right: { xs: '-0.5rem', md: '-2rem' },
                            top: 0,
                            transform: { xs: 'translateY(340%)', md: 'translateY(270%)' },
                            zIndex: 20,
                            '&:hover': {
                                background: '#fff'
                            }
                        }}

                    >
                        <IoIosArrowForward size={32} style={{ position: 'relative', left: '1px' }} />
                    </IconButton>
                </Box>
            </Box>
        </Box >
    )
}

export default TopProducts