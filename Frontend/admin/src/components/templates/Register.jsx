import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/apiUrls';
import { useMutation } from '@tanstack/react-query';
import avatar from "../../assets/images/admin-pic.webp"
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { FaRegEyeSlash } from "react-icons/fa";
import { FiEye } from "react-icons/fi";


const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { register: authRegister, isAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();


    const validateForm = () => {
        let valid = true;
        const newErrors = {
            username: '',
            email: '',
            password: ''
        };

        if (username.length < 4) {
            newErrors.username = 'حداقل 5 حرف وارد شود';
            valid = false;
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
        mutationFn: ({ username, email, password }) => register(username, email, password),
        onSuccess: (response) => {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            authRegister(response.data.accessToken, response.data.refreshToken);
            toast.success('وارد شدید');
            navigate('/');
        },
        onError: (err) => {
            console.log('Registration failed. Please try again.', err);
            toast.error('خطایی رخ داده');
        },
    });


    const handleRegister = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        };

        mutation.mutate({ username, email, password });
    };


    return (
        <div className='w-full h-full flex items-center justify-center'>
            <form onSubmit={handleRegister} className='w-[50rem] max-w-[50rem]'>

                <div className='border-[1px] border-slate-200 rounded-lg shadow-md p-7'>

                    <div className='flex flex-col gap-1 items-center'>
                        <h1 className='font-bold text-4xl'>عضویت</h1>

                        <span className='text-slate-500'>
                            پنل کاربری ادمین
                        </span>
                    </div>

                    <div className='max-w-96 h-full mx-auto'>
                        <img src={avatar} alt='admin' className='w-full h-full' />
                    </div>

                    <div className='flex flex-col gap-2 max-w-[30rem] mx-auto'>

                        <div className='flex flex-col gap-1'>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="username" className='pr-1 text-[1.1rem]'>نام کاربری</label>
                                <input
                                    id='username'
                                    type="text"
                                    value={username}
                                    onChange={ev => setUsername(ev.target.value)}
                                    autoComplete='off'
                                    className='py-2 text-slate-600'
                                />
                            </div>

                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

                        </div>

                        <div className='flex flex-col gap-1'>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="email" className='pr-1 text-[1.1rem]'>ایمیل</label>
                                <input
                                    id='email'
                                    type="email"
                                    value={email}
                                    onChange={ev => setEmail(ev.target.value)}
                                    autoComplete='off'
                                    className='py-2 text-slate-600'
                                />
                            </div>

                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                        </div>


                        <div className='flex flex-col gap-1'>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="password" className='pr-1 text-[1.1rem]'>رمز عبور</label>
                                <div className='relative'>
                                    <input
                                        id='password'
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={ev => setPassword(ev.target.value)}
                                        autoComplete='off'
                                        className='py-2'
                                    />
                                    <div
                                        className='absolute left-3 top-3 cursor-pointer' // Position the eye icon
                                        onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                                    >
                                        {showPassword ? <FaRegEyeSlash size={18} className='text-slate-400' /> : <FiEye size={18} className='text-slate-400' />} {/* Display eye or eye-slash icon */}
                                    </div>
                                </div>
                            </div>

                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                        </div>

                        <div className='w-full flex items-center justify-center'>
                            <button className='bg-blue-500 hover:bg-blue-400 transition-all duration-300 text-white w-[17rem] p-2 rounded-xl text-xl'>
                                ثبت نام
                            </button>
                        </div>

                        <div className='text-sm text-center mt-4'>
                            حساب کاربری دارید؟ <Link to={'/login'} className='text-rose-500'>وارد شوید</Link>
                        </div>

                    </div>

                </div>

            </form>
        </div>
    );
};

export default Register;
