type Product = {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    stock: number;
    sizes: number[];
    colors: string[];
};

export default Product;