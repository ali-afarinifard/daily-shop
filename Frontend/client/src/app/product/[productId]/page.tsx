'use client'

// ** Components
import Container from "@/app/components/Container"
import ProductDetails from "@/app/components/products/ProductDetails"

// ** MUI
import { Box } from "@mui/material"

const ProductPage = () => {

    return (
        <Box component="div">
            <Container>
                <ProductDetails/>
            </Container>
        </Box>
    )
}

export default ProductPage