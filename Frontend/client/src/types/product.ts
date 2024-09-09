// ** Types
import CategoryType from "./category";

type ProductType = {
    _id: string;
    title: string;
    description: string;
    price: number;
    offer:number;
    category: CategoryType;
    images: string[];
    stock: number;
    gender: string;
    isStatus: boolean;
    quantity: number;
    sizes: number[];
    colors: string[];
    selectedColor?: string;
    selectedSize?: string;
};

export default ProductType;