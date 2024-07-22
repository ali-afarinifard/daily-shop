import axios from "axios";


// ** Create API => Base URL
// export const api = axios.create({
//     baseURL: "http://localhost:5000/api",
// });

// ** Fetching Data................

const API_URL = 'http://localhost:5000/api/auth';


const register = (username, email, password) => {
    return axios.post(`${API_URL}/register`, { username, email, password });
};

const login = (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password });
};

const refreshToken = (token) => {
    return axios.post(`${API_URL}/token`, { token });
};

export { register, login, refreshToken };




// ** GET All Categories
export const getAllCategories = async () => {
    try {

        const response = await api.get("/categories");
        return response.data;

    } catch (error) {
        console.error('Error fetching product:', error);
    }
};


// ** Products__________
// ** GET
export const getAllProducts = async () => {
    try {

        const response = await api.get("/products");
        return response.data;

    } catch (error) {
        console.error('Error fetching product:', error);
    }
};


// ** GET by ID
export const getProduct = async ({ queryKey }) => {
    try {
        const [_, id] = queryKey;
        const response = await api.get(`/products/${id}`);
        return response.data;

    } catch (error) {
        console.error('Error fetching product:', error);
    }
}


// ** POST
export const createProduct = async (product) => {
    try {

        const response = await api.post('/products', product);
        return response.data;

    } catch (error) {
        console.error('Error creating product:', error);
    }
}


// ** PUT
export const updateProduct = async ({ id, product }) => {
    try {

        const response = await api.put(`/products/${id}`, product);
        return response.data;

    } catch (error) {
        console.error('Error Updating product:', error);
    }
}


// ** DELETE
export const deleteProduct = async ({ id }) => {
    try {

        const response = await api.delete(`/products/${id}`);
        return response.data;

    } catch (error) {
        console.error('Error Deleting product:', error);
    }
};