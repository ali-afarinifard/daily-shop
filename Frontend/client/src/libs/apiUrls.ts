import ProductType from "@/types/product";
import api from "./api"
import CategoryType from "@/types/category";
import { User } from "@/context/AuthContext";



interface WishlistResponse {
    wishlist: string[];
    message: string;
}


interface UpdateUserParams {
    userId: string;
    fullName: string;
    username: string;
    email: string;
    password: string;
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

const logout = (token: string) => {
    return api.post('/auth/user/logout', { token });
};

const updateUser = async (userData: UpdateUserParams) => {
    const response = await api.put('/auth/user', userData);
    return response.data;
}


export { register, login, refreshToken, logout, updateUser };






// ** Products & Categories______________________________
// ** GET All Products
export const getAllProducts = async () => {
    try {

        const response = await api.get('/products');
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error)
    }
};


// ** GET Product By Category
export const getProductsByCategory = async (categoryId: string): Promise<ProductType[]> => {
    const response = await api.get(`/products?category=${categoryId}`);
    return response.data;
};



// ** GET Product By ID
export const getProductById = async (productId: string): Promise<ProductType> => {
    const response = await api.get(`/products/${productId}`);
    console.log(response.data);
    return response.data;
}



// ** GET All Categories
export const getAllCategories = async () => {
    try {

        const response = await api.get('/categories');
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error)
    }
};


// ** GET Category By ID
export const getCategoryById = async (categoryId: string): Promise<CategoryType> => {
    const response = await api.get(`/categories/${categoryId}`);
    return response.data;
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