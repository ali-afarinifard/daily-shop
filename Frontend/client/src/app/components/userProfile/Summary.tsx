'use client'


import { User } from "@/context/AuthContext";
import { updateUser } from "@/libs/apiUrls";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../Spinner";


interface SummaryProps {
    user: User | null;
    updateUserInContext: (updatedUser: User | null) => void;
}


const Summary: React.FC<SummaryProps> = ({ user, updateUserInContext }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        username: '',
        fullName: '',
        email: '',
        password: ''
    });


    useEffect(() => {

        if (user) {
            setFormData({
                userId: user._id,
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                password: ''
            });
        }

    }, [user]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {

            const data = await updateUser(formData);
            updateUserInContext(data.user);
            toast.success('پروفایل به روزرسانی شد')

        } catch (error) {
            console.log('Error updating user information.', error);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="w-full h-full">

            <form onSubmit={handleSubmit} className="w-full h-full">
                <div className="flex flex-col justify-between h-full">

                    {/* Inputs */}
                    <div className="flex flex-col gap-8">

                        <div className="flex items-center justify-between gap-8 2xl:flex-col 2xl:justify-center 2xl:gap-4">

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="fullName" className="text-slate-500">نام و نام خانوادگی</label>
                                <input
                                    id="fullName"
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="border-[1px] border-slate-300 py-2 px-2 outline-slate-500 rounded-md"
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="username" className="text-slate-500">نام کاربری</label>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="border-[1px] border-slate-300 py-2 px-2 outline-slate-500 rounded-md"
                                />
                            </div>

                        </div>


                        <div className="flex items-center justify-between gap-8 2xl:flex-col 2xl:justify-center 2xl:gap-4">

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="email" className="text-slate-500">ایمیل</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border-[1px] border-slate-300 py-2 px-2 outline-slate-500 rounded-md"
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="password" className="text-slate-500">رمز عبور</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="border-[1px] border-slate-300 py-2 px-2 outline-slate-500 rounded-md"
                                />
                            </div>

                        </div>

                    </div>


                    {/* Submit BTN */}
                    <div className="xl:mt-8">
                        {isLoading ? (
                            <Spinner size={30} />
                        ) : (
                            <button
                                type="submit"
                                className="disabled:opacity-70 bg-slate-700 text-white py-2 px-4 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition border-slate-700 flex items-center justify-center gap-2"
                                disabled={isLoading}
                            >
                                ویرایش
                            </button>
                        )}

                    </div>

                </div>
            </form>

        </div>
    )
}

export default Summary