'use client'


import { CardProductType } from "@/types";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";


type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CardProductType[] | null;
    handleAddProductToCart: (product: CardProductType) => void;
    handleCartQtyIncrease: (product: CardProductType) => void;
    handleCartQtyDecrease: (product: CardProductType) => void;
    handleRemoveProductFromCart: (product: CardProductType) => void;
    handleClearCart: () => void;
};


export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}


export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0)
    const [cartProducts, setCartProducts] = useState<CardProductType[] | null>(null);

    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems');
        const cProducts: CardProductType[] | null = JSON.parse(cartItems);
        // cProducts => cartProducts

        setCartProducts(cProducts);
    }, []);


    useEffect(() => {

        const getTotals = () => {

            if (cartProducts) {
                const { total, qty } = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity;

                    acc.total += itemTotal;
                    acc.qty += item.quantity;

                    return acc;

                }, {
                    total: 0,
                    qty: 0,
                }
                );

                setCartTotalQty(qty);
                setCartTotalAmount(total);
            };
        };

        getTotals();

    }, [cartProducts]);


    const handleAddProductToCart = useCallback((product: CardProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if (prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            };



            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
        toast.success('این کالا به سبد خرید اضافه شد!');
    }, []);


    const handleRemoveProductFromCart = useCallback((product: CardProductType) => {

        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id;
            });

            setCartProducts(filteredProducts);
            toast.success('حذف شد');
            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts));
        };

    }, [cartProducts]);


    const handleCartQtyIncrease = useCallback((product: CardProductType) => {

        let updatedCart;

        if (product.quantity === 99) {
            return toast.error("به بیشترین مقدار رسیده است");
        };

        if (cartProducts) {

            updatedCart = [...cartProducts];

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity + 1
            }

            setCartProducts(updatedCart);
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
        }

    }, [cartProducts]);


    const handleCartQtyDecrease = useCallback((product: CardProductType) => {

        let updatedCart;

        if (product.quantity === 1) {
            return toast.error("به حداقل رسیده است");
        };

        if (cartProducts) {

            updatedCart = [...cartProducts];

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity - 1
            }

            setCartProducts(updatedCart);
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
        }

    }, [cartProducts]);


    const handleClearCart = useCallback(() => {

        setCartProducts(null);
        setCartTotalQty(0);
        localStorage.setItem('eShopCartItems', JSON.stringify(null));

    }, [cartProducts])


    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart
    };

    return <CartContext.Provider value={value} {...props} />

};


export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error('useCart must be used within a CartContextProvider');
    };

    return context;
}