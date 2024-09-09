'use client'


// ** React
import { useContext } from "react";

// ** Auth Context
import { AuthContext } from "@/context/AuthContext";

// ** Components
import Container from "../components/Container"
import Wishlist from "../components/wishlists/Wishlist"

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
        <div className="pt-20">
            <Container>
                <Wishlist userId={user?._id} />
            </Container>
        </div>
    )
}

export default WishlistPage