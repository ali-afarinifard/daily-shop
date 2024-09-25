'use client'


// ** React
import { useContext } from "react";

// ** Auth Context
import { AuthContext } from "@/context/AuthContext";

// ** Components
import Container from "../components/Container"
import Wishlist from "../components/wishlists/Wishlist"
import { Box } from "@mui/material";

const WishlistPage = () => {

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user } = authContext;


    if (!user) {
        return;
    }

    return (
        <Box
            component="div"
            sx={{
                pt: '5rem'
            }}
        >
            <Container>
                <Wishlist userId={user?._id} />
            </Container>
        </Box>
    )
}

export default WishlistPage