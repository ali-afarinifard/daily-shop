'use client'

import GetManageWishlist from "@/app/components/userProfile/manage-wishlist/GetManageWishlist";
import { AuthContext } from "@/context/AuthContext";
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
        <div className="h-full">
            <GetManageWishlist userId={user._id} />
        </div>
    )
}

export default ManageWishlist