'use client'


import { User } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../Spinner";
import { validateEmail } from "@/utils/emailVal";
import { useUpdateUserMutation } from "@/store/apiSlice";


interface SummaryProps {
    user: User | null;
    updateUserInContext: (updatedUser: User | null) => void;
}


const Summary: React.FC<SummaryProps> = ({ user, updateUserInContext }) => {

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        userId: '',
        username: '',
        fullName: '',
        email: '',
        password: '',
        city: '',
        phoneNumber: '+98',
        postalCode: '',
        address: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        fullName: '',
        email: '',
        password: '',
        city: '',
        phoneNumber: '',
        postalCode: ''
    });


    const [updateUser] = useUpdateUserMutation();


    useEffect(() => {

        if (user) {
            setFormData({
                userId: user._id || '',
                username: user.username || '',
                fullName: user.fullName || '',
                email: user.email || '',
                password: '' || '',
                city: user.city || '',
                phoneNumber: user.phoneNumber ? `+98${String(user.phoneNumber).slice(2)}` : '+98',
                postalCode: user.postalCode || '',
                address: user.address || '',
            });
        }

    }, [user]);



    const validateForm = () => {
        let valid = true;
        const newErrors: any = {
            username: '',
            fullName: '',
            email: '',
            password: '',
            city: '',
            phoneNumber: '',
            postalCode: ''
        };

        if (formData.username.length < 5) {
            newErrors.username = 'حداقل 5 حرف وارد شود';
            valid = false;
        };

        if (formData.fullName.length < 3) {
            newErrors.fullName = 'حداقل 3 حرف وارد شود';
            valid = false;
        };

        const emailError = validateEmail(formData.email);
        if (emailError) {
            newErrors.email = emailError;
            valid = false;
        };

        if (formData.password && formData.password.length < 4) {
            newErrors.password = 'حداقل 4 حرف یا عدد وارد شود';
            valid = false;
        };

        if (formData.city.length < 2) {
            newErrors.city = 'حداقل 2 حرف وارد شود';
            valid = false;
        };

        if (!/^\+98\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'شماره همراه باید 10 رقمی باشد';
            valid = false;
        };

        if (!/^\d{9}$/.test(formData.postalCode)) {
            newErrors.postalCode = 'کد پستی باید 9 رقمی باشد';
            valid = false;
        };

        setErrors(newErrors);
        return valid;
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "phoneNumber") {
            // If the value starts with +98, allow it; otherwise, ignore the input
            if (!value.startsWith('+98')) {
                return;
            }

            // Remove the +98 prefix before validation
            const phoneNumberWithoutPrefix = value.slice(3);

            // Allow only numbers after +98
            if (!/^\d*$/.test(phoneNumberWithoutPrefix)) {
                return;
            }

            // Update the formData with the valid phone number
            setFormData({ ...formData, phoneNumber: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        try {
            const data = await updateUser(formData).unwrap();
            updateUserInContext(data.user);
            toast.success('پروفایل به روزرسانی شد');
        } catch (error: any) {
            console.log('Error updating user information.', error);

            if (error.response) {
                const status = error.response.status;
                const errorMessage = error.response.data.message || '';

                if (status === 400 || status === 409) {
                    if (errorMessage.includes('Username already taken')) {
                        toast.error('نام کاربری قبلاً استفاده شده است.');
                    } else if (errorMessage.includes('Email already registered')) {
                        toast.error('ایمیل قبلاً ثبت شده است.');
                    } else {
                        toast.error('خطای درخواست: ' + errorMessage);
                    }
                } else {
                    toast.error('ایمیل یا نام کاربر از قبل استفاده شده است');
                }
            } else {
                toast.error('خطای شبکه: لطفاً اتصال اینترنت خود را بررسی کنید.');
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="w-full h-full">

            <form onSubmit={handleSubmit} className="w-full h-full">
                <div className="flex flex-col justify-between h-full">

                    {/* Inputs */}
                    <div className="flex flex-col gap-4 w-full">

                        <div className="flex items-center justify-between gap-8 w-fll 2xl:flex-col 2xl:justify-center 2xl:gap-4">

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="fullName" className="text-slate-500">نام و نام خانوادگی</label>
                                <input
                                    id="fullName"
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="border-[1px] border-slate-300 py-2 px-2 outline-slate-500 rounded-md w-full"
                                />
                                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="username" className="text-slate-500">نام کاربری</label>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="border-[1px] border-slate-300 py-2 px-2 outline-slate-500 rounded-md w-full"
                                />
                                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                            </div>

                        </div>


                        <div className="flex items-center justify-between gap-8 2xl:flex-col 2xl:justify-center 2xl:gap-4">

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="email" className="text-slate-500">ایمیل</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border-[1px] border-slate-300 py-2 px-2 outline-slate-500 rounded-md w-full"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="password" className="text-slate-500">رمز عبور</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="border-[1px] border-slate-300 py-2 px-2 outline-slate-500 rounded-md w-full"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between gap-8 2xl:flex-col 2xl:justify-center 2xl:gap-4">

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="city" className="text-slate-500">شهر</label>
                                <input
                                    id="city"
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="border-[1px] border-slate-300 py-2 px-2 outline-slate-500 rounded-md w-full"
                                />
                                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="postalCode" className="text-slate-500">کد پستی</label>
                                <input
                                    id="postalCode"
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    className="border-[1px] border-slate-300 py-2 px-2 outline-slate-500 rounded-md w-full"
                                />
                                {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="phoneNumber" className="text-slate-500">شماره همراه</label>
                                <input
                                    id="phoneNumber"
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="+98"
                                    dir="ltr"
                                    className="border-[1px] border-slate-300 py-2 px-2 outline-slate-500 rounded-md w-full"
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                            </div>

                        </div>

                        <div className="max-w-[21.3rem]">
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="city" className="text-slate-500">آدرس</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="resize-none text-sm border-[1px] py-2 px-2 border-slate-300 outline-slate-500 rounded-md p-3 w-full"
                                />
                            </div>
                        </div>

                    </div>


                    {/* Submit BTN */}
                    <div className="mt-8 flex items-end justify-end">
                        {isLoading ? (
                            <Spinner size={30} />
                        ) : (
                            <button
                                type="submit"
                                className="disabled:opacity-70 bg-slate-700 text-white py-2 px-4 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition border-slate-700 flex items-center justify-center gap-2"
                                disabled={isLoading}
                            >
                                ویرایش
                            </button>
                        )}

                    </div>

                </div>
            </form>

        </div>
    )
}

export default Summary