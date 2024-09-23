'use client'


// ** Components
import Container from "@/app/components/Container"
import ProductDetails from "@/app/components/products/ProductDetails"
import { Box } from "@mui/material"

const ProductPage = () => {

    return (
        <Box>
            <Container>
                <ProductDetails/>
            </Container>
        </Box>
    )
}

export default ProductPage