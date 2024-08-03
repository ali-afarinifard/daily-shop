import ProductType from "@/types/product";
import api from "./api"



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