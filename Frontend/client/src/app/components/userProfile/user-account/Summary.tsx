'use client'


// ** Auth Context
import { User } from "@/context/AuthContext";
import { useEffect, useState } from "react";

// ** Toaster
import toast from "react-hot-toast";

// ** Components
import Spinner from "../../Spinner";

// ** Utils
import { validateEmail } from "@/utils/emailVal";

// ** Store - RTK-Q
import { useUpdateUserMutation } from "@/store/apiSlice";

// ** MUI
import { Box, Button, InputLabel, TextareaAutosize, Typography } from "@mui/material";



interface SummaryProps {
    user: User | null;
    updateUserInContext: (updatedUser: User | null) => void;
}


const Summary: React.FC<SummaryProps> = ({ user, updateUserInContext }) => {

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        userId: '',
        username: '',
        fullName: '',
        email: '',
        password: '',
        city: '',
        phoneNumber: '+98',
        postalCode: '',
        address: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        fullName: '',
        email: '',
        password: '',
        city: '',
        phoneNumber: '',
        postalCode: ''
    });


    const [updateUser] = useUpdateUserMutation();


    useEffect(() => {

        if (user) {
            setFormData({
                userId: user._id || '',
                username: user.username || '',
                fullName: user.fullName || '',
                email: user.email || '',
                password: '' || '',
                city: user.city || '',
                phoneNumber: user.phoneNumber ? `+98${String(user.phoneNumber).slice(2)}` : '+98',
                postalCode: user.postalCode || '',
                address: user.address || '',
            });
        }

    }, [user]);



    const validateForm = () => {
        let valid = true;
        const newErrors: any = {
            username: '',
            fullName: '',
            email: '',
            password: '',
            city: '',
            phoneNumber: '',
            postalCode: ''
        };

        if (formData.username.length < 5) {
            newErrors.username = 'حداقل 5 حرف وارد شود';
            valid = false;
        };

        if (formData.fullName.length < 3) {
            newErrors.fullName = 'حداقل 3 حرف وارد شود';
            valid = false;
        };

        const emailError = validateEmail(formData.email);
        if (emailError) {
            newErrors.email = emailError;
            valid = false;
        };

        if (formData.password && formData.password.length < 4) {
            newErrors.password = 'حداقل 4 حرف یا عدد وارد شود';
            valid = false;
        };

        if (formData.city.length < 2) {
            newErrors.city = 'حداقل 2 حرف وارد شود';
            valid = false;
        };

        if (!/^\+98\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'شماره همراه باید 10 رقمی باشد';
            valid = false;
        };

        if (!/^\d{9}$/.test(formData.postalCode)) {
            newErrors.postalCode = 'کد پستی باید 9 رقمی باشد';
            valid = false;
        };

        setErrors(newErrors);
        return valid;
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "phoneNumber") {
            // If the value starts with +98, allow it; otherwise, ignore the input
            if (!value.startsWith('+98')) {
                return;
            }

            // Remove the +98 prefix before validation
            const phoneNumberWithoutPrefix = value.slice(3);

            // Allow only numbers after +98
            if (!/^\d*$/.test(phoneNumberWithoutPrefix)) {
                return;
            }

            // Update the formData with the valid phone number
            setFormData({ ...formData, phoneNumber: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        try {
            const data = await updateUser(formData).unwrap();
            updateUserInContext(data.user);
            toast.success('پروفایل به روزرسانی شد');
        } catch (error: any) {
            console.log('Error updating user information.', error);

            if (error.response) {
                const status = error.response.status;
                const errorMessage = error.response.data.message || '';

                if (status === 400 || status === 409) {
                    if (errorMessage.includes('Username already taken')) {
                        toast.error('نام کاربری قبلاً استفاده شده است.');
                    } else if (errorMessage.includes('Email already registered')) {
                        toast.error('ایمیل قبلاً ثبت شده است.');
                    } else {
                        toast.error('خطای درخواست: ' + errorMessage);
                    }
                } else {
                    toast.error('ایمیل یا نام کاربر از قبل استفاده شده است');
                }
            } else {
                toast.error('خطای شبکه: لطفاً اتصال اینترنت خود را بررسی کنید.');
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Box
            component="div"
            sx={{
                width: '100%',
                height: '100%'
            }}
        >

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', height: '100%' }}>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%'
                    }}
                >

                    {/* Inputs */}
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            width: '100%'
                        }}
                    >

                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: { xs: 'center', xl: 'space-between' },
                                gap: { xs: '1rem', xl: '2rem' },
                                width: '100%',
                                flexDirection: { xs: 'column', xl: 'row' }
                            }}
                        >

                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.25rem',
                                    width: '100%'
                                }}
                            >
                                <InputLabel htmlFor="fullName" sx={{ color: '#64748b', fontSize: '0.95rem', fontWeight: 700 }}>نام و نام خانوادگی</InputLabel>
                                <Box
                                    component="input"
                                    id="fullName"
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: '#cbd5e1',
                                        p: '0.5rem',
                                        outlineColor: '#64748b',
                                        width: '100%',
                                        borderRadius: '0.37rem'
                                    }}
                                />
                                {errors.fullName && <Typography variant="body2" sx={{ color: '#ef4444' }}>{errors.fullName}</Typography>}
                            </Box>

                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.25rem',
                                    width: '100%'
                                }}
                            >
                                <InputLabel htmlFor="fullName" sx={{ color: '#64748b', fontSize: '0.95rem', fontWeight: 700 }}>نام کاربری</InputLabel>
                                <Box
                                    component="input"
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: '#cbd5e1',
                                        p: '0.5rem',
                                        outlineColor: '#64748b',
                                        width: '100%',
                                        borderRadius: '0.37rem'
                                    }}
                                />
                                {errors.username && <Typography variant="body2" sx={{ color: '#ef4444' }}>{errors.username}</Typography>}
                            </Box>

                        </Box>


                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', xl: 'row' },
                                alignItems: 'center',
                                justifyContent: { xs: 'center', xl: 'space-between' },
                                gap: { xs: '1rem', xl: '2rem' }
                            }}
                        >

                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: '0.25rem'
                                }}
                            >
                                <InputLabel htmlFor="fullName" sx={{ color: '#64748b', fontSize: '0.95rem', fontWeight: 700 }}>ایمیل</InputLabel>
                                <Box
                                    component="input"
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: '#cbd5e1',
                                        p: '0.5rem',
                                        outlineColor: '#64748b',
                                        width: '100%',
                                        borderRadius: '0.37rem'
                                    }}
                                />
                                {errors.email && <Typography variant="body2" sx={{ color: '#ef4444' }}>{errors.email}</Typography>}
                            </Box>

                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: '0.25rem'
                                }}
                            >
                                <InputLabel htmlFor="fullName" sx={{ color: '#64748b', fontSize: '0.95rem', fontWeight: 700 }}>رمز عبور</InputLabel>
                                <Box
                                    component="input"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: '#cbd5e1',
                                        p: '0.5rem',
                                        outlineColor: '#64748b',
                                        width: '100%',
                                        borderRadius: '0.37rem'
                                    }}
                                />
                            </Box>
                            {errors.password && <Typography variant="body2" sx={{ color: '#ef4444' }}>{errors.password}</Typography>}

                        </Box>

                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', xl: 'row' },
                                alignItems: 'center',
                                justifyContent: { xs: 'center', xl: 'space-between' },
                                gap: { xs: '1rem', xl: '2rem' }
                            }}
                        >

                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: '0.25rem'
                                }}
                            >
                                <InputLabel htmlFor="fullName" sx={{ color: '#64748b', fontSize: '0.95rem', fontWeight: 700 }}>شهر</InputLabel>
                                <Box
                                    component="input"
                                    id="city"
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: '#cbd5e1',
                                        p: '0.5rem',
                                        outlineColor: '#64748b',
                                        width: '100%',
                                        borderRadius: '0.37rem'
                                    }}
                                />
                                {errors.city && <Typography variant="body2" sx={{ color: '#ef4444' }}>{errors.city}</Typography>}

                            </Box>

                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: '0.25rem'
                                }}
                            >
                                <InputLabel htmlFor="fullName" sx={{ color: '#64748b', fontSize: '0.95rem', fontWeight: 700 }}>کد پستی</InputLabel>
                                <Box
                                    component="input"
                                    id="postalCode"
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: '#cbd5e1',
                                        p: '0.5rem',
                                        outlineColor: '#64748b',
                                        width: '100%',
                                        borderRadius: '0.37rem'
                                    }}
                                />
                                {errors.postalCode && <Typography variant="body2" sx={{ color: '#ef4444' }}>{errors.postalCode}</Typography>}

                            </Box>

                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: '0.25rem'
                                }}
                            >
                                <InputLabel htmlFor="fullName" sx={{ color: '#64748b', fontSize: '0.95rem', fontWeight: 700 }}>شماره همراه</InputLabel>
                                <Box
                                    component="input"
                                    id="phoneNumber"
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: '#cbd5e1',
                                        p: '0.5rem',
                                        outlineColor: '#64748b',
                                        width: '100%',
                                        borderRadius: '0.37rem',
                                        direction: 'ltr'
                                    }}
                                />
                                {errors.phoneNumber && <Typography variant="body2" sx={{ color: '#ef4444' }}>{errors.phoneNumber}</Typography>}
                            </Box>

                        </Box>

                        <Box
                            component="div"
                            sx={{
                                maxWidth: '21.3rem'
                            }}
                        >
                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: '0.25rem'
                                }}
                            >
                                <InputLabel htmlFor="fullName" sx={{ color: '#64748b', fontSize: '0.95rem', fontWeight: 700 }}>آدرس</InputLabel>
                                <TextareaAutosize
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    style={{
                                        resize: 'none',
                                        fontSize: '0.85rem',
                                        border: '1px solid',
                                        borderColor: '#cbd5e1',
                                        padding: '0.5rem',
                                        borderRadius: '0.37rem',
                                        width: '100%',
                                        height: '6rem'
                                    }}
                                />
                            </Box>
                        </Box>

                    </Box>


                    {/* Submit BTN */}
                    <Box
                        component="div"
                        sx={{
                            mt: '2rem',
                            display: 'flex',
                            alignItems: 'end',
                            justifyContent: 'end'
                        }}
                    >
                        {isLoading ? (
                            <Spinner size={30} />
                        ) : (
                            <Button
                                type="submit"
                                sx={{
                                    background: '#334155',
                                    py: '0.5rem',
                                    px: '1rem',
                                    transition: 'all 0.2s ease-in-out',
                                    border: '1px solid',
                                    borderColor: '#334155',
                                    gap: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '0.37rem',
                                    '&:hover': {
                                        opacity: '0.8',
                                        background: '#334155'
                                    }
                                }}
                                disabled={isLoading}
                            >
                                <Typography variant="body1" sx={{ color: '#fff' }}>ویرایش</Typography>
                            </Button>
                        )}

                    </Box>

                </Box>
            </Box>

        </Box>
    )
}

export default Summary