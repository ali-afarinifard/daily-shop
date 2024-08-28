'use client';

import { addToWishlist, getComments, getProductById } from "@/libs/apiUrls";
import ProductType from "@/types/product";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useCart } from "@/hooks/useCart";
import Button from "../Button";
import SetQuantity from "./SetQuantity";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { formatPriceWithSlashes } from "@/utils/formatPrice";
import Spinner from "../Spinner";
import { Rating } from "@mui/material";
import CommentType from "@/types/comment";

const ProductDetails: React.FC = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;

    const pathname = usePathname();
    const productId = pathname.split('/').pop();

    const { handleAddProductToCart, cartProducts } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);

    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [showWishlistMessage, setShowWishlistMessage] = useState(false);
    const [commentsUpdated, setCommentsUpdated] = useState(false);
    const [averageRating, setAverageRating] = useState<number | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (productId) {
                    setLoading(true);
                    const productData = await getProductById(productId);
                    setProduct(productData);
                    if (productData?.images.length) {
                        setSelectedImage(productData.images[0]);
                    }

                    // Fetch comments and calculate average rating
                    const commentsData: CommentType[] = await getComments(productId);
                    calculateAverageRating(commentsData);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to load product details');
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId, commentsUpdated]);

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
                toast.error('ابتدا عضو شوید');
                return;
            }
            const updatedWishlist = await addToWishlist(user._id, productId);
            setWishlist(updatedWishlist);
            setShowWishlistMessage(true);
            localStorage.setItem(`showWishlistMessage_${user._id}_${productId}`, "true");
            toast.success('به علاقه مندی ها اضافه شد');
        } catch (error) {
            console.error('Error while adding wishlist', error);
        }
    };

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
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
            toast.error('ابتدا عضو شوید');
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


    const handleCommentsUpdate = useCallback(() => {
        setCommentsUpdated(prev => !prev);
    }, []);


    const calculateAverageRating = (comments: CommentType[]) => {
        if (comments.length === 0) {
            setAverageRating(null);
            return;
        }

        const totalRating = comments.reduce((sum, comment) => sum + (comment.rating || 0), 0);
        const average = totalRating / comments.length;
        setAverageRating(average);
    };


    return (
        <div>
            {loading ? (
                <div className="mt-32 flex items-center justify-center">
                    <Spinner size={40} />
                </div>
            ) : (
                <div className="mt-20">
                    <div className="flex flex-col">
                        <div className="flex items-start xl:flex-col">
                            <div className="w-[30rem] xl:flex xl:flex-col items-center justify-center xl:w-full">
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
                            </div>

                            <div className="mt-7 flex flex-col gap-5 flex-grow">
                                <div className="flex flex-col gap-4">
                                    <h1 className="text-3xl font-bold">{product?.title}</h1>
                                    <div>
                                        {/* Display average rating */}
                                        <Rating
                                            value={averageRating}
                                            precision={0.1}
                                            readOnly
                                            sx={{ direction: 'ltr', fontSize: '1.7rem' }}
                                        />
                                        {averageRating !== null && (
                                            <span className="text-xs text-slate-500 ml-2">({averageRating.toFixed(1)})</span>
                                        )}
                                    </div>
                                </div>
                                <h3 className="flex items-center gap-1">
                                    {product?.offer ? (
                                        <div className="flex items-center gap-4">
                                            <span className="text-[1.4rem] text-slate-400 text-offer">{formatPriceWithSlashes(product?.price)}</span>

                                            <hr className="w-[1px] h-[1.6rem] bg-slate-400 relative -top-1" />

                                            <span className="text-[1.6rem] text-slate-500">{formatPriceWithSlashes(product?.offer)}</span>
                                        </div>
                                    ) : (
                                        <span className="text-[1.6rem] text-slate-500">{formatPriceWithSlashes(product?.price)}</span>
                                    )}
                                    <span className="text-md">تومان</span>
                                </h3>

                                <div className="flex items-center gap-6">
                                    {product?.isStatus && (
                                        <>
                                            <p className="flex items-center gap-1">
                                                <span>تعداد : </span>
                                                <span className="font-bold">{product?.stock}</span>
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
                                                        <label htmlFor="size-select" className="xl:hidden">سایز</label>
                                                        <select
                                                            name="size"
                                                            id="size-select"
                                                            value={selectedSize ?? ""}
                                                            onChange={(e) => setSelectedSize(e.target.value)}
                                                            className="p-2 border border-slate-300 rounded outline-none w-full"
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

                        <div className="mt-16 w-full max-w-[60rem] leading-[1.75rem] text-justify">
                            <p>{product?.description}</p>
                        </div>

                        <div className="mt-10">
                            <div className="flex gap-10 w-full">
                                <div className="w-[23rem]">
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
