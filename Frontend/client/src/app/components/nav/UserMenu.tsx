'use client'

import Link from "next/link";
import { useCallback, useContext, useState } from "react";
import BackDrop from "./BackDrop";
import { AiFillCaretDown } from "react-icons/ai";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


const UserMenu = () => {

    const [isOpen, setIsOpen] = useState(false);
    
    const router = useRouter();

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user, logout } = authContext;

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return (
        <>
            <div className="relative z-30">

                <div onClick={toggleOpen} className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700">
                    <Avatar src={''} />
                    <AiFillCaretDown />
                </div>

                {isOpen && (
                    <div className="absolute rounded-md shadow-md w-[10.63rem] bg-white overflow-hidden left-0 top-12 text-sm flex flex-col cursor-pointer">

                        {user
                            ?
                            (
                                <div>
                                    <Link href={'/userAccount'}>
                                        <MenuItem onClick={toggleOpen}>حساب کاربری</MenuItem>
                                    </Link>
                                    <Link href={'/wishlist'}>
                                        <MenuItem onClick={toggleOpen}>علاقه مندی ها</MenuItem>
                                    </Link>
                                    <Link href={'/orders'}>
                                        <MenuItem onClick={toggleOpen}>سفارش ها</MenuItem>
                                    </Link>
                                    <hr />
                                    <MenuItem onClick={() => {
                                        toggleOpen();
                                        logout();
                                        router.push('/');
                                    }}>
                                        خروج
                                    </MenuItem>
                                </div>
                            )
                            :
                            (
                                <div>
                                    <Link href={'/login'}>
                                        <MenuItem onClick={toggleOpen}>ورود</MenuItem>
                                    </Link>
                                    <Link href={'/register'}>
                                        <MenuItem onClick={toggleOpen}>عضویت</MenuItem>
                                    </Link>
                                </div>
                            )
                        }

                    </div>
                )}

            </div>
            {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
        </>
    )
}

export default UserMenu