import CartClient from "../components/cart/CartClient"
import Container from "../components/Container"

const CartPage = () => {
    return (
        <div className="pt-8">
            <Container>
                <CartClient />
            </Container>
        </div>
    )
}

export default CartPage