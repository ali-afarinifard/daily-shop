import axios from "axios";
import { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllCategories, updateProduct } from "../../services/api";




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



    // ** OLD
    // useEffect(() => {
    //     if (categories.length > 0 && category) {
    //         const selectedCategory = categories.find(({ _id }) => _id === category);
    //         if (selectedCategory) {
    //             const defaultProperties = {};
    //             selectedCategory.properties.forEach(property => {
    //                 if (!productProperties[property.name]) {
    //                     defaultProperties[property.name] = property.values[0];
    //                 }
    //             });

    //             setProductProperties(prev => ({ ...prev, ...defaultProperties }));
    //         }
    //     }
    // }, [categories, category]);

    // ** NEW
    // useEffect(() => {
    //     if (categories.length > 0 && category) {
    //         const selectedCategory = categories.find(({ _id }) => _id === category);
    //         if (selectedCategory) {
    //             const defaultProperties = {};
    //             selectedCategory.properties.forEach(property => {
    //                 if (!productProperties[property.name]) {
    //                     defaultProperties[property.name] = property.values[0];
    //                 }
    //             });

    //             setProductProperties(prev => ({ ...prev, ...defaultProperties }));
    //         }
    //     }
    // }, [categories, category, productProperties]);


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


    // function setProductProp(propName, value) {
    //     setProductProperties(prev => {
    //         const newProductProps = { ...prev };
    //         newProductProps[propName] = value;
    //         return newProductProps;
    //     });
    // };


    // const propertiesToFill = [];
    // if (categories.length > 0 && category) {
    //     let catInfo = categories.find(({ _id }) => _id === category);
    //     if (catInfo) {
    //         propertiesToFill.push(...catInfo.properties);

    //         while (catInfo?.parent?._id) {
    //             const parentCat = categories.find(({ _id }) => _id === catInfo.parent._id);
    //             if (parentCat) {
    //                 propertiesToFill.push(...parentCat.properties);
    //                 catInfo = parentCat;
    //             } else {
    //                 break;
    //             }
    //         }
    //     }
    // }


    return (
        <form onSubmit={handleSubmit}>

            <label>نام محصول</label>
            <input
                type="text"
                placeholder="نام محصول"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />

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


            {/* <label>سایزها</label>
            <div className="mb-2 flex flex-wrap gap-1">
                {sizesOptions.map(size => (
                    <label key={size} className="mr-2">
                        <input
                            type="checkbox"
                            value={size}
                            checked={sizes.includes(size)}
                            onChange={handleSizeChange}
                        />
                        {size}
                    </label>
                ))}
            </div> */}


            <label>سایزها</label>
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


            <label>رنگ‌ها (هر رنگ را با یک خط تیره - جدا کنید)</label>
            <input
                type="text"
                placeholder="مثال: قرمز-آبی-سبز"
                value={colors}
                onChange={(ev) => setColors(ev.target.value)}
            />


            <label>عکس</label>
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

            <label>توضیحات</label>
            <textarea
                placeholder="توضیحات"
                value={description}
                onChange={ev => setDescription(ev.target.value)}
            ></textarea>

            <label>تعداد</label>
            <input
                type="number"
                placeholder="تعداد"
                value={stock}
                onChange={ev => setStock(ev.target.value)}
            />

            <label>قیمت (تومان)</label>
            <input
                type="number"
                placeholder="قیمت"
                value={price}
                onChange={ev => setPrice(ev.target.value)}
            />

            <div className="my-3 flex items-center gap-2">
                <label>
                    موجود می باشد
                </label>
                <input
                    type="checkbox"
                    checked={isStatus}
                    onChange={(ev) => setIsStatus(ev.target.checked)}
                    className="relative top-[0.25rem] w-4 h-4 rounded-full"
                />
            </div>

            <button className="btn-primary mt-3" type="submit">{_id ? 'ویرایش' : 'ایجاد'}</button>
        </form >
    )
}

export default ProductForm