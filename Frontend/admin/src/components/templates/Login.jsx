import React, { useContext, useEffect, useState } from 'react';
import { login } from '../../services/apiUrls';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import avatar from "../../assets/images/admin-pic.webp";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const { login: authLogin, isAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();


    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);


    const validateForm = () => {
        let valid = true;
        const newErrors = {
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


    const mutation = useMutation({
        mutationFn: ({ email, password }) => login(email, password),
        onSuccess: (response) => {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            authLogin(response.data.accessToken, response.data.refreshToken);
            navigate('/');
            toast.success('وارد شدید');
        },
        onError: (err) => {
            console.log('Login failed!', err);
            toast.error('خطایی رخ داده');
        }
    });

    const handleLogin = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        };

        mutation.mutate({ email, password });
    };


    return (
        <div className='w-full h-full flex items-center justify-center'>
            <form onSubmit={handleLogin} className='w-[50rem] max-w-[50rem]'>

                <div className='border-[1px] border-slate-200 rounded-lg shadow-md p-7'>

                    <div className='flex flex-col gap-1 items-center'>
                        <h1 className='font-bold text-4xl'>ورود</h1>

                        <span className='text-slate-500'>
                            پنل کاربری ادمین
                        </span>
                    </div>

                    <div className='max-w-96 h-full mx-auto'>
                        <img src={avatar} alt='admin' className='w-full h-full' />
                    </div>

                    <div className='flex flex-col gap-4 max-w-[30rem] mx-auto'>

                        <div className='flex flex-col gap-1'>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="email" className='pr-1 text-[1.1rem]'>ایمیل</label>
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
                                <label htmlFor="password" className='pr-1 text-[1.1rem]'>رمز عبور</label>
                                <input
                                    id='password'
                                    type="password"
                                    value={password}
                                    onChange={ev => setPassword(ev.target.value)}
                                    className='py-3 text-slate-600'
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                        </div>

                        <div className='w-full flex items-center justify-center'>
                            <button className='bg-blue-500 hover:bg-blue-400 transition-all duration-300 text-white w-[17rem] p-2 rounded-xl text-xl'>
                                ورود
                            </button>
                        </div>

                    </div>

                    <div className='flex items-center justify-between gap-1 mt-5'>
                        <div className='text-sm text-center mt-2'>
                            حساب کاربری ندارید؟ <Link to={'/register'} className='text-rose-500'>ثبت نام کنید</Link>
                        </div>

                        <div className='text-sm text-center mt-2'>
                            <Link to={'/reset-account'}>رمز عبور خود را فراموش کردید؟</Link>
                        </div>
                    </div>

                </div>

            </form>
        </div>
    );
};

export default Login;
