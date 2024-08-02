import axios from "axios";
import { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllCategories, updateProduct } from "../../services/apiUrls";




// const sizesOptions = [38, 39, 40, 41, 42, 43, 44, 45, 46];
const sizesOptionsWomen = ['1', '2', '3'];
const sizesOptionsMen = ['S', 'M', 'L', 'XL', '2XL'];


const ProductForm = ({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: assignedCategory,
    stock: assignedStock,
    isStatus: assignedStatus,
    categories: initialCategories,
    colors: existingColors,
    sizes: existingSizes,
    gender: existingGender
}) => {

    // States
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [category, setCategory] = useState(assignedCategory || '');
    const [stock, setStock] = useState(assignedStock || 0);
    const [isStatus, setIsStatus] = useState(assignedStatus || false);
    const [price, setPrice] = useState(existingPrice || 0);
    const [images, setImages] = useState(existingImages || []);
    const [categories, setCategories] = useState(initialCategories || []);
    const [sizes, setSizes] = useState(existingSizes || []);
    const [gender, setGender] = useState(existingGender || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const [colors, setColors] = useState(existingColors?.join('-') || '');

    // router
    const navigate = useNavigate();

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
        setTitle(existingTitle || '');
        setDescription(existingDescription || '');
        setCategory(assignedCategory || '');
        setStock(assignedStock || 0);
        setIsStatus(assignedStatus || false);
        setPrice(existingPrice || 0);
        setImages(existingImages || []);
        setSizes(existingSizes || []);
        setGender(existingGender || '');
        setColors(existingColors?.join('-') || '');
    }, [existingTitle, existingDescription, existingPrice, existingImages, existingSizes, existingGender, existingColors, assignedCategory, assignedStock, assignedStatus]);


    const createProductMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            setGoToProducts(true);
        },
        onError: () => {
            console.error('Error creating product:', error.response || error);
        }
    });


    const updateProductMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            setGoToProducts(true);
        },
        onError: () => {
            console.error('Error updating product:', error.response || error);
        }
    })



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


    const uploadImages = async (ev) => {
        const files = ev.target.files;
        const formData = new FormData();

        for (const file of files) {
            formData.append('images', file);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setImages([...images, ...response.data.images]);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };


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

                <div className="flex flex-col gap-1 w-full">
                    <label>نام محصول</label>
                    <input
                        type="text"
                        placeholder="نام محصول"
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)}
                    />
                </div>


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


                <div className="flex flex-col gap-1 pt-1 w-full">
                    <label>رنگ‌ها (هر رنگ را با یک خط تیره - جدا کنید)</label>
                    <input
                        type="text"
                        placeholder="مثال: قرمز-آبی-سبز"
                        value={colors}
                        onChange={(ev) => setColors(ev.target.value)}
                    />
                </div>

            </div>



            {/* Image */}
            <div className="flex flex-col gap-1">
                <label>عکس محصول</label>
                <div className="mb-2 flex flex-wrap gap-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {images.length > 0 && images.map((img, index) => (
                            <div className="h-fit w-fit bg-white p-4 shadow-sm rounded-sm border border-gray-200" key={index}>
                                <img src={`http://localhost:5000/${img}`} alt="" className="h-24 w-full" />
                            </div>
                        ))}
                    </div>

                    <label className="w-[8rem] h-[8rem] flex flex-col items-center justify-center gap-2 cursor-pointer text-gray-600 rounded-lg bg-white shadow-sm border border-gray-200">
                        <IoCloudUploadOutline size={33} />
                        <div className="text-[1rem] font-[500]">Upload</div>
                        <input type="file" name="images" id="images" className="hidden" onChange={uploadImages} multiple />
                    </label>
                </div>
            </div>


            {/* Description */}
            <div className="flex flex-col gap-1 mb-3">
                <label>توضیحات</label>
                <textarea
                    placeholder="توضیحات"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                ></textarea>
            </div>


            {/* Stock */}  {/* Price */}
            <div className="flex items-center justify-center gap-4">

                <div className="flex flex-col gap-1 w-full">
                    <label>تعداد</label>
                    <input
                        type="number"
                        placeholder="تعداد"
                        value={stock}
                        onChange={ev => setStock(ev.target.value)}
                    />
                </div>


                <div className="flex flex-col gap-1 w-full">
                    <label>قیمت (تومان)</label>
                    <input
                        type="number"
                        placeholder="قیمت"
                        value={price}
                        onChange={ev => setPrice(ev.target.value)}
                    />
                </div>

            </div>



            <div className="my-3 flex items-center gap-2">
                <label>
                    محصول موجود می باشد
                </label>
                <input
                    type="checkbox"
                    checked={isStatus}
                    onChange={(ev) => setIsStatus(ev.target.checked)}
                    className="relative top-[0.25rem] w-4 h-4 rounded-full cursor-pointer"
                />
            </div>

            <button className="btn-primary mt-3" type="submit">{_id ? 'ویرایش' : 'ایجاد'}</button>
        </form >
    )
}

export default ProductForm