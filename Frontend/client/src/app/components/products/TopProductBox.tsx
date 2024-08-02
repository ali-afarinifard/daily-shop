import Product from "@/types/product"
import Image from "next/image"
import Link from "next/link";


interface TopProductBoxProps {
    product: Product
}


const TopProductBox: React.FC<TopProductBoxProps> = ({ product }) => {

    const firstImage = product.images[0];
    const secondImage = product.images[1];
    console.log(firstImage)
    console.log(secondImage)

    return (
        <div className="w-full rounded-md overflow-hidden shadow-md">
            <Link href={'/product'}>

                <div className="relative w-full h-80 group">
                    {firstImage && (
                        <Image
                            src={`http://localhost:5000/${firstImage.replace(/\\/g, '/')}`}
                            alt={product.title}
                            className="object-cover rounded-t-md transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                            fill
                        />
                    )}

                    {secondImage && (
                        <Image
                            src={`http://localhost:5000/${secondImage.replace(/\\/g, '/')}`}
                            alt={product.title}
                            className="object-cover absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                            fill
                        />
                    )}
                </div>

                <div className="p-4 bg-white">
                    <div className="text-center text-gray-600 text-md">{product.title}</div>
                    <div className="text-center text-slate-700 text-lg mt-2 flex justify-center gap-2">
                        <span>تومان</span>
                        <span>{product.price}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default TopProductBox