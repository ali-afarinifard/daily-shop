// ** Components
import { Box } from "@mui/material"
import Container from "../components/Container"
import Products from "../components/products/Products"


const ProductsPage = () => {
    return (
        <Box
            component="div"
            sx={{
                pt: { xs: '2.5rem', lg: '5rem' }
            }}
        >
            <Container>
                <Products />
            </Container>
        </Box>
    )
}

export default ProductsPage