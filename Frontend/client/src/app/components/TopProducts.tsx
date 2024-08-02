'use client'

import { getAllProducts } from "@/libs/apiUrls";
import { useEffect, useRef, useState } from "react";
import Heading from "./Heading";
import ProductType from "@/types/product";
import ProductBox from "./products/ProductBox";

// ** Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const TopProducts = () => {

    const swiperRef = useRef<SwiperType>();

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

                <div className="relative ___swiper-container mt-10" dir="ltr">
                    <Swiper
                        loop
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        slidesPerView={4}
                        spaceBetween={30}
                        className="w-full mySwiper"
                    >
                        {products.map((product) => (
                            <>
                                <SwiperSlide key={product._id}>
                                    <ProductBox product={product} />
                                </SwiperSlide>
                            </>
                        ))}
                    </Swiper>


                    <div
                        className="flex items-center justify-center gap-5 ___swiper-buttons"
                    >
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="bg-white rounded-full text-xl w-[3.2rem] h-[3.2rem] flex items-center justify-center shadow-[0px_0px_3px_1px_rgba(165,165,165,0.75)] absolute -left-8 top-0 translate-y-[270%] z-20"
                        >
                            <IoIosArrowBack size={32} className="relative right-[1px]" />
                        </button>

                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="bg-white rounded-full text-xl w-[3.2rem] h-[3.2rem] flex items-center justify-center shadow-[0px_0px_3px_1px_rgba(165,165,165,0.75)] absolute -right-8 top-0 translate-y-[270%] z-20"
                        >
                            <IoIosArrowForward size={32} className="relative left-[1px]" />
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TopProducts