'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../input/Input";
import Link from "next/link";
import Button from "../Button";
import Heading from "../Heading";


const LoginForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        },
    });


    const router = useRouter();

    // useEffect(() => {
    //     if (currentUser) {
    //         router.push('/cart');
    //         router.refresh();
    //     }
    // }, []);


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

    };


    // if (currentUser) {
    //     return (
    //         <div className="flex flex-col items-center justify-center gap-6">
    //             <p className="text-center">وارد شدید، درحال انتقال به صفحه اصلی...</p>
    //         </div>
    //     );
    // };


    return (
        <>
            <Heading title='ورود به Digi~Shop' center />

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

            <Button label={isLoading ? "درحال ورود..." : "ورود"} onClick={handleSubmit(onSubmit)} />

            <p className="text-sm flex items-center gap-[3px]">
                <span>حساب کاربری ندارید؟</span>
                <Link href={'/register'} className="underline font-bold"> ثبت نام</Link>
            </p>
        </>
    )
}

export default LoginForm