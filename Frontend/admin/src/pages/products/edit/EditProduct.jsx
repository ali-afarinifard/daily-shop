import { useParams } from 'react-router-dom';
import ProductForm from '../../../components/templates/ProductForm'
import { useQuery } from '@tanstack/react-query';
import { getAllCategories, getProduct } from '../../../services/apiUrls';
import Loader from '../../../components/modules/Loader';

const EditProduct = () => {
    const { id } = useParams();

    const { data: productInfo, error: productError, isLoading: isProductLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: getProduct,
        enabled: !!id
    });

    const { data: categories, error: categoriesError, isLoading: isCategoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    })

    if (isProductLoading || isCategoriesLoading) {
        return <Loader />;
    }
    

    if (productError || categoriesError) {
        return <div>Error loading data</div>;
    }

    return (
        <div>
            <h1 className="font-[400] text-[1.4rem]">ویرایش محصول</h1>
            {productInfo && (
                <ProductForm {...productInfo} categories={categories} />
            )}
        </div>
    );
}

export default EditProduct;
