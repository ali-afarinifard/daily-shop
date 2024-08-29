import Container from "../components/Container"
import TopSalesProducts from "../components/products/TopSalesProducts"

const topSalesProductsPage = () => {
    return (
        <div className="pt-20 xl:pt-10">
            <Container>
                <TopSalesProducts />
            </Container>
        </div>
    )
}

export default topSalesProductsPage