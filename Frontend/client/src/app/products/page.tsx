// ** Components
import Container from "../components/Container"
import Products from "../components/products/Products"


const ProductsPage = () => {
    return (
        <div className="pt-20 xl:pt-10">
            <Container>
                <Products />
            </Container>
        </div>
    )
}

export default ProductsPage