import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteProduct = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [productInfo, setProductInfo] = useState();
    const { id } = useParams();
    console.log('Single Product =>', { id });

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
        const params = new URLSearchParams(location.search);
        navigate(`/products?${params.toString()}`);
    };

    const deleteProduct = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            toast.success('حذف شد');
            goBack();
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
