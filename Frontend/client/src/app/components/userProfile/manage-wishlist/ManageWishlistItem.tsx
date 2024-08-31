import ProductType from "@/types/product"
import { formatPriceToFarsi } from "@/utils/formatPriceToFarsi";
import Image from "next/image"
import Link from "next/link"
import { FaChevronLeft } from "react-icons/fa"


interface ManageWishlistItemProps {
    product: ProductType;
}


const ManageWishlistItem: React.FC<ManageWishlistItemProps> = ({ product }) => {
    return (
        <Link href={`/product/${product._id}`}>

            <div className="flex items-center justify-between gap-2">

                <div className="flex items-center gap-3">
                    <div className="w-16 h-full">
                        <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={100}
                            height={100}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        />
                    </div>

                    <div className="flex flex-col items-start gap-2">
                        <span className="text-slate-400">{product.title}</span>
                        <div className="text-slate-500 flex items-end gap-1">
                            {product.offer ? (
                                <div className="flex flex-col gap-1">
                                    <span className="text-offer text-sm text-slate-500">{formatPriceToFarsi(product?.price)}</span>
                                    <span className="text-md text-slate-500">{formatPriceToFarsi(product?.offer)}</span>
                                </div>
                            ) : (
                                <span className="text-md text-slate-500">{formatPriceToFarsi(product?.price)}</span>
                            )}
                            <span className="text-[0.85rem] relative -top-[2px] text-slate-500">تومان</span>
                        </div>
                    </div>
                </div>


                <div>
                    <FaChevronLeft size={20} />
                </div>

            </div>

        </Link>
    )
}

export default ManageWishlistItem