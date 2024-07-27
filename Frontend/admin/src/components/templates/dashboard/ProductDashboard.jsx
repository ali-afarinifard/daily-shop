import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../../../services/api";
import Loader from "../../modules/Loader";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";


const ProductDashboard = () => {

    const { data, isError, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts
    });

    if (isLoading) return <Loader />;

    if (isError) return <div>Error...</div>

    return (
        // <div>
        //     <table className="basic text-center min-h-[6rem] border-[1px] border-black">

        //         <thead>
        //             <tr>
        //                 <td>نام</td>
        //                 <td className="xs:hidden">قیمت</td>
        //                 <td>دسته بندی</td>
        //                 <td>رنگ</td>
        //             </tr>
        //         </thead>

        //         <tbody>
        //             {data.map((product) => (
        //                 <tr key={product._id}>
        //                     <td>
        //                         {product.title}
        //                     </td>
        //                     <td className="xs:hidden">
        //                         {product.price}
        //                     </td>
        //                     <td>
        //                         {product.category.name}
        //                     </td>
        //                     <td className="">
        //                         {Object.entries(product.properties).map(([key, value]) => (
        //                             <p key={key}>{value}</p>
        //                         ))}
        //                     </td>
        //                 </tr>
        //             ))}
        //         </tbody>

        //     </table>
        // </div>


        <TableContainer component={Paper}>
            <Typography sx={{ fontFamily: 'Vazir', fontWeight: 'bold', padding: '10px' }}>محصولات</Typography>
            <Table sx={{ width: '100%' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontFamily: 'Vazir', fontWeight: 'bold' }}>نام</TableCell>
                        <TableCell align="right" sx={{ fontFamily: 'Vazir', fontWeight: 'bold' }}>قیمت</TableCell>
                        <TableCell align="right" sx={{ fontFamily: 'Vazir', fontWeight: 'bold' }}>دسته بندی</TableCell>
                        <TableCell align="right" sx={{ fontFamily: 'Vazir', fontWeight: 'bold' }}>رنگ</TableCell>
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
                            <TableCell align="right" sx={{ fontFamily: 'Vazir' }}>{product.price}</TableCell>
                            <TableCell align="right" sx={{ fontFamily: 'Vazir' }}>{product.category.name}</TableCell>
                            <TableCell align="right" sx={{ fontFamily: 'Vazir' }}>
                                {Object.entries(product.properties).map(([key, value]) => (
                                    <p key={key}>{value}</p>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default ProductDashboard