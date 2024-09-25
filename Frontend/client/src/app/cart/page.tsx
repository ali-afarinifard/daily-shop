// ** MUI
import { Box } from "@mui/material"

// ** Components
import CartClient from "../components/cart/CartClient"
import Container from "../components/Container"

const CartPage = () => {
    return (
        <Box
            component="div"
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