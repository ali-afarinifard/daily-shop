'use client'


// ** React
import { useContext } from "react";

// ** Auth Context
import { AuthContext } from "@/context/AuthContext";

// ** Components
import Container from "../components/Container";
import UserProfileNav from "../components/userProfile/user-account/UserProfileNav";
import UserProfileNavMobile from "../components/userProfile/user-account/UserProfileNavMobile";

// ** MUI
import { Box } from "@mui/material";


const UserLayout = ({ children }: { children: React.ReactNode }) => {

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    };

    const { user, logout } = authContext;


    if (!user) {
        return;
    };

    return (
        <Container>
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    height: '100%',
                    width: '100%',
                    py: { xs: '3.5rem', lg: '6rem' },
                    gap: { xs: '5rem', lg: '2.5rem' }
                }}
            >
                <Box
                    component="div"
                    sx={{
                        display: { xs: 'none', lg: 'block' }
                    }}
                >
                    <UserProfileNav user={user} logout={logout} />
                </Box>

                <Box
                    component="div"
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        mt: { xs: '4rem', md: 0 }
                    }}
                >
                    <UserProfileNavMobile user={user} logout={logout} />
                </Box>

                <Box
                    component="div"
                    sx={{
                        width: '100%',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        py: '1.25rem',
                        px: { xs: '0.75rem', '2xs': '1.5rem' },
                        borderRadius: '0.5rem'
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Container>
    )
}

export default UserLayout