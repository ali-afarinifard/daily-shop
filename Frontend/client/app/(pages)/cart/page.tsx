

import Container from "@/app/components/Container"
import CartClient from "@/app/components/cart/CartClient"

const CartPage = () => {
    return (
        <div className="pt-36">
            <Container>
                <CartClient />
            </Container>
        </div>
    )
}

export default CartPage