import axios from "axios";
import { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllCategories, updateProduct } from "../../services/api";


const ProductForm = ({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: assignedCategory,
    properties: assignedProperties,
    stock: assignedStock,
    isStatus: assignedStatus,
    categories: initialCategories
}) => {

    // States
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [category, setCategory] = useState(assignedCategory);
    const [productProperties, setProductProperties] = useState(assignedProperties || {});
    const [stock, setStock] = useState(assignedStock || 0);
    const [isStatus, setIsStatus] = useState(assignedStatus || false);
    const [price, setPrice] = useState(existingPrice || 0);
    const [images, setImages] = useState(existingImages || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const [categories, setCategories] = useState(initialCategories || []);

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
        if (categories.length > 0 && category) {
            const selectedCategory = categories.find(({ _id }) => _id === category);
            if (selectedCategory) {
                const defaultProperties = {};
                selectedCategory.properties.forEach(property => {
                    if (!productProperties[property.name]) {
                        defaultProperties[property.name] = property.values[0];
                    }
                });

                setProductProperties(prev => ({ ...prev, ...defaultProperties }));
            }
        }
    }, [categories, category]);


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
            properties: productProperties
        };

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


    function setProductProp(propName, value) {
        setProductProperties(prev => {
            const newProductProps = { ...prev };
            newProductProps[propName] = value;
            return newProductProps;
        });
    };


    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category);
        if (catInfo) {
            propertiesToFill.push(...catInfo.properties);

            while (catInfo?.parent?._id) {
                const parentCat = categories.find(({ _id }) => _id === catInfo.parent._id);
                if (parentCat) {
                    propertiesToFill.push(...parentCat.properties);
                    catInfo = parentCat;
                } else {
                    break;
                }
            }
        }
    }


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

            {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                <div key={p.name}>
                    <label>{p.name}</label>
                    <div>
                        <select
                            value={productProperties[p.name] || ''}
                            onChange={ev => setProductProp(p.name, ev.target.value)}
                        >
                            {p.values.map(v => (
                                <option key={v} value={v}>{v}</option>
                            ))}
                        </select>
                    </div>
                </div>
            ))}


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

            <button className="btn-primary mt-3" type="submit">ایجاد</button>
        </form >
    )
}

export default ProductForm