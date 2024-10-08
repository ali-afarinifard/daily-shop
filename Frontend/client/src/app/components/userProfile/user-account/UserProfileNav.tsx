// ** Next
import { usePathname } from "next/navigation";
import Link from "next/link";

// ** Components
import UserProfileNavItem from "./UserProfileNavItem";

// ** Icons
import { MdDashboard, MdFormatListBulleted } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";

// ** Auth Context
import { User } from "@/context/AuthContext";

// ** MUI
import { Box, Divider, Typography } from "@mui/material";



interface UserProfileNavProps {
    user: User | null;
    logout: () => void;
}


const UserProfileNav: React.FC<UserProfileNavProps> = ({ user, logout }) => {

    const pathname = usePathname();

    return (
        <Box
            component="div"
            sx={{
                maxWidth: '16rem',
                px: '3rem',
                py: '1.25rem',
                borderRadius: '0.5rem',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
            }}
        >
            {user && (
                <Box component="div">

                    <Box
                        component="div"
                        sx={{
                            display: { xs: 'none', lg: 'flex' },
                            flexDirection: 'column',
                            alignItems: 'start',
                            gap: '1.25rem',
                        }}
                    >
                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%'
                            }}
                        >

                            <Box
                                component="div"
                                sx={{
                                    background: '#f8fafc',
                                    borderRadius: '100%',
                                    p: '0.5rem'
                                }}
                            >
                                <Box
                                    component="div"
                                    sx={{
                                        background: '#f1f5f9',
                                        borderRadius: '100%',
                                        p: '0.5rem'
                                    }}
                                >
                                    <Box
                                        component="div"
                                        sx={{
                                            background: '#e2e8f0',
                                            borderRadius: '100%',
                                            p: '0.5rem'
                                        }}
                                    >
                                        <FaUserCircle size={100} />
                                    </Box>
                                </Box>
                            </Box>

                            <Box component="div">
                                <Typography variant="h3">{user?.fullName || 'مهمان'}</Typography>
                            </Box>

                        </Box>

                        <Divider sx={{ background: '#e2e8f0', width: '100%', height: '1px' }} />

                        <Link href={'/user-account'}>
                            <UserProfileNavItem
                                label="پنل کاربری"
                                icon={MdDashboard}
                                selected={pathname === '/user-account'}
                            />
                        </Link>

                        <Link href={'/user-account/manage-wishlist'}>
                            <UserProfileNavItem
                                label="علاقه مندی ها"
                                icon={IoIosHeart}
                                selected={pathname === '/user-account/manage-wishlist'}
                            />
                        </Link>

                        <Link href={'/user-account/manage-orders'}>
                            <UserProfileNavItem
                                label="سفارش ها"
                                icon={MdFormatListBulleted}
                                selected={pathname === '/user-account/manage-orders'}
                            />
                        </Link>


                        <Box
                            component={'div'}
                        >
                            <UserProfileNavItem
                                label="خروج"
                                icon={MdLogout}
                                custom="text-rose-500"
                                onClick={() => {
                                    logout();
                                }}
                            />
                        </Box>
                    </Box>

                </Box>
            )}
        </Box>
    )
}

export default UserProfileNav