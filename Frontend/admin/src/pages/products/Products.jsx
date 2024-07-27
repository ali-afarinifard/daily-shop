import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/api";
import { GrView } from "react-icons/gr";
import Loader from "../../components/modules/Loader";



const ProductPage = () => {

    const { data, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts
    });
    console.log(data)

    if (isLoading) return <Loader />;

    if (error) return <div>Error...</div>

    return (
        <div>
            <Link
                to={'/products/add'}
                className="btn-primary"
            >
                ایجاد
            </Link>

            <table className="basic mt-2 text-center">

                <thead>
                    <tr>
                        <td>نام</td>
                        <td className="m:hidden">قیمت</td>
                        <td className="">دسته بندی</td>
                        <td className="">رنگ</td>
                        <td>عملیات</td>
                    </tr>
                </thead>

                <tbody>
                    {data.map((product) => (
                        <tr key={product._id}>
                            <td>{product.title}</td>
                            <td className="m:hidden">{product.price}</td>
                            <td className="">
                                {product.category.name}
                            </td>
                            <td className="">
                                {Object.entries(product.properties).map(([key, value]) => (
                                    <p key={key}>{value}</p>
                                ))}
                            </td>
                            <td className="l:flex l:flex-col l:gap-2 l:justify-center">
                                <Link className="btn-default flex items-center justify-center" to={'/products/view/' + product._id}>
                                    <GrView size={16} />
                                    نمایش
                                </Link>

                                <Link className="btn-default flex items-center justify-center" to={'/products/edit/' + product._id}>
                                    <FaRegEdit size={16} />
                                    ویرایش
                                </Link>

                                <Link className="btn-default flex items-center justify-center" to={'/products/delete/' + product._id}>
                                    <FaRegTrashCan size={16} />
                                    حذف
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default ProductPage