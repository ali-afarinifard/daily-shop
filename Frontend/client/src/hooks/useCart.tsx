'use client';


// ** React
import { createContext, useCallback, useContext, useEffect, useState } from "react";

// ** Auth Context
import { AuthContext } from "@/context/AuthContext";

// ** Types
import CartContextType from "@/types/cart";
import ProductType from "@/types/product";

// ** Toast
import toast from "react-hot-toast";



export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user; // Safely access the user property

    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<ProductType[] | null>([]);
    
    // Use user ID to create a unique key
    const localStorageKey = `eShopCartItems_${user?._id}`;


    useEffect(() => {

        const storedCartProducts = localStorage.getItem(localStorageKey);
        if (storedCartProducts) {
            const parsedProducts = JSON.parse(storedCartProducts) as ProductType[];
            setCartProducts(parsedProducts);

            // Calculate totals
            const { total, qty } = parsedProducts.reduce(
                (acc, item) => {
                    const itemTotal = item.price * item.quantity;
                    acc.total += itemTotal;
                    acc.qty += item.quantity;
                    return acc;
                },
                {
                    total: 0,
                    qty: 0,
                }
            );

            setCartTotalQty(qty);
            setCartTotalAmount(total);
        }

        if (!user?._id) {
            setCartTotalQty(0);
            setCartTotalAmount(0);
        }

    }, [user?._id]);

    const updateCartInLocalStorage = (updatedCart: ProductType[]) => {

        localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));

        // Update totals
        const { total, qty } = updatedCart.reduce(
            (acc, item) => {
                const itemTotal = item.price * item.quantity;
                acc.total += itemTotal;
                acc.qty += item.quantity;
                return acc;
            },
            {
                total: 0,
                qty: 0,
            }
        );

        setCartTotalQty(qty);
        setCartTotalAmount(total);

    };
    

    const handleAddProductToCart = useCallback(
        (newProduct: ProductType) => {
            if (!user?._id) return;

            setCartProducts((prev) => {
                let updatedCart = prev ? [...prev] : [];

                const existingProductIndex = updatedCart.findIndex((item) => item._id === newProduct._id);

                if (existingProductIndex > -1) {
                    updatedCart[existingProductIndex].quantity += newProduct.quantity;
                } else {
                    updatedCart.push(newProduct);
                }

                updateCartInLocalStorage(updatedCart);

                return updatedCart;
            });
            toast.success('کالا به سبد خرید اضافه شد');
        },
        [user?._id]
    );

    const handleRemoveProductFromCart = useCallback(
        (product: ProductType) => {
            if (!user?._id || !cartProducts) return;

            const filteredProducts = cartProducts.filter((item) => item._id !== product._id);
            setCartProducts(filteredProducts);
            updateCartInLocalStorage(filteredProducts);

            toast.success('حذف شد');
        },
        [user?._id, cartProducts]
    );

    const handleCartQtyIncrease = useCallback(
        (product: ProductType) => {
            if (!user?._id || !cartProducts) return;

            const updatedCart = [...cartProducts];
            const existingIndex = updatedCart.findIndex((item) => item._id === product._id);

            if (existingIndex > -1) {
                if (updatedCart[existingIndex].quantity >= product.stock) {
                    return toast.error("نمی‌توانید بیش از تعداد موجودی افزایش دهید");
                }

                updatedCart[existingIndex].quantity += 1;
            }

            setCartProducts(updatedCart);
            updateCartInLocalStorage(updatedCart);
        },
        [user?._id, cartProducts]
    );


    const handleCartQtyDecrease = useCallback(
        (product: ProductType) => {
            if (!user?._id || !cartProducts) return;

            const updatedCart = [...cartProducts];
            const existingIndex = updatedCart.findIndex((item) => item._id === product._id);

            if (existingIndex > -1) {
                if (updatedCart[existingIndex].quantity === 1) {
                    return toast.error("به حداقل رسیده است");
                }

                updatedCart[existingIndex].quantity -= 1;
            }

            setCartProducts(updatedCart);
            updateCartInLocalStorage(updatedCart);
        },
        [user?._id, cartProducts]
    );


    const handleClearCart = useCallback(() => {
        if (!user?._id) {
            setCartProducts([]);
            setCartTotalQty(0);
            setCartTotalAmount(0);
            localStorage.removeItem(localStorageKey);
        }

        setCartProducts([]);
        setCartTotalQty(0);
        setCartTotalAmount(0);
        localStorage.removeItem(localStorageKey);
    }, [user?._id]);
    

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
    };

    return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error('useCart must be used within a CartContextProvider');
    }

    return context;
};
