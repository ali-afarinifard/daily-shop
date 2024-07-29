import React, { useContext, useEffect, useState } from 'react';
import { login } from '../../services/apiUrls';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import styles from "../../styles/Login.module.css";
import avatar from "../../assets/images/profile.png"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login: authLogin, isAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();


    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);
    

    const mutation = useMutation({
        mutationFn: ({ email, password }) => login(email, password),
        onSuccess: (response) => {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            authLogin(response.data.accessToken, response.data.refreshToken);
            navigate('/');
        },
        onError: (err) => {
            setError('Login failed!');
        }
    });

    const handleLogin = (e) => {
        e.preventDefault();
        mutation.mutate({ email, password });
    };


    return (
        <div className={`${styles.background_container}`}>

            {/* <Toaster position='top-center' reverseOrder={false}></Toaster> */}

            <div className='flex justify-center items-center h-screen'>
                <div className={`${styles.glass}`}>

                    <div className='flex flex-col items-center justify-center'>
                        <h4 className='text-5xl font-bold pb-6'>ورود</h4>
                        <span className='text-slate-400'>پنل کاربری ادمین</span>
                    </div>

                    <form className='py-1' onSubmit={handleLogin}>
                        <div className='profile flex justify-center py-4'>
                            <img src={avatar} className={styles.profile_img} alt="avatar" />
                        </div>

                        <div>
                            <div className='textbox relative'>
                                <input className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${styles.textBox}`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <label
                                    className={`absolute cursor-text text-[1.1rem] duration-150 transform -translate-y-3 top-5 z-10 origin-[0] right-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
                                >
                                    ایمیل
                                </label>
                            </div>

                            <div className='textbox relative'>
                                <input className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${styles.textBox}`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <label
                                    className={`absolute cursor-text text-[1.1rem] duration-150 transform -translate-y-3 top-5 z-10 origin-[0] right-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
                                >
                                    رمز عبور
                                </label>
                            </div>
                            <div className='flex items-center justify-center'>
                                <button className={styles.btn} type='submit'>
                                    {mutation.isLoading ? 'لودینگ' : 'بزن بریم'}
                                </button>
                            </div>
                        </div>

                        <div className="text-center py-4">
                            <span className='text-gray-500'>حساب کاربری ندارید؟ <Link className='text-red-500' to="/register">ثبت نام کنید</Link></span>
                        </div>

                    </form>

                </div>
            </div>
        </div>



        // <div>
        //     <h1>Login</h1>
        //     <form onSubmit={handleLogin}>
        //         <div>
        //             <label>Email</label>
        //             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        //         </div>
        //         <div>
        //             <label>Password</label>
        //             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        //         </div>
        //         {error && <p>{error}</p>}
        //         {message && <p>{message}</p>}
        //         <button type="submit" disabled={mutation.isLoading}>
        //             {mutation.isLoading ? 'Logging in...' : 'Login'}
        //         </button>
        //     </form>
        // </div>
    );
};

export default Login;
