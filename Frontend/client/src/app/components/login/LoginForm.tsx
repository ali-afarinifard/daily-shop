'use client'

import { useContext, useEffect, useState } from 'react';
import Heading from '../Heading';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { login } from '@/libs/apiUrls';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { IoChevronBackOutline } from 'react-icons/io5';
import { FaRegEyeSlash } from "react-icons/fa";
import { FiEye } from "react-icons/fi";


export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });


    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { login: authLogin, isAuthenticated } = authContext;

    const router = useRouter();


    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        };
    }, [isAuthenticated, router]);


    const validateForm = () => {
        let valid = true;
        const newErrors: any = {
            email: '',
            password: ''
        };

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'ایمیل معتبر نیست';
            valid = false;
        };

        if (password && password.length < 4) {
            newErrors.password = 'حداقل 4 حرف یا عدد وارد شود';
            valid = false;
        };


        setErrors(newErrors);
        return valid;

    }


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('خطایی رخ داده');
            return;
        };


        try {

            const response = await login(email, password);

            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            authLogin(response.data.accessToken, response.data.refreshToken);
            toast.success('وارد شدید');
            router.push('/');
            window.location.reload();

        } catch (error: any) {
            console.log('ERROR on fetching data of user in Login Form', error);
            setPassword('');
            toast.error('ایمیل یا نام کاربری را صحیح وارد نمایید');
        }
    };

    return (
        <div className='w-full'>
            <Heading title='ورود به دیجی شاپ' center />

            <form onSubmit={handleLogin} className='mt-10 flex flex-col gap-3'>

                {/* Email */}
                <div className='w-full relative flex flex-col gap-1'>
                    <div>
                        <input
                            id='email'
                            type="email"
                            autoComplete='off'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed`}
                        />
                        <label
                            htmlFor="email"
                            className={`absolute text-[0.88rem] duration-150 transform -translate-y-3 top-5 z-10 origin-[0] right-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
                        >
                            ایمیل
                        </label>
                    </div>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>


                {/* Password */}
                <div className='w-full relative flex flex-col gap-1'>
                    <div>
                        <input
                            id='password'
                            type={showPassword ? "text" : "password"}
                            autoComplete='off'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed`}
                        />
                        <label
                            htmlFor="password"
                            className={`absolute text-[0.88rem] duration-150 transform -translate-y-3 top-5 z-10 origin-[0] right-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
                        >
                            رمز عبور
                        </label>
                        <div
                            className='absolute left-3 top-6 cursor-pointer' // Position the eye icon
                            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                        >
                            {showPassword ? <FaRegEyeSlash size={20} className='text-slate-400' /> : <FiEye size={20} className='text-slate-400' />} {/* Display eye or eye-slash icon */}
                        </div>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>


                <button
                    type="submit"
                    className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2 bg-slate-700 text-white text-md p-4`}
                >
                    ورود
                </button>

                <div className='flex items-center justify-between gap-1 m:flex-col m:justify-center m:gap-2'>
                    <div className='text-sm text-center mt-2'>
                        حساب کاربری ندارید؟ <Link href={'/register'} className='text-rose-500'>ثبت نام کنید</Link>
                    </div>

                    <div className='text-sm text-center mt-2'>
                        <Link href={'/reset-account'}>رمز عبور خود را فراموش کردید؟</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
