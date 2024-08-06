import ProductType from "./product";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: ProductType[] | null;
    handleAddProductToCart: (product: ProductType) => void;
    handleRemoveProductFromCart: (product: ProductType) => void;
    handleCartQtyIncrease: (product: ProductType) => void;
    handleCartQtyDecrease: (product: ProductType) => void;
    handleClearCart: () => void;
};


export default CartContextType;