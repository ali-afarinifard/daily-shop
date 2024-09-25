// ** Components
import { Box } from "@mui/material"
import Container from "../components/Container"
import OrdersList from "../components/orders/OrdersList"

const OrdersPage = () => {
    return (
        <Box
            component="div"
            sx={{
                pt: '2rem'
            }}
        >
            <Container>
                <OrdersList />
            </Container>
        </Box>
    )
}

export default OrdersPage