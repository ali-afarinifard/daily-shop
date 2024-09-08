'use client'

import { resetAccount } from "@/libs/apiUrls";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { useResetAccountMutation } from "@/store/apiSlice";



const ResetAccountForm = () => {

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState({
        email: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [resetAccountPassword] = useResetAccountMutation();

    const router = useRouter();

    const validateForm = () => {
        let valid = true;
        const newErrors: any = {
            email: '',
            newPassword: '',
            confirmPassword: ''
        };

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'ایمیل معتبر نیست';
            valid = false;
        };

        if (newPassword.length < 4) {
            newErrors.newPassword = 'حداقل 4 حرف یا عدد وارد شود';
            valid = false;
        };

        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'رمز عبور و تأیید رمز عبور یکسان نیستند';
            valid = false;
        };

        setErrors(newErrors);
        return valid;
    };


    const handleAccountReset = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        };

        try {
            await resetAccountPassword({ email, newPassword }).unwrap();
            toast.success('رمز عبور با موفقیت تغییر کرد');
            router.push('/login');
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error('خطایی رخ داده است');
        }
    };


    return (
        <div className="w-full relative">
            <h1 className="text-2xl text-center">بازیابی رمز عبور</h1>

            <div className="absolute left-0 top-0">
                <Link href={'/login'} className="text-blue-600">
                    <div className="w-10 h-10 border-[1px] border-slate-200 rounded-full flex items-center justify-center shadow-md bg-slate-200">
                        <IoChevronBackOutline size={23} className="relative right-[1px]" />
                    </div>
                </Link>
            </div>

            <form onSubmit={handleAccountReset} className="mt-10 flex flex-col gap-3">

                {/* Email */}
                <div className="w-full relative flex flex-col gap-1">
                    <input
                        id="email"
                        type="email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    <label
                        htmlFor="email"
                        className="absolute text-[0.88rem] duration-150 transform -translate-y-3 top-5 z-10 origin-[0] right-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                        ایمیل
                    </label>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* New Password */}
                <div className="w-full relative flex flex-col gap-1">
                    <input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        autoComplete="off"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    <label
                        htmlFor="newPassword"
                        className="absolute text-[0.88rem] duration-150 transform -translate-y-3 top-5 z-10 origin-[0] right-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                        رمز عبور جدید
                    </label>
                    <div
                        className='absolute left-3 top-6 cursor-pointer' // Position the eye icon
                        onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                    >
                        {showPassword ? <FiEye size={20} className='text-slate-400' /> : <FaRegEyeSlash size={20} className='text-slate-400' />} {/* Display eye or eye-slash icon */}
                    </div>
                    {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
                </div>

                {/* Confirm Password */}
                <div className="w-full relative flex flex-col gap-1">
                    <input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        autoComplete="off"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    <label
                        htmlFor="confirmPassword"
                        className="absolute text-[0.88rem] duration-150 transform -translate-y-3 top-5 z-10 origin-[0] right-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                        تایید رمز عبور
                    </label>
                    <div
                        className='absolute left-3 top-6 cursor-pointer' // Position the eye icon
                        onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                    >
                        {showPassword ? <FiEye size={20} className='text-slate-400' /> : <FaRegEyeSlash size={20} className='text-slate-400' />} {/* Display eye or eye-slash icon */}
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>

                <button
                    type="submit"
                    className="disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2 bg-slate-700 text-white text-md p-4"
                >
                    تغییر رمز عبور
                </button>
            </form>
        </div>
    )
}

export default ResetAccountForm