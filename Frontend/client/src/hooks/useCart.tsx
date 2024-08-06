'use client'

import CartContextType from "@/types/cart"
import ProductType from "@/types/product";
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast";



export const CartContext = createContext<CartContextType | null>(null);


interface Props {
    [propName: string]: any;
}


export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<ProductType[] | null>(null);


    // useEffect(() => {

    //     const getTotals = () => {
    //         if (cartProducts) {
    //             const { total, qty } = cartProducts?.reduce((acc, item) => {
    //                 const itemTotal = item.price * item.quantity;

    //                 acc.total += itemTotal;
    //                 acc.qty += item.quantity;

    //                 return acc;

    //             }, {
    //                 total: 0,
    //                 qty: 0,
    //             }
    //             );

    //             setCartTotalQty(qty);
    //             setCartTotalAmount(total);
    //         };
    //     };


    //     getTotals();

    // }, [cartProducts]);



    // const handleAddProductToCart = useCallback((product: ProductType) => {
    //     setCartProducts((prev) => {
    //         let updatedCart;

    //         if (prev) {
    //             updatedCart = [...prev, product]
    //         } else {
    //             updatedCart = [product]
    //         };



    //         localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
    //         return updatedCart;
    //     });
    //     // toast.success('این کالا به سبد خرید اضافه شد!');
    // }, []);



    useEffect(() => {
        const storedCartProducts = localStorage.getItem('eShopCartItems');
        if (storedCartProducts) {
            const parsedProducts = JSON.parse(storedCartProducts) as ProductType[];
            setCartProducts(parsedProducts);

            // Calculate totals
            const { total, qty } = parsedProducts.reduce((acc, item) => {
                const itemTotal = item.price * item.quantity;
                acc.total += itemTotal;
                acc.qty += item.quantity;
                return acc;
            }, {
                total: 0,
                qty: 0,
            });

            setCartTotalQty(qty);
            setCartTotalAmount(total);
        }
    }, []);



    // const handleAddProductToCart = useCallback((newProduct: ProductType) => {
    //     setCartProducts((prev) => {
    //         if (!prev) {
    //             // If the cart is empty, just add the new product
    //             localStorage.setItem('eShopCartItems', JSON.stringify([newProduct]));
    //             return [newProduct];
    //         }

    //         // Check if the product with the same size and color already exists in the cart
    //         const existingProductIndex = prev.findIndex(
    //             (item) =>
    //                 item._id === newProduct._id
    //         );

    //         let updatedCart = [...prev];

    //         if (existingProductIndex > -1) {
    //             // If the product exists, update the quantity
    //             updatedCart[existingProductIndex].quantity += newProduct.quantity;
    //         } else {
    //             // If the product doesn't exist, add it to the cart
    //             updatedCart.push(newProduct);
    //         }

    //         // Update the cart in local storage
    //         localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
    //         return updatedCart;
    //     });
    //     // toast.success('این کالا به سبد خرید اضافه شد!');
    // }, []);



    // Other functions (handleAddProductToCart, handleRemoveProductFromCart, etc.) remain the same



    const handleAddProductToCart = useCallback((newProduct: ProductType) => {
        setCartProducts((prev) => {
            let updatedCart = prev ? [...prev] : [];

            // Check if the product with the same size and color already exists in the cart
            const existingProductIndex = updatedCart.findIndex(
                (item) => item._id === newProduct._id
            );

            if (existingProductIndex > -1) {
                // If the product exists, update the quantity
                updatedCart[existingProductIndex].quantity += newProduct.quantity;
            } else {
                // If the product doesn't exist, add it to the cart
                updatedCart.push(newProduct);
            }

            // Update the cart in local storage
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));

            // Update cart total quantity immediately
            const newCartTotalQty = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
            setCartTotalQty(newCartTotalQty);

            return updatedCart;
        });
        toast.success('این کالا به سبد خرید اضافه شد!');
    }, []);






    const handleRemoveProductFromCart = useCallback((product: ProductType) => {

        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => {
                return item._id !== product._id;
            });

            setCartProducts(filteredProducts);
            toast.success('حذف شد');
            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts));
        };

    }, [cartProducts]);




    const handleCartQtyIncrease = useCallback((product: ProductType) => {

        let updatedCart;

        if (product.quantity === 99) {
            return toast.error("به بیشترین مقدار رسیده است");
        };

        if (cartProducts) {

            updatedCart = [...cartProducts];

            const existingIndex = cartProducts.findIndex((item) => item._id === product._id);

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity + 1
            }

            setCartProducts(updatedCart);
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
        }

    }, [cartProducts]);




    const handleCartQtyDecrease = useCallback((product: ProductType) => {

        let updatedCart;

        if (product.quantity === 1) {
            return toast.error("به حداقل رسیده است");
            return;
        };

        if (cartProducts) {

            updatedCart = [...cartProducts];

            const existingIndex = cartProducts.findIndex((item) => item._id === product._id);

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

    }, [cartProducts]);



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
};