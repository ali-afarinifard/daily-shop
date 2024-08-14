'use client'

import Container from "@/app/components/Container"
import ProductDetails from "@/app/components/products/ProductDetails"
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const ProductPage = () => {

    return (
        <div>
            <Container>
                <ProductDetails/>
            </Container>
        </div>
    )
}

export default ProductPage