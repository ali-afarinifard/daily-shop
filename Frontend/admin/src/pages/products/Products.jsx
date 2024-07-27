import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/api";
import { GrView } from "react-icons/gr";
import Loader from "../../components/modules/Loader";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { Box, Typography } from "@mui/material";
import { MdOutlineEditNote } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


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

            {/* <table className="basic mt-2 text-center">

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

            </table> */}

            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontFamily: 'Vazir', fontWeight: 'bold' }}>نام</TableCell>
                            <TableCell sx={{ fontFamily: 'Vazir', fontWeight: 'bold' }}>قیمت&nbsp;(تومان)</TableCell>
                            <TableCell sx={{ fontFamily: 'Vazir', fontWeight: 'bold' }}>دسته بندی</TableCell>
                            <TableCell sx={{ fontFamily: 'Vazir', fontWeight: 'bold' }}>رنگ</TableCell>
                            <TableCell sx={{ fontFamily: 'Vazir', fontWeight: 'bold' }} align="center">عملیات</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((product) => (
                            <TableRow
                                key={product._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontFamily: 'Vazir' }}>
                                    {product.title}
                                </TableCell>
                                <TableCell sx={{ fontFamily: 'Vazir' }}>{product.price}</TableCell>
                                <TableCell sx={{ fontFamily: 'Vazir' }}>{product.category.name}</TableCell>
                                <TableCell sx={{ fontFamily: 'Vazir' }}>
                                    {Object.entries(product.properties).map(([key, value]) => (
                                        <p key={key}>{value}</p>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                        <Tooltip title="حذف" sx={{ fontFamily: 'Vazir' }}>
                                            <Link to={'/products/delete/' + product._id} className="flex items-center gap-1 btn-default">
                                                <MdDeleteOutline size={24} />
                                                <Typography sx={{ fontFamily: 'Vazir', fontSize: '0.8rem' }}>حذف</Typography>
                                            </Link>
                                        </Tooltip>

                                        <Tooltip title="ویرایش" sx={{ fontFamily: 'Vazir' }}>
                                            <Link to={'/products/edit/' + product._id} className="flex items-center gap-1 btn-default">
                                                <MdOutlineEditNote size={24} />
                                                <Typography sx={{ fontFamily: 'Vazir', fontSize: '0.8rem' }}>ویرایش</Typography>
                                            </Link>
                                        </Tooltip>

                                        <Tooltip title="نمایش" sx={{ fontFamily: 'Vazir' }}>
                                            <Link to={'/products/view/' + product._id} className="flex items-center gap-1 btn-default">
                                                <RemoveRedEyeOutlinedIcon sx={{ width: '1.7rem' }} />
                                                <Typography sx={{ fontFamily: 'Vazir', fontSize: '0.8rem' }}>نمایش</Typography>
                                            </Link>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ProductPage