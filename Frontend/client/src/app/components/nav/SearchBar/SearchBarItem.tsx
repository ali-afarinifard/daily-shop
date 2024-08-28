import ProductType from '@/types/product'
import { formatPriceWithSlashes } from '@/utils/formatPrice';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaChevronLeft } from 'react-icons/fa';


interface SearchBarItemProps {
    product: ProductType;
    onClick: () => void;
}


const SearchBarItem: React.FC<SearchBarItemProps> = ({ product, onClick }) => {

    const firstImage = product.images[0];

    return (
        <li className="p-1 hover:bg-gray-100 mb-2" onClick={onClick}>
            <Link href={`/product/${product._id}`}>
                <div className="flex items-center justify-between gap-1">
                    <div className='flex items-center gap-2'>
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
                            <div className='flex items-center gap-1'>
                                {product.offer ? (
                                    <div className='flex items-center gap-2'>
                                        <span className="text-offer text-[0.7rem]">{formatPriceWithSlashes(product.price)}</span>
                                        <span className="text-sm text-green-600">{formatPriceWithSlashes(product.offer)}</span>
                                    </div>
                                ) : (
                                    <span className='text-sm text-green-600'>{formatPriceWithSlashes(product.price)}</span>
                                )}
                                <span className='text-[0.76rem]'>تومان</span>
                            </div>
                        </div>
                    </div>


                    <FaChevronLeft size={16} />

                </div>
            </Link>
        </li>
    )
}

export default SearchBarItem