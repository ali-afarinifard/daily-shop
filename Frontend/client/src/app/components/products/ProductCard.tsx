import Product from "@/types/product"


interface ProductCardProps {
    product: Product
}


const ProductCard:React.FC<ProductCardProps> = ({product}) => {
    return (
        <div>
            {product.title}
        </div>
    )
}

export default ProductCard