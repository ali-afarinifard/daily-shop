// ** Next Import
import Link from "next/link"

// ** Components
import Container from "../Container"

// ** React Icons
import { MdFacebook } from 'react-icons/md';
import { AiFillTwitterCircle, AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import FooterList from "./FooterList";


const Footer = () => {
    return (
        <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex xl:flex-col justify-between pt-16 pb-8">
                    <FooterList>

                        <h3 className="text-base font-bold mb-2">دسته بندی ها</h3>
                        <div className="flex flex-col gap-5">
                            <Link href={'#'}>همه</Link>
                            <Link href={'#'}>زنانه</Link>
                            <Link href={'#'}>مردانه</Link>
                            <Link href={'#'}>کودک</Link>
                        </div>

                    </FooterList>

                    <FooterList>

                        <h3 className="text-base font-bold mb-2">خدمات ما</h3>
                        <div className="flex flex-col gap-5">
                            <Link href={'#'}>پاسخ به پرسش های متداول</Link>
                            <Link href={'#'}>رویه های بازگرداندن کالا</Link>
                            <Link href={'#'}>نحوه ثبت سفارش</Link>
                            <Link href={'#'}>تماس با دیجی شاپ</Link>
                            <Link href={'#'}>حریم خصوصی</Link>
                            <Link href={'#'}>شرایط استفاده</Link>
                        </div>

                    </FooterList>

                    <div className="xl:w-full w-1/3 mb-6 md:mb-0">
                        <h3 className="text-base font-bold mb-2">درباره دیلی شاپ</h3>
                        <p className="mb-2 text-justify leading-[1.7rem]">
                            یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمان ی کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی که فروشگاه اینترنتی دیجی‌کالا سال‌هاست بر روی آن‌ها کار کرده و توانسته از این طریق مشتریان ثابت خود را داشته باشد. یکی از مهم‌ترین دغدغه‌های کاربران دیجی‌کالا یا هر فروشگاه‌ اینترنتی دیگری، این است که کالای خریداری شده چه زمانی به دستشان می‌رسد.
                        </p>
                        <p dir="ltr" className="text-end">&copy; {new Date().getFullYear()} Daily~Shop.</p>
                    </div>
                    <FooterList>

                        <h3 className="text-base font-bold mb-2 ml-3 lg:ml-0">همراه ما باشید</h3>

                        <div className="flex gap-2 ml-3 lg:ml-0">

                            <Link href={'#'}>
                                <MdFacebook size={24} />
                            </Link>
                            <Link href={'#'}>
                                <AiFillTwitterCircle size={24} />
                            </Link>
                            <Link href={'#'}>
                                <AiFillInstagram size={24} />
                            </Link>
                            <Link href={'#'}>
                                <AiFillYoutube size={24} />
                            </Link>

                        </div>

                    </FooterList>
                </div>
            </Container>
        </footer>
    )
}

export default Footer