import ProductType from "@/types/product";
import api from "./api"
import CategoryType from "@/types/category";
import { User } from "@/context/AuthContext";


interface UpdateUserParams {
    userId: string;
    fullName: string;
    username: string;
    email: string;
    password: string;
    city: string;
    phoneNumber: string;
    postalCode: string;
    address: string
}



// ** Auth______________________________
const register = (username: string, email: string, password: string) => {
    return api.post('/auth/user/register', { username, email, password });
};

const login = (email: string, password: string) => {
    return api.post('/auth/user/login', { email, password });
};

const refreshToken = (token: string) => {
    return api.post('/auth/user/token', { token });
};

const logout = async (token: string) => {
    return api.post('/auth/user/logout', { token });
};

const resetAccount = async (email: string, newPassword: string) => {
    try {

        const response = await api.post('/auth/user/reset-password', { email, newPassword });
        return response.data;

    } catch (error) {
        console.error('Error resetAccount', error);
        throw error;
    }
};

const updateUser = async (userData: UpdateUserParams) => {
    try {

        const response = await api.put('/auth/user', userData);
        return response.data;

    } catch (error) {
        console.error('Error updateUser', error);
        throw error;
    }
}


export { register, login, refreshToken, logout, updateUser, resetAccount };






// ** Products & Categories______________________________
// ** GET All Products
export const getAllProducts = async () => {
    try {

        const response = await api.get('/products');
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};


// ** GET Product By Category
export const getProductsByCategory = async (categoryId: string): Promise<ProductType[]> => {
    try {

        const response = await api.get(`/products?category=${categoryId}`);
        return response.data;

    } catch (error) {
        console.error('Error get product by Category', error);
        throw error;
    }
};



// ** GET Product By ID
export const getProductById = async (productId: string): Promise<ProductType> => {
    try {

        const response = await api.get(`/products/${productId}`);
        return response.data;

    } catch (error) {
        console.error('Error get product by Id', error);
        throw error;
    }
}



// ** GET All Categories
export const getAllCategories = async () => {
    try {

        const response = await api.get('/categories');
        return response.data;

    } catch (error) {
        console.error('Error get all product', error);
        throw error;
    }
};


// ** GET Category By ID
export const getCategoryById = async (categoryId: string): Promise<CategoryType> => {
    try {

        const response = await api.get(`/categories/${categoryId}`);
        return response.data;

    } catch (error) {
        console.error('Error get category by Id', error);
        throw error;
    }
};





// ** Search Tools______________________________
export const getProductsBySearch = async (query: string): Promise<ProductType[]> => {
    try {

        const response = await api.get('/search', { params: { q: query } });
        return response.data;

    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
};






// ** Wishlist ______________________________
export const addToWishlist = async (userId: string, productId: string) => {
    console.log("Adding to wishlist:", { userId, productId });
    try {

        const response = await api.post('/wishlist/add', { userId, productId });
        return response.data;

    } catch (error) {
        console.error('Error adding to wishlist', error);
        throw error;
    }
};


export const removeFromWishlist = async (userId: string, productId: string) => {
    try {

        const response = await api.post('/wishlist/remove', { userId, productId });
        return response.data;

    } catch (error) {
        console.error('Error removing from wishlist', error);
        throw error;
    }
};


export const getWishlist = async (userId: string) => {
    try {

        const response = await api.get(`/wishlist/${userId}`);
        return response.data;

    } catch (error) {
        console.error('Error fetching wishlist', error);
        throw error;
    }
};





// ** Comments ______________________________
export const createComment = async (userId: string, productId: string | undefined, content: string, rating: number) => {
    try {

        const response = await api.post('/comment/add', { userId, productId, content, rating });
        return response.data;

    } catch (error) {
        console.error('Error creating comment', error);
        throw error;
    }
};


export const getComments = async (productId: string | undefined) => {
    try {

        const response = await api.get(`/comments/${productId}`);
        return response.data;

    } catch (error) {
        console.error('Error getting comment', error);
        throw error;
    }
};