import ProductType from '@/types/product'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


interface SearchBarItemProps {
    product: ProductType;
    onClick: () => void;
}


const SearchBarItem: React.FC<SearchBarItemProps> = ({ product, onClick }) => {

    const firstImage = product.images[0];

    return (
        <li className="p-1 hover:bg-gray-100 mb-2" onClick={onClick}>
            <Link href={`/product/${product._id}`}>
                <div className="flex items-center gap-2">
                    <div>
                        <Image
                            src={firstImage}
                            alt={product.title}
                            width={70}
                            height={70}
                            className="object-cover w-[3rem] h-[3rem]"
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <span>{product.title}</span>
                        <span className='text-sm text-green-600'>{product.price}</span>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default SearchBarItem