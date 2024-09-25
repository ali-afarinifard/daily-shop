
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
import { Box, Typography } from '@mui/material';


interface SearchBarItemProps {
    product: ProductType;
    onClick: () => void;
    toggleMenu?: () => void;
}


const SearchBarItem: React.FC<SearchBarItemProps> = ({ product, onClick, toggleMenu }) => {

    const firstImage = product.images[0];

    return (
        <Box
            component="div"
            sx={{
                p: '0.25rem',
                '&:hover': {
                    background: '#f3f4f6 '
                }
            }}
            onClick={onClick}>
            <Link href={`/product/${product._id}`} onClick={toggleMenu}>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.25rem'
                    }}
                >
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Box component="div">
                            <Image
                                src={firstImage}
                                alt={product.title}
                                width={70}
                                height={70}
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                style={{
                                    objectFit: 'cover',
                                    width: '3rem',
                                    height: '3rem'
                                }}
                            />
                        </Box>

                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.25rem'
                            }}
                        >
                            <Typography variant='body1'>{product.title}</Typography>
                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }}
                            >
                                {product.isStatus ? (
                                    <Box
                                        component="div"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.25rem'
                                        }}
                                    >
                                        {product.offer ? (
                                            <>
                                                <Typography variant='body2' sx={{ color: '#64748b' }} className="text-offer">
                                                    {formatPriceToFarsi(product.price)}
                                                </Typography>

                                                <Typography variant='body1' sx={{ color: '#22c55e' }}>
                                                    {formatPriceToFarsi(product.offer)}
                                                </Typography>
                                            </>
                                        ) : (
                                            <Typography variant='body1' sx={{ color: '#22c55e' }}>
                                                {formatPriceToFarsi(product.price)}
                                            </Typography>
                                        )}
                                        <Typography variant='body2'>تومان</Typography>
                                    </Box>
                                ) : (
                                    <Box component="div">
                                        <Typography
                                            sx={{
                                                borderRadius: '0.37rem',
                                                borderColor: '#334155',
                                                background: '#f43f5e',
                                                color: '#fff',
                                                px: '0.75rem',
                                                py: '0.08rem',
                                                fontSize: '0.7rem',
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            ناموجود
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>


                    <FaChevronLeft size={16} />

                </Box>
            </Link>
        </Box>
    )
}

export default SearchBarItem