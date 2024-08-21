import axios from "axios";
import { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllCategories, updateProduct } from "../../services/apiUrls";
import { uploadFile } from "../../firebase";
import Loader from "../modules/Loader";
import { FiTrash } from "react-icons/fi";
import InputTitle from "./products/InputTitle";
import InputColor from "./products/InputColor";
import InputTextArea from "./products/InputTextArea";
import InputCheckbox from "./products/InputCheckbox";
import toast from "react-hot-toast";





// const sizesOptions = [38, 39, 40, 41, 42, 43, 44, 45, 46];
const sizesOptionsWomen = ['1', '2', '3', 'فری'];
const sizesOptionsMen = ['S', 'M', 'L', 'XL', '2XL'];


const ProductForm = ({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages = [],
    category: assignedCategory,
    stock: assignedStock,
    isStatus: assignedStatus,
    categories: initialCategories,
    colors: existingColors,
    sizes: existingSizes,
    gender: existingGender
}) => {

    // States
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [isStatus, setIsStatus] = useState(false);
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [uploadedUrls, setUploadedUrls] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [gender, setGender] = useState('');
    const [colors, setColors] = useState('');
    const [loading, setIsLoading] = useState(false);
    const [goToProducts, setGoToProducts] = useState(false);

    // router
    const navigate = useNavigate();

    // React Query for categories
    const { data, error, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories,
        initialData: initialCategories,
        enabled: !initialCategories
    });


    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);



    useEffect(() => {
        if (_id) {
            setTitle(existingTitle || '');
            setDescription(existingDescription || '');
            setCategory(assignedCategory || '');
            setStock(assignedStock || '');
            setIsStatus(assignedStatus || false);
            setPrice(existingPrice || '');
            setImages(existingImages || []);
            setSizes(existingSizes || []);
            setGender(existingGender || '');
            setColors(existingColors?.join('-') || '');
        }
    }, [
        _id,
        existingTitle,
        existingDescription,
        assignedCategory,
        assignedStock,
        assignedStatus,
        existingPrice,
        existingImages,
        existingSizes,
        existingGender,
        existingColors
    ]);





    const createProductMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            setGoToProducts(true);
            toast.success('محصول جدید اضافه شد');
        },
        onError: (error) => {
            toast.error('خطایی رخ داده');
            console.error('Error creating product:', error.response || error);
        }
    });


    const updateProductMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            setGoToProducts(true);
            toast.success('به روز رسانی شد');
        },
        onError: (error) => {
            toast.error('خطایی رخ داده');
            console.error('Error updating product:', error.response || error);
        }
    });



    const handleUpload = async (event) => {
        setIsLoading(true);
        const files = event.target.files;
        const urls = [];

        for (const file of files) {
            try {
                const url = await uploadFile(file);
                urls.push(url);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }

        // Append new URLs to both images and uploadedUrls states
        setUploadedUrls([...uploadedUrls, ...urls]);
        setImages([...images, ...urls]);
        setIsLoading(false);
    };


    const handleDeleteImage = (url) => {
        setImages(images.filter(image => image !== url));
    };



    const handleSubmit = async (ev) => {
        ev.preventDefault();

        const product = {
            title,
            description,
            price,
            category,
            images,
            stock,
            isStatus,
            sizes,
            gender,
            colors: colors.split('-').filter(Boolean)
        };

        console.log("Product Data: ", product);

        if (_id) {
            updateProductMutation.mutate({ id: _id, product });
        } else {
            createProductMutation.mutate(product);
        }
    };

    useEffect(() => {
        if (goToProducts) {
            navigate('/products');
        }
    }, [goToProducts, navigate]);


    const handleSizeChange = (size) => {
        if (sizes.includes(size)) {
            setSizes(sizes.filter(s => s !== size));
        } else {
            setSizes([...sizes, size]);
        }
    };

    // Determine size options based on gender
    const sizeOptions = gender === 'men' ? sizesOptionsMen : sizesOptionsWomen;


    return (
        <form onSubmit={handleSubmit}>

            {/* Name */} {/* Categories */}
            <div className="flex items-center justify-center gap-4 mb-3">

                <InputTitle
                    label="نام محصول"
                    htmlLabel={'title'}
                    id={'title'}
                    type="text"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                />


                <div className="w-full">
                    <label>دسته بندی</label>
                    <select
                        value={category}
                        onChange={ev => setCategory(ev.target.value)}
                    >
                        <option value=''>انتخاب کنید</option>
                        {categories.length > 0 && categories.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                </div>

            </div>


            {/* Sizes */}   {/* Colors */}
            <div className="flex justify-center gap-4 mb-3 xs:flex-col">

                <div className="w-full">
                    <label>جنسیت</label>
                    <select
                        value={gender}
                        onChange={ev => setGender(ev.target.value)}
                    >
                        <option value=''>انتخاب کنید</option>
                        <option value='men'>مردانه</option>
                        <option value='women'>زنانه</option>
                    </select>

                    {gender && (
                        <div className="flex flex-col gap-2 pt-3">
                            <label>سایز محصول را انتخاب کنید</label>
                            <div className="mb-2 flex flex-wrap gap-3">
                                {sizeOptions.map(size => (
                                    <div
                                        key={size}
                                        onClick={() => handleSizeChange(size)}
                                        className={`mr-2 p-2 border rounded cursor-pointer ${sizes.includes(size) ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>


                <InputColor
                    label="رنگ‌ها (هر رنگ را با یک خط تیره - جدا کنید)"
                    htmlLabel="color"
                    id="color"
                    type="text"
                    value={colors}
                    onChange={ev => setColors(ev.target.value)}
                    placeholder="مثال: قرمز-آبی-سبز"
                    className="placeholder:text-sm"
                />

            </div>



            {/* Image */}
            <div className="flex flex-col gap-1">
                <label>عکس محصول</label>
                <div className="mb-2 flex flex-wrap gap-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {/* Display existing and newly uploaded images */}
                        {images.map((url, index) => (
                            <div className="h-fit w-fit rounded-md overflow-hidden bg-white shadow-sm border border-gray-200" key={index}>
                                <div>
                                    <img src={url} alt="uploaded" className="h-[6.3rem] w-full" />
                                    <div
                                        className="bg-slate-100 text-xs py-1 flex items-center justify-center text-slate-900 cursor-pointer"
                                        onClick={() => handleDeleteImage(url)}
                                    >
                                        <FiTrash size={18} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <Loader size={35} />
                        )}
                    </div>

                    <label className="w-[8rem] h-[8rem] flex flex-col items-center justify-center gap-2 cursor-pointer text-gray-600 rounded-lg bg-white shadow-sm border border-gray-200">
                        <IoCloudUploadOutline size={33} />
                        <div className="text-[1rem] font-[500]">Upload</div>
                        <input type="file" name="images" id="images" className="hidden" onChange={handleUpload} multiple />
                    </label>
                </div>
            </div>


            {/* Description */}
            <InputTextArea
                label="توضیحات"
                htmlLabel="description"
                id="description"
                value={description}
                onChange={ev => setDescription(ev.target.value)}
            />


            {/* Stock */}  {/* Price */}
            <div className="flex items-center justify-center gap-4">

                <div className="flex flex-col gap-1 w-full">
                    <label>تعداد</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={ev => {
                            const value = Math.max(0, ev.target.value);
                            setStock(value);
                        }}
                    />
                </div>


                <div className="flex flex-col gap-1 w-full">
                    <label>قیمت (تومان)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={ev => {
                            const value = Math.max(0, ev.target.value);
                            setPrice(value);
                        }}
                    />
                </div>

            </div>

            <InputCheckbox
                label="محصول موجود می باشد"
                htmlLabel="status"
                id="status"
                type="checkbox"
                checked={isStatus}
                onChange={ev => setIsStatus(ev.target.checked)}
                className="relative top-[0.25rem] w-4 h-4 rounded-full cursor-pointer"
            />

            <button className="btn-primary mt-3" type="submit">{_id ? 'ویرایش' : 'ایجاد'}</button>
        </form >
    )
}

export default ProductForm