'use client'

import { User } from "@/context/AuthContext"
import Link from "next/link";
import { useCallback, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { MdDashboard, MdFormatListBulleted, MdLogout } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";
import MenuProfileItem from "./MenuProfileItem";
import BackDropProfileNav from "../../backdrop/BackDropProfileNav";



interface UserProfileNavMobileProps {
    user: User | null;
    logout: () => void;
}


const UserProfileNavMobile: React.FC<UserProfileNavMobileProps> = ({ user, logout }) => {

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return (
        <>
            <div className="relative z-30 w-fit">

                <div onClick={toggleOpen} className="p-2 px-3 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700 bg-slate-100">
                    <CiMenuKebab size={20} />
                    <span>منوی حساب کاربری</span>
                </div>

                {isOpen && (
                    <div className="absolute rounded-md shadow-md w-[10.63rem] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">

                        <div>
                            <Link href={'/user-account'}>
                                <MenuProfileItem
                                    onClick={toggleOpen}
                                    icon={MdDashboard}
                                    label="حساب کاربری"
                                />
                            </Link>
                            <Link href={'/user-account/manage-wishlist'}>
                                <MenuProfileItem
                                    onClick={toggleOpen}
                                    icon={IoIosHeart}
                                    label="علاقه مندی ها"
                                />
                            </Link>
                            <Link href={'/user-account/manage-orders'}>
                                <MenuProfileItem
                                    onClick={toggleOpen}
                                    icon={MdFormatListBulleted}
                                    label="سفارش ها"
                                />
                            </Link>
                            <hr />
                            <div>
                                <MenuProfileItem
                                    onClick={() => {
                                        logout();
                                        router.push('/')
                                    }}
                                    icon={MdLogout}
                                    label="خروج"
                                />
                            </div>
                        </div>

                    </div>
                )}

            </div>
            {isOpen ? <BackDropProfileNav onClick={toggleOpen} /> : null}
        </>
    )
}

export default UserProfileNavMobile