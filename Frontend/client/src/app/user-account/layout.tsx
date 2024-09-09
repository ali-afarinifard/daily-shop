'use client'


// ** React
import { useContext } from "react";

// ** Auth Context
import { AuthContext } from "@/context/AuthContext";

// ** Components
import Container from "../components/Container";
import UserProfileNav from "../components/userProfile/user-account/UserProfileNav";
import UserProfileNavMobile from "../components/userProfile/user-account/UserProfileNavMobile";


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
            <div className="flex xl:flex-col gap-10 xl:gap-20 h-full w-full py-24 xl:py-14">
                <div className="xl:hidden">
                    <UserProfileNav user={user} logout={logout} />
                </div>
                <div className="hidden xl:block sl:mt-16">
                    <UserProfileNavMobile user={user} logout={logout} />
                </div>
                <div className="w-full shadow-md py-5 px-6 xm:px-3 rounded-lg">
                    {children}
                </div>
            </div>
        </Container>
    )
}

export default UserLayout