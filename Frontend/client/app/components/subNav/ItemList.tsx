'use client'

import { ItemType } from "@/types";
import Link from "next/link";


interface ItemListProps {
    items: ItemType[];
}


const ItemList: React.FC<ItemListProps> = ({ items }) => {
    return (
        <div>
            {items.map(item => (
                <Link
                    href={`/${item.name}/${item.id}`}
                >
                    <div key={item.id}>{item.name}</div>
                </Link>
            ))}
        </div>
    )
}

export default ItemList