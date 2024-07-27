import { useQuery } from "@tanstack/react-query"
import { getAllCategories } from "../../../services/api"
import Loader from "../../modules/Loader";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";


const CategoryDashboard = () => {

    const { data, isError, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    });

    if (isLoading) return <Loader />;

    if (isError) return <div>Error...</div>;

    return (
        // <div>
        //     <table className="basic text-center min-h-[13rem] border-[1px] border-black">

        //         <thead>
        //             <tr>
        //                 <td>نام</td>
        //                 <td>گروه</td>
        //             </tr>
        //         </thead>

        //         <tbody>

        //             {data.map((category) => {
        //                 const parentCategory = data.find(cat => cat._id === category.parent);
        //                 return (
        //                     <tr key={category._id}>
        //                         <td>{category.name}</td>
        //                         <td>{parentCategory ? parentCategory.name : '_'}</td>
        //                     </tr>
        //                 )
        //             })}
        //         </tbody>

        //     </table>
        // </div>

        <TableContainer component={Paper}>
            <Typography sx={{ fontFamily: 'Vazir', fontWeight: 'bold', padding: '10px' }}>دسته بندی ها</Typography>
            <Table sx={{ width: '100%' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontFamily: 'Vazir', fontWeight: 'bolder' }}>نام</TableCell>
                        <TableCell sx={{ fontFamily: 'Vazir', fontWeight: 'bolder' }}>گروه</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((category) => {
                        const parentCategory = data.find(cat => cat._id === category.parent);
                        return (
                            <TableRow key={category._id}>
                                <TableCell sx={{ fontFamily: 'Vazir' }}>
                                    {category.name}
                                </TableCell>
                                <TableCell sx={{ fontFamily: 'Vazir' }}>
                                    {parentCategory ? parentCategory.name : '_'}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CategoryDashboard