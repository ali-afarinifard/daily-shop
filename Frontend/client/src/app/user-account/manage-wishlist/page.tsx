'use client'


// ** Next
import { useContext } from "react";

// ** Components
import GetManageWishlist from "@/app/components/userProfile/manage-wishlist/GetManageWishlist";

// ** Auth Context
import { AuthContext } from "@/context/AuthContext";

// ** MUI
import { Box } from "@mui/material";


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
            component="div"
            sx={{
                height: '100%'
            }}
        >
            <GetManageWishlist userId={user._id} />
        </Box>
    )
}

export default ManageWishlist