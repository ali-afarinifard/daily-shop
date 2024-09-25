'use client'


import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { useResetAccountMutation } from "@/store/apiSlice";
import { Box, Button, Link, Typography } from "@mui/material";



const ResetAccountForm = () => {

    const [emailFocused, setEmailFocused] = useState(false);
    const [newPasswordFocused, setNewPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmNewPasswordFocused] = useState(false);

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState({
        email: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [resetAccountPassword] = useResetAccountMutation();

    const router = useRouter();

    const validateForm = () => {
        let valid = true;
        const newErrors: any = {
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


    const handleAccountReset = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        };

        try {
            await resetAccountPassword({ email, newPassword }).unwrap();
            toast.success('رمز عبور با موفقیت تغییر کرد');
            router.push('/login');
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error('خطایی رخ داده است');
        }
    };


    return (
        <Box
            component="div"
            sx={{
                width: '100%',
                position: 'relative'
            }}
        >
            <Typography variant="h2" sx={{ textAlign: 'center' }}>بازیابی رمز عبور</Typography>

            <Box
                component="div"
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0
                }}
            >
                <Link href={'/login'} sx={{ color: '#2563eb', textDecoration: 'none' }}>
                    <Box
                        component="div"
                        sx={{
                            width: '2.5rem',
                            height: '2.5rem',
                            border: '1px solid',
                            borderColor: '#e2e8f0',
                            borderRadius: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            background: '#e2e8f0',
                        }}
                    >
                        <IoChevronBackOutline size={23} style={{ position: 'relative', right: '1px' }} />
                    </Box>
                </Link>
            </Box>

            <Box
                component="form"
                onSubmit={handleAccountReset}
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
                    {errors.email && <Typography variant='body1' sx={{ color: '#ef4444' }}>{errors.email}</Typography>}
                </Box>

                {/* New Password */}
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
                    <Box
                        component="input"
                        id='newPassword'
                        type={showPassword ? "text" : "password"}
                        autoComplete='off'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onFocus={() => setNewPasswordFocused(true)}
                        onBlur={(e) => {
                            if (!e.target.value) setNewPasswordFocused(false);
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
                        htmlFor="newPassword"
                        sx={{
                            position: 'absolute',
                            right: '1rem',
                            top: newPasswordFocused || newPassword ? '0.4rem' : '1rem',
                            transform: newPasswordFocused || newPassword ? 'scale(0.9)' : 'scale(1)',
                            transformOrigin: 'top right',
                            transition: 'all 0.2s ease-in-out',
                            zIndex: 10,
                            pointerEvents: 'none'
                        }}
                    >
                        <Typography variant='body1' sx={{ fontSize: '1rem' }}>رمز عبور جدید</Typography>
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
                    {errors.newPassword && <Typography variant="body1" sx={{ color: '#ef4444' }}>{errors.newPassword}</Typography>}
                </Box>

                {/* Confirm Password */}
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
                    <Box
                        component="input"
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        autoComplete="off"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setConfirmNewPasswordFocused(true)}
                        onBlur={(e) => {
                            if (!e.target.value) setConfirmNewPasswordFocused(false);
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
                        htmlFor="confirmPassword"
                        sx={{
                            position: 'absolute',
                            right: '1rem',
                            top: confirmPasswordFocused || confirmPassword ? '0.4rem' : '1rem',
                            transform: confirmPasswordFocused || confirmPassword ? 'scale(0.9)' : 'scale(1)',
                            transformOrigin: 'top right',
                            transition: 'all 0.2s ease-in-out',
                            zIndex: 10,
                            pointerEvents: 'none'
                        }}
                    >
                        تایید رمز عبور
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
                    {errors.confirmPassword && <Typography variant="body1">{errors.confirmPassword}</Typography>}
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
                    <Typography variant='body1' sx={{ color: '#fff' }}>تغییر رمز عبور</Typography>
                </Button>
            </Box>
        </Box>
    )
}

export default ResetAccountForm