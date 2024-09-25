'use client'

import { useContext, useEffect, useState } from 'react';
import Heading from '../Heading';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AuthContext } from '@/context/AuthContext';
import { FaRegEyeSlash } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { useRegisterMutation } from '@/store/apiSlice';
import { Box, Button, Link, Typography } from '@mui/material';


export default function RegisterPage() {

    const [usernameFocused, setUsernameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: ''
    });


    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { register: authRegister, isAuthenticated } = authContext;


    const [registerUser] = useRegisterMutation();


    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        };
    }, [isAuthenticated, router]);


    const validateForm = () => {
        let valid = true;
        const newErrors: any = {
            username: '',
            email: '',
            password: ''
        };

        if (username.length < 5) {
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

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        };

        try {

            const result = await registerUser({ username, email, password }).unwrap();
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('refreshToken', result.refreshToken);
            authRegister(result.accessToken, result.refreshToken);
            toast.success('وارد شدید');
            window.location.reload();
            router.push('/');

        } catch (error) {
            console.log('Registration failed. Please try again', error);
            setPassword('');
            toast.error('نام کاربری یا ایمیل قبلا استفاده شده است');
        }
    };

    return (
        <Box
            component="div"
            sx={{
                width: '100%',
            }}
        >
            <Heading title='عضویت در دیجی شاپ' center />
            <Box
                component="form"
                onSubmit={handleRegister}
                sx={{
                    mt: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                }}
            >

                {/* Username */}
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
                            id='username'
                            type="text"
                            autoComplete='off'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={() => setUsernameFocused(true)}
                            onBlur={(e) => {
                                if (!e.target.value) setUsernameFocused(false);
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
                            htmlFor="username"
                            sx={{
                                position: 'absolute',
                                right: '1rem',
                                top: usernameFocused || username ? '0.4rem' : '1rem',
                                transform: usernameFocused || username ? 'scale(0.9)' : 'scale(1)',
                                transformOrigin: 'top right',
                                transition: 'all 0.2s ease-in-out',
                                zIndex: 10,
                                pointerEvents: 'none'
                            }}
                        >
                            <Typography variant='body1' sx={{ fontSize: '1rem' }}>نام کاربری</Typography>
                        </Box>
                    </Box>
                    {errors.username && <Typography variant='body1' sx={{ color: '#ef4444' }}>{errors.username}</Typography>}
                </Box>

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
                                top: passwordFocused || password ? '0.4rem' : '1rem',
                                transform: passwordFocused || password ? 'scale(0.9)' : 'scale(1)',
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
                            {showPassword ? <FiEye size={20} style={{ color: '#94a3b8 ' }} /> : <FaRegEyeSlash size={20} style={{ color: '#94a3b8 ' }} />}
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
                    <Typography variant='body1' sx={{ color: '#fff' }}>عضویت</Typography>
                </Button>

                <Typography
                    variant='body1'
                    sx={{
                        textAlign: 'center',
                        mt: '0.5rem'
                    }}
                >
                    حساب کاربری دارید؟ <Link href={'/login'} sx={{ color: '#f43f5e', textDecoration: 'none' }}>وارد شوید</Link>
                </Typography>
            </Box>
        </Box>
    );
}
