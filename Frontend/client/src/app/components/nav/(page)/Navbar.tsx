'use client'

// ** Components
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";
import CartCount from "../CartCount";
import UserMenu from "../UserMenu";
import Container from "../../Container";
import CategoryList from "../../category/CategoryList";
import { useCallback, useEffect, useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import CategoryListMobile from "../../category/CategoryListMobile";
import BackDrop from "../BackDrop";
import { IoMdClose } from "react-icons/io";



const Navbar = () => {

    const [isAtTop, setIsAtTop] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsAtTop(scrollPosition < 50);
    };


    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev)
    }, []);


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className={`fixed top-0 w-full bg-slate-200 z-40 shadow-sm ${isAtTop ? 'py-4 pb-0' : 'py-4'} xl:pb-4`}>
                <div>
                    <Container>
                        <div className="flex items-center justify-between gap-2">

                            <button
                                className="hidden xl:block"
                                onClick={toggleMenu}
                            >
                                <RiMenu3Fill size={28} />
                            </button>

                            <Link href="/" className="text-3xl m:text-2xl">Daily~Shop</Link>

                            <div className="xl:hidden">
                                <SearchBar />
                            </div>

                            <div className="flex items-center gap-3 md:gap-8 xm:gap-1">
                                <CartCount />
                                <UserMenu />
                            </div>
                        </div>
                    </Container>

                    <div className="block xl:hidden">
                        <CategoryList />
                    </div>

                    <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg transform overflow-y-auto ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out z-50 hidden xl:block`}>

                        <div className="py-2 px-3">
                            <button
                                className="pt-5 pr-5"
                                onClick={toggleMenu}
                            >
                                <IoMdClose size={32} />
                            </button>

                            <CategoryListMobile toggleMenu={toggleMenu} />
                        </div>

                    </div>
                </div>
            </div>
            {isMenuOpen ? <BackDrop onClick={toggleMenu} /> : null}
        </>
    );
};

export default Navbar;
