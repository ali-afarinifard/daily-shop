import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';


const CategoryPage = ({ swal }) => {

    // ** States
    const [name, setName] = useState('');
    const [parent, setParent] = useState('');
    const [categories, setCategories] = useState([]);
    const [editedCategory, setEditedCategory] = useState(null);
    const [properties, setProperties] = useState([]);


    useEffect(() => {
        fetchCategories();
    }, []);


    // ** Fetch Categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('There was an error fetching the categories!', error);
        }
    };


    // ** handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            parent,
            properties: properties.map(p => ({
                name: p.name,
                values: p.values.split('-')
            }))
        };

        if (editedCategory) {
            try {
                const response = await axios.put(`http://localhost:5000/api/categories/${editedCategory._id}`, data);
                setCategories(categories.map(cat => cat._id === editedCategory._id ? response.data : cat));
                setEditedCategory(null);
            } catch (error) {
                console.error('There was an error editing the category!', error);
            }
        } else {
            try {
                const response = await axios.post('http://localhost:5000/api/categories', data);
                setCategories([...categories, response.data]);
                console.log({ response })
                console.log({ data })
            } catch (error) {
                console.error('There was an error creating the category!', error);
            }
        }

        setName('');
        setParent('');
        setProperties([]);
    };


    // ** editCategory
    const editCategory = (category) => {
        setEditedCategory(category);
        setName(category.name);
        setParent(category.parent ? category.parent._id : '');
        setProperties(
            category.properties.map(({ name, values }) => ({
                name,
                values: values.join('-')
            }))
        );
    }

    // ** deleteCategory
    const deleteCategory = (category) => {
        swal.fire({
            title: 'مطمئن هستید؟',
            text: `دسته بندی ${category.name} پاک شود؟`,
            showCancelButton: true,
            cancelButtonText: 'انصراف',
            confirmButtonText: 'حذف',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if (result.isConfirmed) {
                const { _id } = category;
                try {
                    await axios.delete(`http://localhost:5000/api/categories/${_id}`);
                    fetchCategories(); // Update the categories list
                } catch (error) {
                    console.error('There was an error deleting the category!', error);
                }
            }
        })
    }


    // ** deleteCategory
    const addProperty = () => {
        setProperties(prev => [...prev, { name: '', values: '' }]);
    }


    // ** handlePropertyNameChange
    const handlePropertyNameChange = (index, property, newName) => {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        });
    };


    // ** handlePropertyValuesChange
    const handlePropertyValuesChange = (index, property, newValues) => {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        });
    };


    // ** removeProperty
    const removeProperty = (indexToRemove) => {
        setProperties(prev => [...prev].filter((p, pIndex) => pIndex !== indexToRemove));
    };

    return (
        <div>
            <h1 className="font-[400] text-[1.4rem]">دسته بندی ها</h1>
            <label>
                {editedCategory
                    ? `ویرایش دسته بندی ${editedCategory.name}`
                    : 'ایجاد دسته بندی جدید'}
            </label>

            <form onSubmit={handleSubmit}>
                <div className="flex gap-5">
                    <div className="flex-grow">
                        <label htmlFor="name">نام دسته :</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="parent">نام گروه ( اختیاری ) :</label>
                        <select
                            id="parent"
                            value={parent}
                            onChange={(e) => setParent(e.target.value)}
                        >
                            <option value="">هیچ دسته بندی انتخاب نشده</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Properties */}
                <div>
                    <button
                        type="button"
                        className="btn-default text-sm mb-2 mt-1"
                        onClick={addProperty}
                    >
                        ایجاد ویژگی
                    </button>

                    {properties.length > 0 && properties.map((property, index) => (
                        <div className="flex gap-1 mb-2" key={index}>
                            <input
                                type="text"
                                dir="rtl"
                                placeholder="رنگ، برند و..."
                                className="mb-0"
                                value={property.name}
                                onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}
                            />

                            <input
                                type="text"
                                dir="rtl"
                                placeholder="مقدار"
                                className="mb-0"
                                value={property.values}
                                onChange={ev => handlePropertyValuesChange(index, property, ev.target.value)}
                            />

                            <button
                                type="button"
                                className="btn-red"
                                onClick={() => removeProperty(index)}
                            >
                                حذف
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex gap-1 mb-4">
                    {editedCategory && (
                        <button
                            type="button"
                            className="btn-default"
                            onClick={() => {
                                setEditedCategory(null);
                                setName('');
                                setParent('');
                                setProperties([])
                            }}
                        >
                            انصراف
                        </button>
                    )}

                    <button type="submit" className="btn-primary">ایجاد</button>
                </div>
            </form>

            {!editedCategory && (
                <table className="basic mt-4 text-center">
                    <thead>
                        <tr>
                            <td>نام</td>
                            <td>گروه</td>
                            <td>عملیات</td>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.length > 0 && categories.map((category) => {
                            const parentCategory = categories.find(cat => cat._id === category.parent);
                            return (
                                <tr key={category._id} className="w-full border-b-[1px] border-slate-200">
                                    <td>{category.name}</td>
                                    <td>{parentCategory ? parentCategory.name : 'None'}</td>
                                    <td className="flex justify-center gap-4">
                                        <button
                                            className="btn-default mr-1 flex items-center gap-1"
                                            onClick={() => editCategory(category)}
                                        >
                                            ویرایش
                                        </button>

                                        <button
                                            className="btn-default flex items-center gap-1"
                                            onClick={() => deleteCategory(category)}
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default withSwal(({ swal }, ref) => (
    <CategoryPage swal={swal} />
));
