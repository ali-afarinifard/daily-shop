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
        return <p>Please log in to view your wishlist.</p>;
    }

    return (
        <div className="pt-8">
            <Container>
                <Wishlist userId={user?._id} />
            </Container>
        </div>
    )
}

export default WishlistPage