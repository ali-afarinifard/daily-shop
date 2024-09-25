'use client'


// ** Next
import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

// ** Auth Context
import { User } from "@/context/AuthContext"

// ** Icons
import { CiMenuKebab } from "react-icons/ci";
import { MdDashboard, MdFormatListBulleted, MdLogout } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";

// ** Components
import MenuProfileItem from "./MenuProfileItem";
import BackDropProfileNav from "../../backdrop/BackDropProfileNav";

// ** MUI
import { Box, Divider, Typography } from "@mui/material";



interface UserProfileNavMobileProps {
    user: User | null;
    logout: () => void;
}


const UserProfileNavMobile: React.FC<UserProfileNavMobileProps> = ({ user, logout }) => {

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return (
        <>
            <Box
                component={'div'}
                sx={{
                    position: 'relative',
                    zIndex: 30,
                    width: 'fit-content'
                }}
            >

                <Box
                    component={'div'}
                    onClick={toggleOpen}
                    sx={{
                        p: '0.5rem',
                        px: '0.75rem',
                        border: '1px solid',
                        borderColor: '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        borderRadius: '40px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        color: '#334155',
                        background: '#f1f5f9',
                        '&:hover': {
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                        }
                    }}
                >
                    <CiMenuKebab size={20} />
                    <Typography variant="body1" sx={{ fontWeight: 900 }}>منوی حساب کاربری</Typography>
                </Box>

                {isOpen && (
                    <Box
                        component={'div'}
                        sx={{
                            position: 'absolute',
                            borderRadius: '0.37rem',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            width: '10.63rem',
                            background: '#fff',
                            overflow: 'hidden',
                            right: 0,
                            top: '3rem',
                            fontSize: '0.8rem',
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer'
                        }}
                    >

                        <Box component='div'>
                            <Link href={'/user-account'}>
                                <MenuProfileItem
                                    onClick={toggleOpen}
                                    icon={MdDashboard}
                                    label="حساب کاربری"
                                />
                            </Link>
                            <Link href={'/user-account/manage-wishlist'}>
                                <MenuProfileItem
                                    onClick={toggleOpen}
                                    icon={IoIosHeart}
                                    label="علاقه مندی ها"
                                />
                            </Link>
                            <Link href={'/user-account/manage-orders'}>
                                <MenuProfileItem
                                    onClick={toggleOpen}
                                    icon={MdFormatListBulleted}
                                    label="سفارش ها"
                                />
                            </Link>
                            <Divider />
                            <Box component='div'>
                                <MenuProfileItem
                                    onClick={() => {
                                        logout();
                                        router.push('/')
                                    }}
                                    icon={MdLogout}
                                    label="خروج"
                                />
                            </Box>
                        </Box>

                    </Box>
                )}

            </Box>
            {isOpen ? <BackDropProfileNav onClick={toggleOpen} /> : null}
        </>
    )
}

export default UserProfileNavMobile