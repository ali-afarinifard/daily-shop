import { useParams } from 'react-router-dom';
import ProductForm from '../../../components/templates/ProductForm'
import { useQuery } from '@tanstack/react-query';
import { getAllCategories, getProduct } from '../../../services/apiUrls';
import Loader from '../../../components/modules/Loader';
import { formatPriceWithSlashes } from '../../../utils/formatPrice';

const EditProduct = () => {
    const { id } = useParams();

    const { data: productInfo, error: productError, isLoading: isProductLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: getProduct,
        enabled: !!id,
    });

    const { data: categories, error: categoriesError, isLoading: isCategoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    });

    if (isProductLoading || isCategoriesLoading) {
        return <Loader />;
    };


    if (productError || categoriesError) {
        return <div>Error loading data</div>;
    };


    // Format the price and offer before passing to ProductForm
    const formattedProductInfo = {
        ...productInfo,
        price: formatPriceWithSlashes(productInfo.price.toString()),
        offer: productInfo.offer ? formatPriceWithSlashes(productInfo.offer.toString()) : ''
    };


    return (
        <div>
            <h1 className="font-[400] text-[1.4rem]">ویرایش محصول</h1>
            {productInfo && (
                <ProductForm {...formattedProductInfo} categories={categories} />
            )}
        </div>
    );
}

export default EditProduct;
