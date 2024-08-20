import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteProduct = () => {

    const [productInfo, setProductInfo] = useState();
    const { id } = useParams();
    console.log('Single Product =>', {id});
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        axios.get(`http://localhost:5000/api/products/${id}`)
            .then((response) => {
                setProductInfo(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    }, [id]);

    const goBack = () => {
        navigate('/products');
    };

    const deleteProduct = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            goBack();
            toast.success('حذف شد');
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('خطایی رخ داده');
        }
    };

    return (
        <div>
            <h1 className="text-center">{productInfo?.title} حذف شود؟</h1>
            <div className="flex gap-2 justify-center mt-5">
                <button className="btn-red" onClick={deleteProduct}>حذف</button>
                <button className="btn-default" onClick={goBack}>انصراف</button>
            </div>
        </div>
    );
}

export default DeleteProduct;
