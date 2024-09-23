'use client'


// ** React
import { useRef } from "react"

// ** Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination'

// ** Next
import Image from "next/image"

// ** Icons
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

// ** mockData
import data from "@/utils/banner";
import { Box } from "@mui/material";


const Banner = () => {

    const swiperRef = useRef<SwiperType>();

    return (
        <Box
            sx={{
                position: 'relative',
                mx: '0.75rem',
                border: '2px solid',
                borderColor: '#e2e8f0',
                borderRadius: '0.37rem',
                overflow: 'hidden',
                direction: 'ltr'
            }}
        >
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
                style={{
                    width: '100%',
                }}
                className="mySwiper"
            >
                {data.map((img) => (
                    <SwiperSlide key={img.id}>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '24rem',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                src={img.image}
                                alt={img.alt}
                                style={{
                                    display: 'block',
                                    height: '24rem',
                                    width: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Buttons... */}
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

            <Box className="swiper-pagination" />
        </Box>
    )
}

export default Banner