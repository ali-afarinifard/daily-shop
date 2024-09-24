'use client';


// ** Next
import Image from "next/image";
import { useContext } from "react";

// ** Hooks
import { useCart } from "@/hooks/useCart";

// ** Auth Context
import { AuthContext } from "@/context/AuthContext";

// ** Utils
import { formatPriceToFarsi } from "@/utils/formatPriceToFarsi";

// ** Icons
import { MdArrowBack } from "react-icons/md";

// ** Components
import Heading from "../Heading";
import CartItem from "./CartItem";
import Button from "../Button";

// ** Public
import emptyCart from "../../../../public/images/cart/empty-cart.webp";
import { Box, Link, Typography } from "@mui/material";


const CartClient = () => {

    const { cartProducts, handleClearCart, cartTotalAmount, cartTotalQty } = useCart();

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    };

    const { user } = authContext;


    if (!cartProducts || cartProducts.length === 0 || !user) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h2">سبد خرید شما خالی است!</Typography>

                <Image src={emptyCart} alt="empty cart" style={{ width: '20rem' }} />

                <Box>
                    <Link href={'/'} sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem', mt: '0.5rem' }}>
                        <Typography variant="body1"> رفتن به فروشگاه</Typography>
                        <MdArrowBack />
                    </Link>
                </Box>

            </Box >
        )
    };


    return (
        <Box>
            <Heading title="سبد خرید شما" center />

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    fontSize: '0.85rem',
                    gap: '1rem',
                    pb: '0.5rem',
                    alignItems: 'center',
                    mt: '2.5rem'
                }}
            >
                <Box
                    sx={{
                        gridColumn: 'span 2',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        justifySelf: 'start'
                    }}
                >
                    <Typography variant="body2">کالا</Typography>
                    <Typography variant="body2">({formatPriceToFarsi(cartTotalQty)})</Typography>
                </Box>

                <Typography variant="body2" sx={{ justifySelf: 'center' }}>قیمت</Typography>
                <Typography variant="body2" sx={{ justifySelf: 'center' }}>تعداد</Typography>
                <Box
                    sx={{
                        justifySelf: 'end',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}
                >
                    <Typography variant="body2" sx={{ textAlign: 'end' }}>قیمت کالاها</Typography>
                    <Typography variant="body2">({formatPriceToFarsi(cartTotalQty)})</Typography>
                </Box>
            </Box>

            <Box>
                {cartProducts && cartProducts.map((item) => (
                    <CartItem key={item._id} item={item} />
                ))}
            </Box>

            <Box
                sx={{
                    borderTop: '1.5px',
                    borderColor: '#e2e8f0',
                    py: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexDirection: { xs: 'column', '2xs': 'row' }
                }}
            >
                <Box
                    sx={{
                        width: '6rem'
                    }}
                >
                    <Button label="حذف همه" onClick={() => { handleClearCart() }} small outline />
                </Box>

                <Box
                    sx={{
                        fontSize: '0.85rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        gap: '0.25rem'
                    }}
                >

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            fontSize: '1rem',
                            lineHeight: '1.5rem',
                            fontWeight: 700,
                            mb: '0.75rem'
                        }}
                    >
                        <Typography variant="body1">جمع سبد خرید</Typography>

                        <Typography variant="body1">{formatPriceToFarsi(cartTotalAmount)}</Typography>
                    </Box>

                    <Typography variant="body1" sx={{ color: '#64748b', mb: '0.5rem' }}>هزینه پست و ارسال هنگام پرداخت محاسبه می شود</Typography>

                    <Button label="تایید و تکمیل سفارش" onClick={() => { }} />

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: '100%'
                        }}
                    >
                        <Link href={'/'} sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem', mt: '1rem', textDecoration: 'none' }}>
                            <Typography variant="body1">برگشت به فروشگاه</Typography>
                            <MdArrowBack />
                        </Link>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
};

export default CartClient;
