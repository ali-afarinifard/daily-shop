import Product from "@/types/product"
import Image from "next/image"


interface ProductBoxProps {
    product: Product
}


const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {

    const firstImage = product.images[0];

    return (
        <div>
            {product.title}
            <div>
                {firstImage && (
                    <Image
                        src={`http://localhost:5000/${firstImage.replace(/\\/g, '/')}`}
                        alt={product.title}
                        width={100}
                        height={100}
                    />
                )}
            </div>
        </div>
    )
}

export default ProductBox