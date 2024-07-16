// ** Axios
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../../components/templates/ProductForm"

const EditProduct = () => {

    const [productInfo, setProductInfo] = useState();

    const { id } = useParams();


    useEffect(() => {
        if (!id) return;

        axios.get(`http://localhost:5000/api/products/${id}`)
            .then((response) => {
                console.log(response.data)
                setProductInfo(response.data);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    }, [id]);


    return (
        <div>
            <h1 className="font-[400] text-[1.4rem]">ویرایش محصول</h1>
            {productInfo && (
                <ProductForm {...productInfo} />
            )}
        </div>
    )
}

export default EditProduct