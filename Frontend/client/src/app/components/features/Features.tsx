'use client'

import { Box, Typography } from "@mui/material"
// ** Components
import Heading from "../Heading"


const Features = () => {

    return (
        <Box
            component="div"
            sx={{
                mt: '5rem'
            }}
        >
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Heading title="درخواست تعویض مرجوع" center />
            </Box>
            <Typography
            variant="body1"
                sx={{
                    mt: '2.5rem',
                    maxWidth: '60rem',
                    textAlign: 'start',
                    mx: 'auto',
                    lineHeight: '2rem'
                }}
            >
                مشتریان عزیز دیجی شاپ، با توجه به درج دقیق مشخصات هر محصول (جنس و سایز) و نظر به حجم بالای سفارشات، درخواست تعویض و مرجوع به خاطر جنس و سایز پذیرفته نمی شود. لطفا در انتخاب خودتون دقت کنید.

                <Typography
                variant="body1"
                    sx={{
                        mt: '1.75rem'
                    }}
                >
                    با تشکر از همراهی و همکاری شما
                </Typography>
            </Typography>
        </Box>
    )
}

export default Features