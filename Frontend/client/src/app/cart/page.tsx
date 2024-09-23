// ** Components
import { Box } from "@mui/material"
import CartClient from "../components/cart/CartClient"
import Container from "../components/Container"

const CartPage = () => {
    return (
        <Box
            sx={{
                pt: '5rem'
            }}
        >
            <Container>
                <CartClient />
            </Container>
        </Box>
    )
}

export default CartPage