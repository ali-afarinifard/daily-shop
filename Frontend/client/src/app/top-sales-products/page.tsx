// ** Components
import { Box } from "@mui/material"
import Container from "../components/Container"
import TopSalesProducts from "../components/products/TopSalesProducts"

const topSalesProductsPage = () => {
    return (
        <Box
            sx={{
                pt: { xs: '2.5rem', lg: '5rem' }
            }}
        >
            <Container>
                <TopSalesProducts />
            </Container>
        </Box>
    )
}

export default topSalesProductsPage