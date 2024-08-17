import ProductType from "@/types/product"
import Image from "next/image"
import Link from "next/link"
import { FaChevronLeft } from "react-icons/fa"
import { IoMdClose } from "react-icons/io";


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
                            src={`http://localhost:5000/${product.images[0].replace(/\\/g, '/')}`}
                            alt={product.title}
                            width={100}
                            height={100}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        />
                    </div>

                    <div className="flex flex-col items-start gap-1">
                        <span className="text-slate-400">{product.title}</span>
                        <span className="text-slate-500 flex items-center gap-1">
                            <span>{product.price}</span>
                            <span>تومان</span>
                        </span>
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