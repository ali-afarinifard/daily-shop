import CategoryType from "./category";

type ProductType = {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: CategoryType;
    images: string[];
    stock: number;
    gender: string;
    sizes: number[];
    colors: string[];
};

export default ProductType;