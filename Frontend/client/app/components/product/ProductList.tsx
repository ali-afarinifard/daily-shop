'use client'

import { ProductType } from "@/types"
import { formatPrice } from "@/utils/formatPrice"
import { productsData } from "@/utils/products"
import { truncateText } from "@/utils/truncateText"
import Image from "next/image"
import { useRouter } from "next/navigation"


const ProductList = () => {

    const router = useRouter()

    // ** Handle Product Rating Average
    // const productRating = data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / data.reviews.length;

    return (
        <div>
            {productsData.map((item: ProductType) => (
                <div
                    key={item.id}
                    onClick={() => router.push(`/product/${item.id}`)}
                    className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
                >
                    <div className="flex flex-col items-center w-full gap-1">

                        <div className="aspect-square overflow-hidden relative w-full">
                            <Image src={item.image} alt={item.name} fill className="w-full h-full object-contain" />
                        </div>

                        <div className="mt-4">
                            {truncateText(item.name)}
                        </div>

                        <hr className="w-full opacity-60 my-1" />

                        {/* <div>{item.reviews.length} دیدگاه</div> */}

                        <div className="font-semibold">{formatPrice(item.price)}</div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductList