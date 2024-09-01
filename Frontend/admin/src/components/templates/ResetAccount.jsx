import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetAccount } from "../../services/apiUrls";
import toast from "react-hot-toast";
import avatar from "../../assets/images/admin-pic.webp";
import { useMutation } from "@tanstack/react-query";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { FiEye } from "react-icons/fi";



const ResetAccount = () => {

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        newPassword: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();


    const validateForm = () => {
        let valid = true;
        const newErrors = {
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


    const mutation = useMutation({
        mutationFn: () => resetAccount(email, newPassword),
        onSuccess: () => {
            toast.success('رمز عبور با موفقیت تغییر کرد');
            navigate('/login');
        },
        onError: (error) => {
            console.error('Error resetting password:', error);
            toast.error('خطایی رخ داده');
        },
    });


    const handleAccountReset = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        };

        mutation.mutate();
    };


    return (
        <div className='w-full h-full flex items-center justify-center'>
            <form onSubmit={handleAccountReset} className='w-[50rem] max-w-[50rem]'>

                <div className='border-[1px] border-slate-200 rounded-lg shadow-md p-7 relative'>

                    <div className="absolute left-3 top-4">
                        <Link to={'/login'} className="text-blue-600">
                            <div className="w-10 h-10 border-[1px] border-slate-200 rounded-full flex items-center justify-center shadow-md bg-blue-100">
                                <IoChevronBackOutline size={23} className="relative right-[1px]" />
                            </div>
                        </Link>
                    </div>


                    <div className='flex flex-col gap-1 items-center'>
                        <h1 className='font-bold text-4xl'>بازیابی رمز عبور</h1>

                        <span className='text-slate-500'>
                            پنل کاربری ادمین
                        </span>
                    </div>

                    <div className='max-w-96 h-full mx-auto'>
                        <img src={avatar} alt='admin' className='w-full h-full' />
                    </div>

                    <div className='flex flex-col gap-3 max-w-[30rem] mx-auto'>

                        <div className='flex flex-col gap-1'>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="email" className='pr-1 text-[1rem]'>ایمیل</label>
                                <input
                                    id='email'
                                    type="email"
                                    value={email}
                                    onChange={ev => setEmail(ev.target.value)}
                                    className='py-3 text-slate-600'
                                />
                            </div>

                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                        </div>


                        <div className='flex flex-col gap-1'>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="newPassword" className='pr-1 text-[1rem]'>رمز عبور جدید</label>
                                <div className="relative">
                                    <input
                                        id='newPassword'
                                        type={showPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={ev => setNewPassword(ev.target.value)}
                                        className='py-3'
                                    />
                                    <div
                                        className='absolute left-3 top-[0.95rem] cursor-pointer' // Position the eye icon
                                        onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                                    >
                                        {showPassword ? <FaRegEyeSlash size={20} className='text-slate-400' /> : <FiEye size={20} className='text-slate-400' />} {/* Display eye or eye-slash icon */}
                                    </div>
                                </div>
                            </div>
                            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}

                        </div>


                        <div className='flex flex-col gap-1'>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="confirmPassword" className='pr-1 text-[1rem]'>تایید رمز عبور</label>
                                <div className="relative">
                                    <input
                                        id='confirmPassword'
                                        type={showPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={ev => setConfirmPassword(ev.target.value)}
                                        className='py-3'
                                    />
                                    <div
                                        className='absolute left-3 top-[0.95rem] cursor-pointer' // Position the eye icon
                                        onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                                    >
                                        {showPassword ? <FaRegEyeSlash size={20} className='text-slate-400' /> : <FiEye size={20} className='text-slate-400' />} {/* Display eye or eye-slash icon */}
                                    </div>
                                </div>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

                        </div>

                        <div className='w-full flex items-center justify-center'>
                            <button className='bg-blue-500 hover:bg-blue-400 transition-all duration-300 text-white w-[17rem] p-2 rounded-xl text-xl'>
                                تغییر رمز عبور
                            </button>
                        </div>

                    </div>

                </div>

            </form>
        </div>
    )
}

export default ResetAccount