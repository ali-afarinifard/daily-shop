import ProductType from "@/types/product";
import api from "./api"
import CategoryType from "@/types/category";



export const getAllProducts = async () => {
    try {

        const response = await api.get('/products');
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error)
    }
};


export const getProductsByCategory = async (categoryId: string): Promise<ProductType[]> => {
    const response = await api.get(`/products?category=${categoryId}`);
    return response.data;
};


export const getProductById = async (productId: string): Promise<ProductType> => {
    const response = await api.get(`/products/${productId}`);
    console.log(response.data);
    return response.data;
}


export const getAllCategories = async () => {
    try {

        const response = await api.get('/categories');
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error)
    }
};


export const getCategoryById = async (categoryId: string): Promise<CategoryType> => {
    const response = await api.get(`/categories/${categoryId}`);
    return response.data;
}