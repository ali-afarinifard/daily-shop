
// ** Next
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

// ** Types
import ProductType from '@/types/product'

// ** Utils
import { formatPriceToFarsi } from '@/utils/formatPriceToFarsi';

// ** Icons
import { FaChevronLeft } from 'react-icons/fa';


interface SearchBarItemProps {
    product: ProductType;
    onClick: () => void;
    toggleMenu?: () => void;
}


const SearchBarItem: React.FC<SearchBarItemProps> = ({ product, onClick, toggleMenu }) => {

    const firstImage = product.images[0];

    return (
        <li className="p-1 hover:bg-gray-100" onClick={onClick}>
            <Link href={`/product/${product._id}`} onClick={toggleMenu}>
                <div className="flex items-center justify-between gap-1">
                    <div className='flex items-center gap-2'>
                        <div>
                            <Image
                                src={firstImage}
                                alt={product.title}
                                width={70}
                                height={70}
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                className="object-cover w-[3rem] h-[3rem]"
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span>{product.title}</span>
                            <div className='flex items-center gap-1'>
                                {product.isStatus ? (
                                    <div className="flex items-center justify-center gap-1">
                                        {product.offer ? (
                                            <>
                                                <span className="text-offer text-[0.8rem] text-slate-500">{formatPriceToFarsi(product.price)}</span>
                                                <span className="text-[0.92rem] text-green-500">{formatPriceToFarsi(product.offer)}</span>
                                            </>
                                        ) : (
                                            <span className="text-[0.92rem] text-green-500">{formatPriceToFarsi(product.price)}</span>
                                        )}
                                        <span className="text-[0.8rem]">تومان</span>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="rounded-md bg-rose-500 text-white px-3 py-[0.08rem] text-[0.7rem] w-full border-slate-700 flex items-center justify-center">ناموجود</div>
                                    </div>
                                )}
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