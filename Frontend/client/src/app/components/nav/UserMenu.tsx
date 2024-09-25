'use client'

// ** Next
import Link from "next/link";
import { useCallback, useContext, useState } from "react";

// ** Auth Context
import { AuthContext } from "@/context/AuthContext";

// ** Icons
import { AiFillCaretDown } from "react-icons/ai";

// ** Components
import BackDrop from "./BackDrop";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import { Box, Divider, IconButton, Typography } from "@mui/material";


const UserMenu = () => {

    const [isOpen, setIsOpen] = useState(false);

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user, logout } = authContext;


    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 30
                }}
            >
                <Box onClick={toggleOpen} sx={{ padding: 1, border: "1px solid", borderColor: "slate.400", borderRadius: "40px", display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer', "&:hover": { boxShadow: 2 } }}>
                    <Avatar src={""} />
                    <AiFillCaretDown style={{ marginLeft: "4px" }} />
                </Box>

                {isOpen && (
                    <Box
                        sx={{
                            position: 'absolute',
                            borderRadius: '0.37rem',
                            width: '10.63rem',
                            background: '#fff',
                            overflow: 'hidden',
                            left: 0,
                            top: '3rem',
                            fontSize: '0.87rem',
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer'
                        }}
                    >

                        {user
                            ?
                            (
                                <Box>
                                    <Link href={'/user-account'} passHref>
                                        <MenuItem onClick={toggleOpen}>
                                            <Typography variant="body1">حساب کاربری</Typography>
                                        </MenuItem>
                                    </Link>
                                    <Link href={'/wishlist'} passHref>
                                        <MenuItem onClick={toggleOpen}>
                                            <Typography variant="body1">علاقه مندی ها</Typography>
                                        </MenuItem>
                                    </Link>
                                    <Link href={'/orders'} passHref>
                                        <MenuItem onClick={toggleOpen}>
                                            <Typography variant="body1">سفارش ها</Typography>
                                        </MenuItem>
                                    </Link>
                                    <Divider />
                                    <MenuItem onClick={() => {
                                        toggleOpen();
                                        logout();
                                    }}>
                                        <Typography variant="body1">خروج</Typography>
                                    </MenuItem>
                                </Box>
                            )
                            :
                            (
                                <Box>
                                    <Link href={'/login'} passHref>
                                        <MenuItem onClick={toggleOpen}>
                                            <Typography variant="body1">ورود</Typography>
                                        </MenuItem>
                                    </Link>
                                    <Link href={'/register'} passHref>
                                        <MenuItem onClick={toggleOpen}>
                                            <Typography variant="body1">عضویت</Typography>
                                        </MenuItem>
                                    </Link>
                                </Box>
                            )
                        }

                    </Box>
                )}

            </Box>
            {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
        </>
    )
}

export default UserMenu