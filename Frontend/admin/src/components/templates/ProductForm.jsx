import axios from "axios";
import { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllCategories, updateProduct } from "../../services/apiUrls";




const sizesOptions = [38, 39, 40, 41, 42, 43, 44, 45, 46];


const ProductForm = ({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: assignedCategory,
    // properties: assignedProperties,
    stock: assignedStock,
    isStatus: assignedStatus,
    categories: initialCategories,
    sizes: existingSizes,
    colors: existingColors
}) => {

    // States
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [category, setCategory] = useState(assignedCategory || '');
    // const [productProperties, setProductProperties] = useState(assignedProperties || {});
    const [stock, setStock] = useState(assignedStock || 0);
    const [isStatus, setIsStatus] = useState(assignedStatus || false);
    const [price, setPrice] = useState(existingPrice || 0);
    const [images, setImages] = useState(existingImages || []);
    const [categories, setCategories] = useState(initialCategories || []);
    const [sizes, setSizes] = useState(existingSizes || []);
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
        // setProductProperties(assignedProperties || {});
        setStock(assignedStock || 0);
        setIsStatus(assignedStatus || false);
        setPrice(existingPrice || 0);
        setImages(existingImages || []);
        setSizes(existingSizes || []);
        setColors(existingColors?.join('-') || '');
    }, [existingTitle, existingDescription, existingPrice, existingImages, existingSizes, existingColors, assignedCategory, assignedStock, assignedStatus]);


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
            colors: colors.split('-').filter(Boolean)
            // properties: productProperties
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


    return (
        <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="flex flex-col gap-1">
                <label>نام محصول</label>
                <input
                    type="text"
                    placeholder="نام محصول"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                />
            </div>

            {/* Categories */}
            <div>
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

            {/* Sizes */}
            <div className="flex flex-col gap-2 py-2">
                <label>سایز محصول را انتخاب کنید</label>
                <div className="mb-2 flex flex-wrap gap-3">
                    {sizesOptions.map(size => (
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


            {/* Colors */}
            <div className="flex flex-col gap-1 pt-1">
                <label>رنگ‌ها (هر رنگ را با یک خط تیره - جدا کنید)</label>
                <input
                    type="text"
                    placeholder="مثال: قرمز-آبی-سبز"
                    value={colors}
                    onChange={(ev) => setColors(ev.target.value)}
                />
            </div>

            {/* Image */}
            <div className="flex flex-col gap-1">
                <label>عکس محصول</label>
                <div className="mb-2 flex flex-wrap gap-1">
                    <div className="flex items-center gap-3 mb-4">
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
            <div className="flex flex-col gap-1">
                <label>توضیحات</label>
                <textarea
                    placeholder="توضیحات"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                ></textarea>
            </div>

            {/* Stock */}
            <div className="flex flex-col gap-1">
                <label>تعداد</label>
                <input
                    type="number"
                    placeholder="تعداد"
                    value={stock}
                    onChange={ev => setStock(ev.target.value)}
                />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1">
                <label>قیمت (تومان)</label>
                <input
                    type="number"
                    placeholder="قیمت"
                    value={price}
                    onChange={ev => setPrice(ev.target.value)}
                />
            </div>

            <div className="my-3 flex items-center gap-2">
                <label>
                    موجود می باشد
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