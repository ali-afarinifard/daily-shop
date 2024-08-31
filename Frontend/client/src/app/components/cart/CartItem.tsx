'use client';  // Add this directive at the top

import { useCart } from "@/hooks/useCart";
import ProductType from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import SetQuantity from "../products/SetQuantity";
import { truncateText } from "@/utils/truncateText";
import { formatPriceToFarsi } from "@/utils/formatPriceToFarsi";

interface ItemContentProps {
    item: ProductType;
}

const CartItem: React.FC<ItemContentProps> = ({ item }) => {

    const { handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease } = useCart();

    return (
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4 m:flex-col">
                <Link href={`/product/${item._id}`}>
                    <div className="relative w-[6.4rem] aspect-square">
                        <Image
                            src={item.images[0]}
                            alt={item.title}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                            className="object-contain"
                        />
                    </div>
                </Link>
                <div className="flex flex-col justify-between gap-1 m:pr-[0.7rem]">
                    <Link href={`/product/${item._id}`}>
                        {truncateText(item.title)}
                    </Link>
                    <div className="text-slate-500 flex flex-col items-start gap-1">
                        <p>رنگ: {item.selectedColor}</p>
                        <p>سایز: {formatPriceToFarsi(item.selectedSize)}</p>
                    </div>
                    <div className="w-[4.4rem]">
                        <button className="text-slate-500 underline" onClick={() => { handleRemoveProductFromCart(item) }}>
                            حذف
                        </button>
                    </div>
                </div>
            </div>
            {item?.offer ? (
                <div className="justify-self-center">{formatPriceToFarsi(item?.offer)}</div>
            ) : (
                <div className="justify-self-center">{formatPriceToFarsi(item?.price)}</div>
            )}
            <div className="justify-self-center">
                <SetQuantity
                    cardCounter={true}
                    productType={item}
                    handleQtyIncrease={() => { handleCartQtyIncrease(item) }}
                    handleQtyDecrease={() => { handleCartQtyDecrease(item) }}
                    custom="m:flex-col m:gap-2"
                />
            </div>
            <div className="justify-self-end font-semibold">{formatPriceToFarsi(item.price * item.quantity)}</div>
        </div>
    );
};

export default CartItem;
