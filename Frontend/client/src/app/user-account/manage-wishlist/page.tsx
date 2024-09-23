'use client'

import GetManageWishlist from "@/app/components/userProfile/manage-wishlist/GetManageWishlist";
import { AuthContext } from "@/context/AuthContext";
import { Box } from "@mui/material";
import { useContext } from "react";



const ManageWishlist = () => {

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
            sx={{
                height: '100%'
            }}
        >
            <GetManageWishlist userId={user._id} />
        </Box>
    )
}

export default ManageWishlist