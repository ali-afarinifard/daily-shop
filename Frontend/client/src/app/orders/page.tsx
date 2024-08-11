import Container from "../components/Container"
import OrdersList from "../components/orders/OrdersList"

const OrdersPage = () => {
    return (
        <div className="pt-8">
            <Container>
                <OrdersList />
            </Container>
        </div>
    )
}

export default OrdersPage