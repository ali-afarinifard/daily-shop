import { useQuery } from "@tanstack/react-query"
import { getProduct } from "../../../services/apiUrls"
import { Link, useParams } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { useState } from "react";
import Modal from '@mui/joy/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { IoCloseSharp } from "react-icons/io5";
import Loader from "../../../components/modules/Loader";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '18rem',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
    outline: 0,
};


const ProductView = () => {

    const { id } = useParams();

    const [open, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const { data: product, error, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: getProduct,
        enabled: !!id
    });

    const handleOpen = (img) => {
        setSelectedImage(`http://localhost:5000/${img}`);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setSelectedImage('');
    };


    if (isLoading) return <Loader />

    // if (error) return <div>error...</div>


    return (
        <div>
            {product && (
                <div className="flex flex-col">
                    <div className="flex justify-between items-center px-8 pb-3">

                        <h1 className="font-[400] text-[1.4rem]">مشخصات محصول</h1>

                        <Link to={'/products'}>
                            <div
                                className="w-10 h-10 border-[1px] border-slate-200 flex items-center justify-center rounded-full bg-slate-100 shadow-xl"
                            >
                                <FiChevronLeft size={27} className="relative right-[0.1rem]" />
                            </div>
                        </Link>

                    </div>

                    <hr />

                    <div
                        className="pt-8"
                    >

                        <div className="grid grid-cols-3">

                            <div
                                className="flex items-center gap-1 justify-center"
                            >
                                <span>نام محصول : </span>
                                <span className="text-lg">{product.title}</span>
                            </div>

                            <div
                                className="flex items-center gap-1 justify-center"
                            >
                                <span className="text-sm">دسته بندی : </span>
                                <span className="text-lg">{product.category.name}</span>
                            </div>


                        </div>


                        <div className="grid grid-cols-3 py-20">

                            <div
                                className="flex items-center gap-1 justify-center"
                            >
                                <span>قیمت محصول : </span>
                                <div className="flex items-center gap-1">
                                    <span className="text-lg">{product.price}</span>
                                    <span>تومان</span>
                                </div>
                            </div>

                            <div
                                className="flex items-center gap-1 justify-center"
                            >
                                <span className="text-sm">تعداد محصول : </span>
                                <span className="text-lg">{product.stock}</span>
                            </div>

                            <div
                                className="flex items-center gap-1 justify-center"
                            >
                                <span className="text-sm">وضعیت محصول : </span>
                                <span className="text-lg">{product.isStatus ? 'موجود' : 'ناموجود'}</span>
                            </div>


                        </div>


                        <div>
                            <span className="pr-[8rem]">تصاویر محصول : </span>
                            <div className="grid grid-cols-3 pt-5 gap-4">
                                {product.images.map((img, index) => (
                                    <div key={index} className="w-full h-full flex items-center justify-center" onClick={() => handleOpen(img)}>
                                        <img key={index} src={`http://localhost:5000/${img}`} alt={`Product image ${index}`} className="w-64 h-64 object-cover rounded-xl" />
                                    </div>
                                ))}
                            </div>
                        </div>



                        <div
                            className="flex flex-col gap-1 justify-center pr-[8rem] pt-20 w-full max-w-[80rem] break-words"
                        >
                            <span>توضیحات : </span>
                            <span className="text-lg">{product.description}</span>
                        </div>



                    </div>

                    <Modal
                        aria-labelledby="modal-title"
                        aria-describedby="modal-desc"
                        open={open}
                        onClose={handleClose}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Box sx={modalStyle}>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    // color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <IoCloseSharp className="text-red-600" />
                            </IconButton>
                            <img src={selectedImage} alt="Enlarged product" style={{ width: '100%', height: 'auto' }} />
                        </Box>
                    </Modal>

                </div>
            )}
        </div>
    )
}

export default ProductView