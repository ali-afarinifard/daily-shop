'use client'

import Container from "@/app/components/Container"
import ProductDetails from "@/app/components/products/ProductDetails"
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const ProductPage = () => {

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user, logout } = authContext;


    if (!user) {
        return <p>Please log in to view your wishlist.</p>;
    }

    return (
        <div>
            <Container>
                <ProductDetails userId={user._id} />
            </Container>
        </div>
    )
}

export default ProductPage