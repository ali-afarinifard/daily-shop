import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/api';
import { useMutation } from '@tanstack/react-query';
import styles from "../../styles/Register.module.css";
import avatar from "../../assets/images/profile.png"

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();


    const mutation = useMutation({
        mutationFn: () => register(username, email, password),
        onSuccess: () => {
            navigate('/login')
        },
        onError: () => {
            setError('Registration failed. Please try again.')
        },
    });


    const handleRegister = (e) => {
        e.preventDefault();
        setError('');  // Clear any previous error
        mutation.mutate();
    };


    return (
        <div className={`${styles.background_container}`}>

            {/* <Toaster position='top-center' reverseOrder={false}></Toaster> */}

            <div className='flex justify-center items-center h-screen'>
                <div className={`${styles.glass}`}>

                    <div className='flex flex-col items-center justify-center'>
                        <h4 className='text-5xl font-bold pb-6'>ثبت نام</h4>
                        <span className='text-slate-400'>پنل کاربری ادمین</span>
                    </div>

                    <form className='py-1' onSubmit={handleRegister}>
                        <div className='profile flex justify-center py-4'>
                            <img src={avatar} className={styles.profile_img} alt="avatar" />
                        </div>

                        <div>
                            <div className='textbox relative'>
                                <input className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${styles.textBox}`} type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                <label
                                    className={`absolute cursor-text text-[1.1rem] duration-150 transform -translate-y-3 top-5 z-10 origin-[0] right-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
                                >
                                    نام کاربری
                                </label>
                            </div>

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
                                <button className={styles.btn} type='submit'>بزن بریم</button>
                            </div>
                        </div>

                        <div className="text-center py-4">
                            <span className='text-gray-500'>حساب کاربری دارید؟ <Link className='text-red-500' to="/login">وارد شوید</Link></span>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default Register;
