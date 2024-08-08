import Heading from "../Heading"

const Features = () => {
    return (
        <div className="mt-20">
            <div className="flex flex-col items-center justify-center">
                <Heading title="درخواست تعویض مرجوع" center />
            </div>
            <div className="mt-10 max-w-[60rem] text-center mx-auto leading-8">
                مشتریان عزیز دیجی شاپ، با توجه به درج دقیق مشخصات هر محصول (جنس و سایز) و نظر به حجم بالای سفارشات، درخواست تعویض و مرجوع به خاطر جنس و سایز پذیرفته نمی شود. لطفا در انتخاب خودتون دقت کنید.

                <div className="mt-7">
                    با تشکر از همراهی و همکاری شما
                </div>
            </div>
        </div>
    )
}

export default Features