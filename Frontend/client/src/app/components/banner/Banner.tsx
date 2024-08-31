'use client'

import { useRef } from "react"

// ** Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination'

// ** Images Data

// ** Next
import Image from "next/image"

// ** Icons
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import data from "@/utils/banner";


const Banner = () => {

    const swiperRef = useRef<SwiperType>();

    return (
        <div className="relative ___swiper-container mx-3" dir="ltr">
            <Swiper
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination',
                    type: 'bullets'
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                modules={[Pagination]}
                loop
                className="w-full mySwiper"
            >
                {data.map((img) => (
                    <SwiperSlide key={img.id}>
                        <div
                            className="flex h-96 w-full items-center justify-center rounded-md overflow-hidden"
                        >
                            <Image
                                src={img.image}
                                alt={img.alt}
                                className="block h-96 w-full object-cover"
                                priority
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* <div
                className="flex items-center justify-center gap-5 absolute right-10 bottom-[2rem] z-20 ___swiper-buttons"
            >
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="bg-white rounded-full text-xl w-10 h-10 flex items-center justify-center shadow-[0px_0px_3px_1px_rgba(165,165,165,0.75)]"
                >
                    <IoIosArrowBack />
                </button>

                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="bg-white rounded-full text-xl w-10 h-10 flex items-center justify-center shadow-[0px_0px_3px_1px_rgba(165,165,165,0.75)]"
                >
                    <IoIosArrowForward />
                </button>
            </div> */}

            <div className="swiper-pagination" />
        </div>
    )
}

export default Banner