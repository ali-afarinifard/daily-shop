'use client'

import ProductType from "@/types/product";


interface SetQtyProps {
    cardCounter?: boolean,
    productType: ProductType,
    handleQtyIncrease: () => void,
    handleQtyDecrease: () => void,
    custom?: string;
}

const btnStyles = "border-[1.2px] border-slate-300 px-2 rounded";


const SetQuantity: React.FC<SetQtyProps> = ({
    cardCounter,
    productType,
    handleQtyIncrease,
    handleQtyDecrease,
    custom
}) => {
    return (
        <div className="flex items-center gap-4 my-2">

            {cardCounter ? null : <div className="font-semibold">تعداد :</div>}

            <div className={`flex items-center gap-4 text-base ${custom ? custom : ''}`}>
                <button onClick={handleQtyIncrease} className={btnStyles}>+</button>
                <div>{productType?.quantity}</div>
                <button onClick={handleQtyDecrease} className={`${btnStyles} px-[11px] py-[0.5px]`}>-</button>
            </div>

        </div>
    )
}

export default SetQuantity