import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../../../services/apiUrls";
import Loader from "../../modules/Loader";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination, Typography } from "@mui/material";
import { useState } from "react";


const ProductDashboard = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 3));
        setPage(0);
    };

    const { data, isError, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts
    });

    const paginatedData = (data || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (isLoading) return <Loader />;

    if (isError) return <div>Error...</div>

    return (
        <TableContainer component={Paper}>
            <Typography sx={{ fontFamily: 'Vazir', fontWeight: 'bold', padding: '10px' }}>محصولات</Typography>
            <Table sx={{ width: '100%' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontFamily: 'Vazir', fontWeight: 'bold' }}>نام</TableCell>
                        <TableCell align="right" sx={{ fontFamily: 'Vazir', fontWeight: 'bold' }}>قیمت</TableCell>
                        <TableCell align="right" sx={{ fontFamily: 'Vazir', fontWeight: 'bold' }}>دسته بندی</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedData.map((product) => (
                        <TableRow
                            key={product._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" sx={{ fontFamily: 'Vazir' }}>
                                {product.title}
                            </TableCell>
                            <TableCell align="right" sx={{ fontFamily: 'Vazir' }}>{product.price}</TableCell>
                            <TableCell align="right" sx={{ fontFamily: 'Vazir' }}>{product.category.name}</TableCell>
                            {/* <TableCell align="right" sx={{ fontFamily: 'Vazir' }}>
                                {Object.entries(product.properties).map(([key, value]) => (
                                    <p key={key}>{value}</p>
                                ))}
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <TablePagination
                rowsPerPageOptions={[3, 6]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="تعداد نمایش :"
                labelDisplayedRows={({ from, to, count }) => `صفحه ${page + 1}: ${from}-${to} از ${count}`}
                sx={{
                    "& .MuiTablePagination-toolbar": {
                        fontFamily: 'Vazir', // Apply custom font to toolbar
                    },
                    "& .MuiTablePagination-selectLabel": {
                        fontFamily: 'Vazir', // Apply custom font to select label
                        fontWeight: 'bold'  // Apply bold font weight to select label
                    },
                    "& .MuiTablePagination-displayedRows": {
                        fontFamily: 'Vazir', // Apply custom font to displayed rows text
                    }
                }}
            />
        </TableContainer>
    )
}

export default ProductDashboard