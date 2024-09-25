'use client'


// ** Next Import
import Link from "next/link"

// ** apiSlice - RTK-Q
import { useGetAllCategoriesQuery } from "@/store/apiSlice";

// ** Icons
import { AiFillTwitterCircle, AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import { MdFacebook } from 'react-icons/md';

// ** Types
import CategoryType from "@/types/category";

// ** Components
import Container from "../Container"
import FooterList from "./FooterList";
import { Box, Typography } from "@mui/material";


const Footer = () => {

    const { data: categories } = useGetAllCategoriesQuery();

    return (
        <Box
            component="footer"
            sx={{
                background: '#334155',
                color: '#e2e8f0',
                fontSize: '0.87rem',
                lineHeight: '1.25rem',
                mt: '4rem'
            }}
        >
            <Container>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        justifyContent: 'space-between',
                        pt: '4rem',
                        pb: '2rem'
                    }}
                >
                    <FooterList>

                        <Typography sx={{ color: '#fff', fontWeight: 900, mb: '0.5rem', fontSize: '1rem', lineHeight: '1.5rem' }} >دسته بندی ها</Typography>

                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.25rem'
                            }}
                        >
                            <Link href={`/products`}>
                                همه
                            </Link>

                            {categories?.map((category: CategoryType) => (
                                <Box
                                    component="div"
                                    key={category._id}>
                                    <Link href={`/category/${category._id}`}>
                                        {category.name}
                                    </Link>
                                </Box>
                            ))}
                        </Box>

                    </FooterList>

                    <FooterList>

                        <Typography sx={{ color: '#fff', fontWeight: 900, mb: '0.5rem', fontSize: '1rem', lineHeight: '1.5rem' }}>خدمات ما</Typography>

                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.25rem'
                            }}
                        >
                            <Link href={'#'}>پاسخ به پرسش های متداول</Link>
                            <Link href={'#'}>رویه های بازگرداندن کالا</Link>
                            <Link href={'#'}>نحوه ثبت سفارش</Link>
                            <Link href={'#'}>تماس با دیجی شاپ</Link>
                            <Link href={'#'}>حریم خصوصی</Link>
                            <Link href={'#'}>شرایط استفاده</Link>
                        </Box>

                    </FooterList>

                    <Box
                        component="div"
                        sx={{
                            width: { xs: '100%', lg: '33%' },
                            mb: { xs: '1.5rem', md: 0 }
                        }}
                    >
                        <Typography sx={{ fontWeight: 900, mb: '0.5rem', fontSize: '1rem', lineHeight: '1.5rem', color: '#fff' }}>درباره دیلی شاپ</Typography>

                        <Typography variant="body2" sx={{ mb: '0.5rem', textAlign: 'justify', lineHeight: '1.7rem', color: '#fff' }}>
                            یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمان ی کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی که فروشگاه اینترنتی دیجی‌کالا سال‌هاست بر روی آن‌ها کار کرده و توانسته از این طریق مشتریان ثابت خود را داشته باشد. یکی از مهم‌ترین دغدغه‌های کاربران دیجی‌کالا یا هر فروشگاه‌ اینترنتی دیگری، این است که کالای خریداری شده چه زمانی به دستشان می‌رسد.
                        </Typography>

                        <Typography variant="body2" dir="ltr" sx={{ textAlign: 'end', color: '#fff' }}>&copy; {new Date().getFullYear()} Daily~Shop.</Typography>
                    </Box>

                    <FooterList>

                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                mr: {xs: 0, lg: '2rem'}
                            }}
                        >
                            <Typography variant="body1" sx={{ mb: '0.5rem', ml: { xs: '0.75rem', '2xl': 0 }, color: '#fff' }}>همراه ما باشید</Typography>

                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    ml: { xs: '0.75rem', '2xl': 0 }
                                }}
                            >

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

                            </Box>
                        </Box>

                    </FooterList>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer