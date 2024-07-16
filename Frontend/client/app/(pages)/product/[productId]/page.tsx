import Container from '@/app/components/Container'
import { ProductType } from '@/types'
import { productsData } from '@/utils/products';

interface ProductPageProps {
    params: {
        productId: string;
    };
}

const getProduct = (productId: string): ProductType | null => {
    return productsData.find((product) => product.id === productId) || null;
};

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
    const product = getProduct(params.productId);

    return (
        <div className='p-8 mt-28'>
            <Container>
                {/* <ProductDetails product={product} /> */}
                Hello
            </Container>
        </div>
    )
}


export default ProductPage