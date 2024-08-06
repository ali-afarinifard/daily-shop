'use client'

import { useCart } from "@/hooks/useCart";
import ProductType from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import SetQuantity from "../products/SetQuantity";
import { truncateText } from "@/utils/truncateText";


interface ItemContentProps {
    item: ProductType;
}


const CartItem: React.FC<ItemContentProps> = ({ item }) => {

    const { handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease } = useCart();

    const firstImage = item.images[0];

    return (
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">

            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4 max-[450px]:flex-col max-[450px]:gap-4">
                <Link href={`/product/${item._id}`}>
                    <div className="relative w-[6.4rem] aspect-square">
                        <Image
                            src={`http://localhost:5000/${firstImage.replace(/\\/g, '/')}`}
                            alt={item.title}
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>
                <div className="flex flex-col justify-between gap-1">
                    <Link href={`/product/${item._id}`}>
                        {truncateText(item.title)}
                    </Link>

                    <div className="text-slate-500 flex flex-col items-start gap-1">
                        <p>رنگ: {item.selectedColor}</p>
                        <p>سایز: {item.selectedSize}</p> 
                    </div>

                    <div className="w-[4.4rem]">
                        <button className="text-slate-500 underline" onClick={() => { handleRemoveProductFromCart(item) }}>
                            حذف
                        </button>
                    </div>
                </div>
            </div>

            <div className="justify-self-center">{item.price}</div>

            <div className="justify-self-center">
                <SetQuantity
                    cardCounter={true}
                    productType={item}
                    handleQtyIncrease={() => { handleCartQtyIncrease(item) }}
                    handleQtyDecrease={() => { handleCartQtyDecrease(item) }}
                    custom="max-[450px]:flex-col max-[450px]:gap-2"
                />
            </div>

            <div className="justify-self-end font-semibold">{item.price * item.quantity}</div>

        </div>
    )
}

export default CartItem;