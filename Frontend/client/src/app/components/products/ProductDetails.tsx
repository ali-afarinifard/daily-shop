'use client'


import Container from "@/app/components/Container";
import { getProductById } from "@/libs/apiUrls";
import ProductType from "@/types/product";
import Image from "next/image";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { TbRulerMeasure } from "react-icons/tb";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const ProductDetails = () => {

    const pathname = usePathname();
    const productId = pathname.split('/').pop();

    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);


    useEffect(() => {
        const fetchProduct = async () => {
            try {

                if (productId) {
                    const productData = await getProductById(productId);
                    setProduct(productData);
                    console.log(productData);
                    if (productData?.images.length) {
                        setSelectedImage(`http://localhost:5000/${productData.images[0].replace(/\\/g, '/')}`);
                    }
                }

            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);


    const handleImageClick = (image: string) => {
        setSelectedImage(`http://localhost:5000/${image.replace(/\\/g, '/')}`);
    };


    return (
        <div className="mt-10">

            <div className="flex flex-col">
                {/* Content */}
                <div className="flex items-start xl:flex-col">

                    {/* Right */}
                    <div className="w-[30rem] xl:flex xl:flex-col items-center justify-center xl:w-full">

                        {/* Main Image */}
                        <div className="w-[30rem] h-full xl:flex xl:items-center xl:justify-center xl:w-full">
                            {selectedImage && (
                                <Image
                                    src={selectedImage}
                                    alt={product?.title || ""}
                                    width={450}
                                    height={450}
                                    className="object-cover rounded-md h-[35rem]"
                                />
                            )}
                        </div>


                        {/* Other Images */}
                        <div className="max-w-[28rem] m:w-full mt-4 p-1 rounded-md border-[1px] border-slate-300">
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={5}
                                breakpoints={{
                                    450: {
                                        slidesPerView: 4
                                    },
                                    600: {
                                        slidesPerView: 5
                                    },
                                }}
                                className="mySwiper"
                            >
                                {product?.images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            className="w-[5rem] h-[5rem] rounded-md overflow-hidden cursor-pointer"
                                            onClick={() => handleImageClick(image)}
                                        >
                                            <Image
                                                src={`http://localhost:5000/${image.replace(/\\/g, '/')}`}
                                                alt={`${product.title} ${index + 1}`}
                                                width={100}
                                                height={100}
                                                className="object-cover transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                    </div>


                    {/* Left */}
                    <div className="mt-7 flex flex-col gap-10">
                        <h1 className="text-3xl font-bold">{product?.title}</h1>

                        <h3 className="flex items-center gap-1">
                            <span className="text-2xl text-red-400">{product?.price}</span>
                            <span className="text-md">تومان</span>
                        </h3>

                        <p className="flex items-center gap-1">
                            <span>تعداد : </span>
                            <span className="font-bold">{product?.stock}</span>
                        </p>

                        <div className="flex flex-col items-start gap-1">
                            <span>راهنمای انتخاب سایز حتما مطالعه شود.</span>

                            <button className="flex items-center gap-1 bg-slate-500 p-3 rounded-xl text-white hover:shadow-xl hover:shadow-slate-200 transition-all">
                                <span><TbRulerMeasure size={22} /></span>
                                <span>راهنمای انتخاب سایز</span>
                            </button>
                        </div>

                        <p>توجه! ❌ حتما راهنمای سایز مطالعه شود. ❌</p>

                        <div className="flex flex-col items-start gap-8 xl:gap-1 xl:fixed xl:left-0 xl:bottom-0 xl:right-0 xl:w-full xl:bg-[#f0f0f0] xl:flex xl:flex-row xl:z-[1000] xl:py-4 xl:px-2 xl:items-center xl:rounded-t-lg xl:shadow-xl">

                            <div className="flex items-center gap-4 xl:gap-1 w-[30rem] 2xl:w-full xl:flex-row xl:w-full">

                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="size-select" className="xl:hidden">سایز</label>
                                    <select
                                        name="size"
                                        id="size-select"
                                        value={selectedSize ?? ""}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                        className="p-2 border border-slate-300 rounded outline-none"
                                    >
                                        <option value="">انتخاب سایز</option>
                                        {product?.sizes.map((size, index) => (
                                            <option key={index} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="color-select" className="xl:hidden">رنگ</label>
                                    <select
                                        name="color"
                                        id="color-select"
                                        value={selectedColor ?? ""}
                                        onChange={(e) => setSelectedColor(e.target.value)}
                                        className="p-2 border border-slate-300 rounded outline-none"
                                    >
                                        <option value="">انتخاب رنگ</option>
                                        {product?.colors.map((color, index) => (
                                            <option key={index} value={color}>
                                                {color}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>


                            <button className="bg-slate-700 text-white p-4 px-5 xl:p-3 rounded-xl hover:shadow-xl hover:shadow-slate-200 transition-all flex items-center gap-2">
                                <span className="xl:hidden"><MdOutlineShoppingCartCheckout size={25} /></span>
                                <span className="xl:hidden">افرودن به سبد خرید</span>
                                <span className="hidden xl:block">خرید</span>
                            </button>

                        </div>
                    </div>

                </div>

                {/* bottom */}
                <div className="mt-16 w-full max-w-[60rem] leading-[1.75rem] text-justify">
                    <p>{product?.description}</p>
                </div>
            </div>

        </div>
    )
}

export default ProductDetails