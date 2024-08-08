'use client'

import { useContext, useState } from 'react';
import Heading from '../Heading';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        await register(username, email, password);
        router.push('/login');
    };

    return (
        <div className='w-full'>
            <Heading title='عضویت در دیجی شاپ' center />
            <form onSubmit={handleRegister} className='mt-10 flex flex-col gap-3'>

                {/* Username */}
                <div className='w-full relative'>
                    <input
                        id='username'
                        type="text"
                        placeholder=""
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed`}
                    />
                    <label
                        htmlFor="username"
                        className={`absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] right-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
                    >
                        نام کاربری
                    </label>
                </div>

                {/* Email */}
                <div className='w-full relative'>
                    <input
                        id='email'
                        type="email"
                        placeholder=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed`}
                    />
                    <label
                        htmlFor="email"
                        className={`absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] right-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
                    >
                        ایمیل
                    </label>
                </div>


                {/* Password */}
                <div className='w-full relative'>
                    <input
                        id='password'
                        type="password"
                        placeholder=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed`}
                    />
                    <label
                        htmlFor="password"
                        className={`absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] right-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
                    >
                        رمز عبور
                    </label>
                </div>


                <button
                    type="submit"
                    className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2 bg-slate-700 text-white text-md p-4`}
                >
                    عضویت
                </button>
            </form>
        </div>
    );
}
