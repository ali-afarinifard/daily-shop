

import CategoryType from '@/types/category';
import CommentType from '@/types/comment';
import ProductType from '@/types/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



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



export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
    }),
    endpoints: (builder) => ({
        // PUT Update Profile
        updateUser: builder.mutation<any, UpdateUserParams>({
            query: (userData) => ({
                url: '/auth/user',
                method: 'PUT',
                body: userData,
            }),
        }),

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