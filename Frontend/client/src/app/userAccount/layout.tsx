'use client'

import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import UserProfileNav from "../components/userProfile/UserProfileNav";
import Container from "../components/Container";


const UserLayout = ({ children }: { children: React.ReactNode }) => {

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user, logout } = authContext;


    if (!user) {
        return <p>Please log in to view your wishlist.</p>;
    }

    return (
        <Container>
            <div className="flex gap-10 xl:gap-4 h-full w-full py-24">
                <UserProfileNav user={user} logout={logout} />
                {children}
            </div>
        </Container>
    )
}

export default UserLayout