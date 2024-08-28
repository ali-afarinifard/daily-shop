import Container from "../components/Container"
import TopSalesProducts from "../components/products/TopSalesProducts"

const topSalesProductsPage = () => {
    return (
        <div className="pt-28">
            <Container>
                <TopSalesProducts />
            </Container>
        </div>
    )
}

export default topSalesProductsPage