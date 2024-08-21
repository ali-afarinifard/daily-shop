'use client'

import { useContext } from "react";
import Container from "../components/Container"
import Wishlist from "../components/wishlists/Wishlist"
import { AuthContext } from "@/context/AuthContext";

const WishlistPage = () => {


    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user, logout } = authContext;


    if (!user) {
        return;
    }

    return (
        <div className="pt-20">
            <Container>
                <Wishlist userId={user?._id} />
            </Container>
        </div>
    )
}

export default WishlistPage