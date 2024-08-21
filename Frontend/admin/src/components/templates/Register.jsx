import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/apiUrls';
import { useMutation } from '@tanstack/react-query';
import avatar from "../../assets/images/admin-pic.webp"
import toast from 'react-hot-toast';


const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();


    const mutation = useMutation({
        mutationFn: () => register(username, email, password),
        onSuccess: () => {
            navigate('/login');
        },
        onError: () => {
            setError('Registration failed. Please try again.');
            toast.error('خطایی رخ داده');
        },
    });


    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        mutation.mutate();
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

                    <div className='flex flex-col gap-3 max-w-[30rem] mx-auto'>

                        <div className='flex flex-col gap-1'>

                            <label htmlFor="username" className='pr-1 text-[1.1rem]'>نام کاربری</label>
                            <input
                                id='username'
                                type="text"
                                value={username}
                                onChange={ev => setUsername(ev.target.value)}
                                className='py-2 text-slate-600'
                            />

                        </div>

                        <div className='flex flex-col gap-1'>

                            <label htmlFor="email" className='pr-1 text-[1.1rem]'>ایمیل</label>
                            <input
                                id='email'
                                type="email"
                                value={email}
                                onChange={ev => setEmail(ev.target.value)}
                                className='py-2 text-slate-600'
                            />

                        </div>


                        <div className='flex flex-col gap-1'>

                            <label htmlFor="password" className='pr-1 text-[1.1rem]'>رمز عبور</label>
                            <input
                                id='password'
                                type="password"
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                                className='py-2'
                            />

                        </div>

                        <div className='w-full flex items-center justify-center'>
                            <button className='bg-blue-500 hover:bg-blue-400 transition-all duration-300 text-white w-[17rem] p-2 rounded-xl text-xl'>
                                ثبت نام
                            </button>
                        </div>

                        <div className='text-sm text-center'>
                            حساب کاربری دارید؟ <Link to={'/login'} className='text-rose-500'>وارد شوید</Link>
                        </div>

                    </div>

                </div>

            </form>
        </div>
        // <div className={`${styles.background_container}`}>

        //     <div className='flex justify-center items-center h-screen'>
        //         <div className={`${styles.glass}`}>

        //             <div className='flex flex-col items-center justify-center'>
        //                 <h4 className='text-5xl font-bold pb-6'>عضویت</h4>
        //                 <span className='text-slate-400'>پنل کاربری ادمین</span>
        //             </div>

        //             <form className='py-1' onSubmit={handleRegister}>
        //                 <div className='profile flex justify-center py-4'>
        //                     <img src={avatar} className={styles.profile_img} alt="avatar" />
        //                 </div>

        //                 <div>
        //                     <div className='textbox relative'>
        //                         <input className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${styles.textBox}`} type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        //                         <label
        //                             className={`absolute cursor-text text-[1.1rem] duration-150 transform -translate-y-3 top-5 z-10 origin-[0] right-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
        //                         >
        //                             نام کاربری
        //                         </label>
        //                     </div>

        //                     {/* <TextField
        //                         label="نام کاربری"
        //                         placeholder="العنصر النائب"
        //                         variant="outlined"
        //                         sx={{ fontWeight: 'bold' }}
        //                     /> */}

        //                     <div className='textbox relative'>
        //                         <input className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${styles.textBox}`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        //                         <label
        //                             className={`absolute cursor-text text-[1.1rem] duration-150 transform -translate-y-3 top-5 z-10 origin-[0] right-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
        //                         >
        //                             ایمیل
        //                         </label>
        //                     </div>

        //                     <div className='textbox relative'>
        //                         <input className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${styles.textBox}`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        //                         <label
        //                             className={`absolute cursor-text text-[1.1rem] duration-150 transform -translate-y-3 top-5 z-10 origin-[0] right-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
        //                         >
        //                             رمز عبور
        //                         </label>
        //                     </div>
        //                     <div className='flex items-center justify-center'>
        //                         <button className={styles.btn} type='submit'>بزن بریم</button>
        //                     </div>
        //                 </div>

        //                 <div className="text-center py-4">
        //                     <span className='text-gray-500'>حساب کاربری دارید؟ <Link className='text-red-500' to="/login">وارد شوید</Link></span>
        //                 </div>

        //             </form>

        //         </div>
        //     </div>
        // </div>
    );
};

export default Register;
