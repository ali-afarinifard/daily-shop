'use client'

// ** Components
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";
import CartCount from "../CartCount";
import FavoriteCount from "../FavoriteCount";
import UserMenu from "../UserMenu";
import Container from "../../Container";
import CategoryList from "../../category/CategoryList";
import { useEffect, useState } from "react";

const Navbar = () => {

    const [isAtTop, setIsAtTop] = useState(true);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsAtTop(scrollPosition < 50);
    };


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`fixed top-0 w-full bg-slate-200 z-40 shadow-sm ${isAtTop ? 'py-4 pb-0' : 'py-4'}`}>
            <div>
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-1">
                        <Link href="/" className="text-3xl">My~Shop</Link>

                        <div className="hidden md:block">
                            <SearchBar />
                        </div>

                        <div className="flex items-center gap-4 md:gap-8">
                            <CartCount />
                            {/* <FavoriteCount /> */}
                            <UserMenu />
                        </div>
                    </div>
                </Container>

                <CategoryList />
            </div>
        </div>
    );
};

export default Navbar;
