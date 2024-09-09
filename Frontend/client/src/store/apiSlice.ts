// ** RTK-Q
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

// ** Context
import { User } from '@/context/AuthContext';

// ** Types
import CategoryType from '@/types/category';
import CommentType from '@/types/comment';
import ProductType from '@/types/product';

// ** Axios
import axios from 'axios';



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



const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});


// Custom baseQuery with token refresh logic
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs, // Type of args
    unknown, // Type of result
    FetchBaseQueryError, // Type of error
    Record<string, any> // Type for extraOptions
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // If the response was a 401, try refreshing the token
    if (result.error && result.error.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
            try {
                // Make the refresh token API call
                const response = await axios.post('http://localhost:5000/api/auth/user/token', { token: refreshToken });

                // Update the tokens in localStorage
                const { accessToken, refreshToken: newRefreshToken } = response.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                // Retry the original query with the new token
                result = await baseQuery(args, api, extraOptions);
            } catch (refreshError) {
                // If refresh fails, log the user out
                console.error('Token refresh failed', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                api.dispatch({ type: 'auth/logout' });
            }
        } else {
            // If no refresh token exists, log the user out
            console.log('No refresh token, logging out.');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            api.dispatch({ type: 'auth/logout' });
        }
    }

    return result;
};



export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        // ** Authentication Start...
        // Register
        register: builder.mutation<{ accessToken: string; refreshToken: string }, { username: string; email: string; password: string }>({
            query: ({ username, email, password }) => ({
                url: '/auth/user/register',
                method: 'POST',
                body: { username, email, password },
            }),
        }),

        // Login
        login: builder.mutation<{ accessToken: string; refreshToken: string }, { email: string, password: string }>({
            query: (credentials) => ({
                url: '/auth/user/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // Logout
        logout: builder.mutation<void, { token: string }>({
            query: ({ token }) => ({
                url: '/auth/user/logout',
                method: 'POST',
                body: { token },
            }),
        }),

        // GET User
        fetchUser: builder.query<User, string>({
            query: (token) => ({
                url: '/auth/user',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        // Reset Account
        resetAccount: builder.mutation<void, { email: string; newPassword: string }>({
            query: ({ email, newPassword }) => ({
                url: '/auth/user/reset-password',
                method: 'POST',
                body: { email, newPassword },
            }),
        }),

        // PUT Update Profile
        updateUser: builder.mutation<any, UpdateUserParams>({
            query: (userData) => ({
                url: '/auth/user',
                method: 'PUT',
                body: userData,
            }),
        }),
        // ** Authentication End...

        //  GET Products Endpoint
        getAllProducts: builder.query<ProductType[], void>({
            query: () => '/products',
        }),

        // GET ProductById Endpoint
        getProductById: builder.query<ProductType, string>({
            query: (productId) => `/products/${productId}`,
        }),

        // GET ProductsByCategory Endpoint
        getProductsByCategory: builder.query<ProductType[], string>({
            query: (categoryId) => `/products?category=${categoryId}`,
        }),

        // GET AllCategories Endpoint
        getAllCategories: builder.query<CategoryType[], void>({
            query: () => '/categories',
        }),

        // GET CategoryById Endpoint
        getCategoryById: builder.query<CategoryType, string>({
            query: (categoryId) => `/categories/${categoryId}`,
        }),

        // GET Wishlist Endpoint
        getWishlist: builder.query<any, string>({
            query: (userId) => `/wishlist/${userId}`,
        }),

        // POST Wishlist Endpoint
        addToWishlist: builder.mutation<any, { userId: string; productId: string }>({
            query: ({ userId, productId }) => ({
                url: '/wishlist/add',
                method: 'POST',
                body: { userId, productId },
            }),
        }),

        // POST Remove Wishlist Endpoint
        removeFromWishlist: builder.mutation<any, { userId: string; productId: string }>({
            query: ({ userId, productId }) => ({
                url: '/wishlist/remove',
                method: 'POST',
                body: { userId, productId },
            }),
        }),

        // GET Comments Endpoint
        getComments: builder.query<CommentType[], string>({
            query: (productId) => `/comments/${productId}`,
        }),

        // POST Comments Endpoint
        createComment: builder.mutation<any, { userId: string, productId: string | undefined, content: string, rating: number }>({
            query: ({ userId, productId, content, rating }) => ({
                url: '/comment/add',
                method: 'POST',
                body: { userId, productId, content, rating },
            }),
        }),

        // GET searchProducts Endpoint
        searchProducts: builder.query<ProductType[], string>({
            query: (query) => `/search?q=${query}`,
        }),
    }),
});


export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useFetchUserQuery,
    useResetAccountMutation,
    useUpdateUserMutation,
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useGetProductsByCategoryQuery,
    useGetAllCategoriesQuery,
    useGetCategoryByIdQuery,
    useGetWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
    useGetCommentsQuery,
    useCreateCommentMutation,
    useSearchProductsQuery,
} = apiSlice;