'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import Button from "../Button";
import { AiOutlineGoogle } from "react-icons/ai";
import Input from "../inputs/Input";
import Link from "next/link";

const RegisterForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    });

    const router = useRouter();

    useEffect(() => {
        // ** Handle User logged in...
        // if (currentUser) {
        //     router.push('/cart');
        //     router.refresh();
        // }
    }, []);


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        // Handle User Login...
    };


    // ** redirect user login
    // if (currentUser) {
    //     return (
    //         <div className="flex flex-col items-center justify-center gap-6">
    //             <p className="text-center">وارد شدید، درحال انتقال به صفحه اصلی...</p>
    //         </div>
    //     );
    // };



    return (
        <>
            <Heading title='ثبت نام در Digi~Shop' />
            <Button
                label="ورود با حساب کاربری Google"
                outline
                icon={AiOutlineGoogle}
                onClick={() => {}}
            />

            <hr className="bg-slate-300 w-full h-px" />

            <Input
                id="name"
                label="نام"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input
                id="email"
                label="ایمیل"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input
                id="password"
                label="رمز عبور"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Button label={isLoading ? "درحال ثبت نام...." : "ثبت نام"} onClick={handleSubmit(onSubmit)} />

            <p className="text-sm flex items-center gap-[3px]">
                <span>حساب کاربری دارید؟</span>
                <Link href={'/login'} className="underline font-bold"> ورود</Link>
            </p>
        </>
    )
}

export default RegisterForm