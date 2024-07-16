'use client'

import { CardProductType, SelectedImgType } from "@/types"
import Image from "next/image"


interface ProductImageProps {
    cardProduct: CardProductType,
    product: any,
    handleColorSelect: (value: SelectedImgType) => void
};


const ProductImage: React.FC<ProductImageProps> = ({
    cardProduct,
    product,
    handleColorSelect
}) => {
    return (
        <div className="grid grid-cols-6 gap-2 h-full max-h-[31.25rem] min-h-[18.75rem] sm:min-h-[25rem]">

            <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[31.25rem] min-h-[18.75rem] sm:min-h-[25rem] rounded-md">
                {product.images.map((image: SelectedImgType) => (

                    <div key={image.color} onClick={() => handleColorSelect(image)} className={`relative w-[80%] aspect-square rounded border-teal-300 ${cardProduct.selectedImg.color === image.color ? 'border-[1.5px]' : 'border-none'}`}>
                        <Image src={image.image} alt={image.color} fill className="object-contain p-[3px]" />
                    </div>

                ))}
            </div>

            <div className="col-span-5 relative aspect-square">
                <Image src={cardProduct.selectedImg.image} alt={cardProduct.name} fill className="w-full h-full object-contain max-h-[31.25rem] min-h-[18.75rem] sm:min-h-[25rem]" />
            </div>

        </div>
    )
}

export default ProductImage