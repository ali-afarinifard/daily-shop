// ** Components
import Container from "../components/Container"
import TopSalesProducts from "../components/products/TopSalesProducts"

// ** mui
import { Box } from "@mui/material"


const topSalesProductsPage = () => {
    return (
        <Box
            component="div"
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