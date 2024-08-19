import api from "../config/api";



// ** AUTH
const register = (username, email, password) => {
    return api.post('/auth/admin/register', { username, email, password });
};

const login = (email, password) => {
    return api.post('/auth/admin/login', { email, password });
};

const refreshToken = (token) => {
    return api.post('/auth/admin/token', { token });
};

const logout = (token) => {
    return api.post('/auth/admin/logout', { token });
};

const resetAccount = async (email, newPassword) => {
    try {

        const response = await api.post('/auth/admin/reset-password', { email, newPassword });
        return response.data;

    } catch (error) {
        console.error('Error resetAccount', error);
        throw error;
    }
};

const updateUser = async (adminData) => {
    try {

        const response = await api.put('/auth/admin', adminData);
        return response.data;

    } catch (error) {
        console.error('Error updateUser', error);
        throw error;
    }
};

export { register, login, refreshToken, logout, updateUser, resetAccount };



// ** Categories______________________
// ** GET All Categories
export const getAllCategories = async () => {
    try {

        const response = await api.get("/categories");
        return response.data;

    } catch (error) {
        console.error('Error fetching product:', error);
    }
};


// ** POST Category
export const createCategory = async (newCategory) => {
    try {

        const response = await api.post("/categories", newCategory);
        return response.data;

    } catch (error) {
        console.error('Error fetching product:', error);
    }
};


// ** PUT Category
export const updateCategory = async ({ updatedCategory, id }) => {
    try {

        const response = await api.put(`/categories/${id}`, updatedCategory);
        return response.data;

    } catch (error) {
        console.error('Error fetching product:', error);
    }
};


// ** DELETE Category
export const deleteCategory = async (id) => {
    try {

        const response = await api.delete(`/categories/${id}`);
        return response.data;

    } catch (error) {
        console.error('Error Deleting product:', error);
    }
};


// ** Products______________________
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
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error('Error Updating product:', error);
    }
};


// ** DELETE
export const deleteProduct = async ({ id }) => {
    try {

        const response = await api.delete(`/products/${id}`);
        return response.data;

    } catch (error) {
        console.error('Error Deleting product:', error);
    }
};