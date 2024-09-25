'use client'


// ** Next
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

// ** Auth Context
import { AuthContext } from '@/context/AuthContext';

// ** apiSlice - RTK-Q
import { useLoginMutation } from '@/store/apiSlice';

// ** Icons
import { FaRegEyeSlash } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

// ** Toast
import toast from 'react-hot-toast';

// ** Components
import Heading from '../Heading';

// ** MUI
import { Box, Button, Link, Typography } from '@mui/material';


export default function LoginPage() {

    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

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

    const [login] = useLoginMutation();

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

            const response = await login({ email, password }).unwrap();

            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            authLogin(response.accessToken, response.refreshToken);
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
        <Box
            component="div"
            sx={{
                width: '100%'
            }}
        >
            <Heading title='ورود به دیجی شاپ' center />

            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{
                    mt: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                }}
            >

                {/* Email */}
                <Box
                    component="div"
                    sx={{
                        width: '100%',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem'
                    }}
                >
                    <Box component="div">
                        <Box
                            component="input"
                            id='email'
                            type="email"
                            autoComplete='off'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={(e) => {
                                if (!e.target.value) setEmailFocused(false);
                            }}
                            sx={{
                                width: '100%',
                                p: '1rem',
                                pt: '1.5rem',
                                outline: 'none',
                                background: '#fff',
                                fontWeight: 700,
                                border: '2px solid',
                                borderRadius: '0.37rem',
                                transition: 'all 0.2s ease-in-out',
                                borderColor: '#e0e0e0'
                            }}
                        />
                        <Box
                            component="label"
                            htmlFor="email"
                            sx={{
                                position: 'absolute',
                                right: '1rem',
                                top: emailFocused || email ? '0.4rem' : '1rem',
                                transform: emailFocused || email ? 'scale(0.9)' : 'scale(1)',
                                transformOrigin: 'top right',
                                transition: 'all 0.2s ease-in-out',
                                zIndex: 10,
                                pointerEvents: 'none'
                            }}
                        >
                            <Typography variant='body1' sx={{ fontSize: '1rem' }}>ایمیل</Typography>
                        </Box>
                    </Box>
                    {errors.email && <Typography variant='body1' sx={{ color: '#ef4444' }}>{errors.email}</Typography>}
                </Box>


                {/* Password */}
                <Box
                    component="div"
                    sx={{
                        width: '100%',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem'
                    }}
                >
                    <Box component="div">
                        <Box
                            component="input"
                            id='password'
                            type={showPassword ? "text" : "password"}
                            autoComplete='off'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={(e) => {
                                if (!e.target.value) setPasswordFocused(false);
                            }}
                            sx={{
                                width: '100%',
                                p: '1rem',
                                pt: '1.5rem',
                                outline: 'none',
                                background: '#fff',
                                fontWeight: 700,
                                border: '2px solid',
                                borderRadius: '0.37rem',
                                transition: 'all 0.2s ease-in-out',
                                borderColor: '#e0e0e0'
                            }}
                        />
                        <Box
                            component="label"
                            htmlFor="password"
                            sx={{
                                position: 'absolute',
                                right: '1rem',
                                top: passwordFocused || email ? '0.4rem' : '1rem',
                                transform: passwordFocused || email ? 'scale(0.9)' : 'scale(1)',
                                transformOrigin: 'top right',
                                transition: 'all 0.2s ease-in-out',
                                zIndex: 10,
                                pointerEvents: 'none'
                            }}
                        >
                            <Typography variant='body1' sx={{ fontSize: '1rem' }}>رمز عبور</Typography>
                        </Box>
                        <Box
                            component="div"
                            sx={{
                                position: 'absolute',
                                left: '0.75rem',
                                top: '1.5rem',
                                cursor: 'pointer'
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEye size={20} style={{ color: '#94a3b8' }} /> : <FaRegEyeSlash size={20} style={{ color: '#94a3b8' }} />}
                        </Box>
                    </Box>
                    {errors.password && <Typography variant='body1' sx={{ color: '#ef4444' }}>{errors.password}</Typography>}
                </Box>


                <Button
                    type="submit"
                    sx={{
                        background: '#334155',
                        borderRadius: '0.37rem',
                        p: '1rem',
                        width: '100%',
                        border: '1px solid',
                        borderColor: '#334155',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            background: '#334155',
                            opacity: '0.8'
                        }
                    }}
                >
                    <Typography variant='body1' sx={{ color: '#fff' }}>ورود</Typography>
                </Button>

                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'center', sm: 'space-between' },
                        gap: { xs: '0.5rem', sm: '0.25rem' },
                    }}
                >
                    <Typography
                        variant='body1'
                        sx={{
                            textAlign: 'center',
                            mt: '0.5rem'
                        }}
                    >
                        حساب کاربری ندارید؟ <Link href={'/register'} sx={{ color: '#f43f5e', textDecoration: 'none' }}>ثبت نام کنید</Link>
                    </Typography>

                    <Typography
                        variant='body1'
                        sx={{
                            textAlign: 'center',
                            mt: '0.5rem'
                        }}
                    >
                        <Link href={'/reset-account'} sx={{ textDecoration: 'none', fontWeight: 700, color: '#000000' }}>رمز عبور خود را فراموش کردید؟</Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
