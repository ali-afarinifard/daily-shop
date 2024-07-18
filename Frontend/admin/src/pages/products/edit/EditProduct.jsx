import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../../../components/templates/ProductForm'

const EditProduct = () => {
    const [productInfo, setProductInfo] = useState(null);
    const [categories, setCategories] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProductInfo(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchProduct();
        fetchCategories();
    }, [id]);

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
