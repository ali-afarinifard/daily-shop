'use client';


import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';


import { useCart } from "@/hooks/useCart";
import Button from "../Button";
import SetQuantity from "./SetQuantity";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Spinner from "../Spinner";
import CommentForm from "../comments/CommentForm";
import CommentList from "../comments/CommentList";
import CommentType from "@/types/comment";
import { Rating } from "@mui/material";
import { formatPriceToFarsi } from "@/utils/formatPriceToFarsi";
import { useAddToWishlistMutation, useGetCommentsQuery, useGetProductByIdQuery } from "@/store/apiSlice";



const ProductDetails: React.FC = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;

    const pathname = usePathname();
    const productId = pathname.split('/').pop();

    const { handleAddProductToCart, cartProducts } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [showWishlistMessage, setShowWishlistMessage] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentsUpdated, setCommentsUpdated] = useState<boolean>(false);
    const [averageRating, setAverageRating] = useState<number | null>(null);

    const router = useRouter();

    const { data: product, error: productError, isLoading: isProductLoading } = useGetProductByIdQuery(productId as string);

    const { data: comments = [], refetch: refetchComments } = useGetCommentsQuery(productId as string, {
        skip: !productId, // Skip query if no productId
    });

    const [addToWishlist, { isLoading: isAddingToWishlist }] = useAddToWishlistMutation();


    useEffect(() => {
        if (cartProducts && product) {
            const isProductInCart = cartProducts.some(item => item._id === product._id);
            setIsProductInCart(isProductInCart);
        }
    }, [cartProducts, product]);

    useEffect(() => {
        if (user) {
            const storedWishlistMessage = localStorage.getItem(`showWishlistMessage_${user._id}_${productId}`);
            if (storedWishlistMessage === "true") {
                setShowWishlistMessage(true);
            }
        }
    }, [user, productId]);

    const handleAddToWishlist = async (productId: string) => {
        try {
            if (!user?._id) {
                toast.error('ابتدا در سایت عضو شوید');
                return;
            }

            const { data: updatedWishlist } = await addToWishlist({
                userId: user._id,
                productId,
            }).unwrap();

            // Update the local wishlist state after adding the item
            setWishlist(updatedWishlist);

            // Show success message
            setShowWishlistMessage(true);
            localStorage.setItem(`showWishlistMessage_${user._id}_${productId}`, "true");
            toast.success('به علاقه مندی ها اضافه شد');
        } catch (error) {
            console.error('Error while adding to wishlist', error);
        }
    };

    const handleCommentsUpdate = useCallback(() => {
        setCommentsUpdated(prev => !prev);
        refetchComments();
    }, []);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleMainImageClick = () => {
        setIsModalOpen(true); // Open the modal when the main image is clicked
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const handleQtyIncrease = () => {
        if (quantity < Math.min(product?.stock || 0)) {
            setQuantity(quantity + 1);
        } else {
            toast.error('نمی‌توانید بیش از تعداد موجودی افزایش دهید');
        }
    };

    const handleQtyDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else if (quantity === 1) {
            toast.error('می توانید حداقل یک محصول را انتخاب کنید');
        }
    };

    const handleAddToCart = () => {
        if (!user) {
            toast.error('ابتدا در سایت عضو شوید');
            return;
        }
        if (product && selectedSize && selectedColor) {
            handleAddProductToCart({
                ...product,
                quantity,
                selectedColor,  // Store the selected color
                selectedSize
            });
            setIsProductInCart(true);
        } else {
            toast.error('سایز و رنگ محصول را انتخاب کنید');
        }
    };


    useEffect(() => {
        if (comments.length > 0) {
            const totalRating = comments.reduce((sum, comment) => sum + (comment.rating || 0), 0);
            const average = totalRating / comments.length;
            setAverageRating(average);
        } else {
            setAverageRating(null);
        }
    }, [comments]);


    return (
        <div>
            {isProductLoading ? (
                <div className="mt-32 flex items-center justify-center">
                    <Spinner size={40} />
                </div>
            ) : (
                <div className="mt-20 xl:mt-5 w-full">
                    <div className="flex flex-col">
                        <div className="flex items-start xl:flex-col">
                            <div className="w-[30rem] xl:flex xl:flex-col items-center justify-center xl:w-full">
                                <div className="w-[30rem] h-full xl:flex xl:items-center xl:justify-center xl:w-full">
                                    <Swiper
                                        modules={[Thumbs]}
                                        slidesPerView={1}
                                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} // Check if thumbsSwiper is initialized
                                        className="w-[30rem] h-full flex items-center justify-center"
                                        onSlideChange={(swiper) => setSelectedImage(product?.images[swiper.activeIndex] || null)}
                                    >

                                        {product?.images.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <Image
                                                    src={image}
                                                    alt={`${product.title} ${index + 1}`}
                                                    width={450}
                                                    height={450}
                                                    priority
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                                    className="object-cover rounded-md h-[35rem] cursor-pointer"
                                                    onClick={handleMainImageClick}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                <div className="max-w-[28rem] w-full mt-4 p-1 rounded-md border-[1px] border-slate-300">
                                    <Swiper
                                        modules={[Thumbs]}
                                        onSwiper={setThumbsSwiper}
                                        slidesPerView={3}
                                        spaceBetween={3}
                                        breakpoints={{
                                            450: {
                                                slidesPerView: 4,
                                            },
                                            600: {
                                                slidesPerView: 5,
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
                                                        src={image}
                                                        alt={`${product.title} ${index + 1}`}
                                                        width={100}
                                                        height={100}
                                                        priority
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                                        className="object-cover transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                <div>
                                    {isModalOpen && (
                                        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
                                            <div className="relative">
                                                <Image
                                                    src={selectedImage || ""}
                                                    alt="تصویر"
                                                    width={500}
                                                    height={500}
                                                    priority
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                                    className="object-cover rounded-md w-[32rem] s:w-[26rem] m:w-[20rem]"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>

                            <div className="mt-7 flex flex-col gap-5 flex-grow">
                                <div className="flex flex-col gap-4">
                                    <h1 className="text-3xl font-bold">{product?.title}</h1>
                                    <div className="relative w-fit">
                                        {/* Display average rating */}
                                        <Rating
                                            value={averageRating || 0}
                                            precision={0.5}
                                            readOnly
                                            sx={{ direction: 'ltr', fontSize: '1.7rem' }}
                                        />
                                        <div className="absolute -left-6 -bottom-3">
                                            {averageRating !== null && (
                                                <span className="text-xs text-slate-500 ml-2">({averageRating.toFixed(1)})</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="flex items-center gap-1">
                                    {product?.offer ? (
                                        <div className="flex items-center gap-4">
                                            <span className="text-[1.4rem] text-slate-400 text-offer">{formatPriceToFarsi(product?.price)}</span>

                                            <hr className="w-[1px] h-[1.6rem] bg-slate-400 relative -top-1" />

                                            <span className="text-[1.6rem] text-slate-500">{formatPriceToFarsi(product?.offer)}</span>
                                        </div>
                                    ) : (
                                        <span className="text-[1.6rem] text-slate-500">{formatPriceToFarsi(product?.price)}</span>
                                    )}
                                    <span className="text-md">تومان</span>
                                </h3>

                                <div className="flex items-center gap-6">
                                    {product?.isStatus && (
                                        <>
                                            <p className="flex items-center gap-1">
                                                <span>تعداد : </span>
                                                <span className="font-bold">{formatPriceToFarsi(product?.stock)}</span>
                                            </p>
                                            <hr className="w-[1px] h-[1.1rem] bg-slate-300" />
                                        </>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <span className="font-semibold">وضعیت : </span>
                                        <div className={product?.isStatus ? 'text-teal-400' : 'text-rose-400'}>
                                            {product?.isStatus ? 'موجود' : 'ناموجود'}
                                        </div>
                                    </div>
                                </div>

                                {isProductInCart ? (
                                    <>
                                        <p className="mb-2 text-slate-500 flex items-center gap-1">
                                            <MdCheckCircle size={20} className="text-teal-400" />
                                            <span> کالا به سبد خرید شما اضافه شد</span>
                                        </p>

                                        <div className="max-w-[18.75rem]">
                                            <Button label="مشاهده سبد خرید" outline onClick={() => { router.push('/cart') }} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {product?.isStatus ? (
                                            <>
                                                <div className="flex items-center gap-4 xl:gap-1 max-w-[30rem] xl:flex-row xl:w-full">
                                                    <div className="flex flex-col gap-1 w-full">
                                                        <label htmlFor="size" className="xl:hidden">سایز</label>
                                                        <select
                                                            id="size"
                                                            name="size"
                                                            value={selectedSize ?? ""}
                                                            onChange={(e) => setSelectedSize(e.target.value)}
                                                            className="p-2 border border-slate-300 rounded outline-none w-full"
                                                        >
                                                            <option value="">انتخاب سایز</option>
                                                            {product?.sizes.map((size, index) => (
                                                                <option key={index} value={size}>
                                                                    {formatPriceToFarsi(size)}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="flex flex-col gap-1 w-full">
                                                        <label htmlFor="color" className="xl:hidden">رنگ</label>
                                                        <select
                                                            id="color"
                                                            name="color"
                                                            value={selectedColor ?? ""}
                                                            onChange={(e) => setSelectedColor(e.target.value)}
                                                            className="p-2 border border-slate-300 rounded outline-none w-full"
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

                                                <SetQuantity
                                                    productType={{ ...product, quantity }}
                                                    handleQtyIncrease={handleQtyIncrease}
                                                    handleQtyDecrease={handleQtyDecrease}
                                                />

                                                <div className="max-w-[18.75rem]">
                                                    <Button
                                                        label="افزودن به سبد"
                                                        onClick={handleAddToCart}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="max-w-[18.75rem]">
                                                    <div className="rounded-md bg-rose-500 text-white px-2 py-3 text-[1.1rem] transition w-full border-slate-700 flex items-center justify-center gap-2">ناموجود</div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}

                                <div>
                                    {showWishlistMessage ? (
                                        <>
                                            <p className="mb-2 text-slate-500 flex items-center gap-1">
                                                <MdCheckCircle size={20} className="text-green-500" />
                                                <span>کالا به لیست علاقه‌مندی‌ها اضافه شد</span>
                                            </p>

                                            <div className="max-w-[18.75rem]">
                                                <Button label="مشاهده لیست علاقه‌مندی‌ها" outline onClick={() => { router.push('/wishlist') }} />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="max-w-[18.75rem]">
                                            <Button
                                                label="افزودن به لیست علاقه‌مندی‌ها"
                                                onClick={() => {
                                                    if (productId) {
                                                        handleAddToWishlist(productId);
                                                    } else {
                                                        console.error("Product ID is undefined");
                                                    }
                                                }}
                                                custom="!bg-rose-500 !border-rose-500"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 w-full max-w-[60rem] leading-[1.9rem] text-justify">
                            <p>{formatPriceToFarsi(product?.description)}</p>
                        </div>


                        <div className="mt-10">
                            <div className="flex gap-10 w-full s:flex-col s:gap-5">
                                <div className="w-[24rem] s:w-full">
                                    <CommentForm productId={productId} onCommentAdded={handleCommentsUpdate} />
                                </div>

                                <div className="w-full mt-[3.6rem]">
                                    <CommentList productId={productId} commentsUpdated={commentsUpdated} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
