// ** Next Import
import Image from "next/image"

const HomeBanner = () => {
    return (
        <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8 rounded-sm">
            <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">

                <div className="mb-8 md:mb-0 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white">
                        حراج تابستانه
                    </h1>

                    <p className="text-lg md:text-xl text-white my-4">
                        از تخفیفات فروشگاه ما استفاده کنید
                    </p>

                    <p className="text-2xl md:text-5xl text-yellow-400 font-bold">
                        تا 50% تخفیف
                    </p>
                </div>

                <div className="w-2/3 relative aspect-video md:w-1/3">
                    <Image src={'/banner-image.png'} alt="Banner Image" fill className="object-contain" />
                </div>

            </div>
        </div>
    )
}

export default HomeBanner