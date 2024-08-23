import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import UserProfileNavItem from "./UserProfileNavItem";
import { MdDashboard, MdFormatListBulleted } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { User } from "@/context/AuthContext";
import { MdLogout } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";




interface UserProfileNavProps {
    user: User | null;
    logout: () => void;
}


const UserProfileNav: React.FC<UserProfileNavProps> = ({ user, logout }) => {

    const pathname = usePathname();

    return (
        <div className="max-w-[16rem] shadow-md px-12 py-5 rounded-lg">
            {user && (
                <div>

                    <div className="flex flex-col items-start gap-5 xl:hidden">
                        <div className="flex flex-col items-center justify-center w-full">

                            <div className="bg-slate-50 rounded-full p-2">
                                <div className="bg-slate-100 rounded-full p-2">
                                    <div className="bg-slate-200 rounded-full p-2">
                                        <FaUserCircle size={100} />
                                    </div>
                                </div>
                            </div>

                            <div className="text-slate-600 text-[1.2rem]">
                                <p className="font-bold">{user?.fullName || 'مهمان'}</p>
                            </div>

                        </div>

                        <hr className="bg-slate-200 w-full h-[2px]" />

                        <Link href={'/userAccount'}>
                            <UserProfileNavItem
                                label="پنل کاربری"
                                icon={MdDashboard}
                                selected={pathname === '/userAccount'}
                            />
                        </Link>

                        <Link href={'/userAccount/manage-wishlist'}>
                            <UserProfileNavItem
                                label="علاقه مندی ها"
                                icon={IoIosHeart}
                                selected={pathname === '/userAccount/manage-wishlist'}
                            />
                        </Link>

                        <Link href={'/userAccount/manage-orders'}>
                            <UserProfileNavItem
                                label="سفارش ها"
                                icon={MdFormatListBulleted}
                                selected={pathname === '/userAccount/manage-orders'}
                            />
                        </Link>


                        <div>
                            <UserProfileNavItem
                                label="خروج"
                                icon={MdLogout}
                                custom="text-rose-500"
                                onClick={() => {
                                    logout();
                                }}
                            />
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default UserProfileNav