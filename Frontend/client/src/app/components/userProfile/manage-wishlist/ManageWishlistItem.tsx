// ** Next
import Image from "next/image"
import Link from "next/link"

// ** Types
import ProductType from "@/types/product"

// ** Utils
import { formatPriceToFarsi } from "@/utils/formatPriceToFarsi";

// ** MUI
import { Box, Typography } from "@mui/material";

// ** Icons
import { FaChevronLeft } from "react-icons/fa"


interface ManageWishlistItemProps {
    product: ProductType;
}


const ManageWishlistItem: React.FC<ManageWishlistItemProps> = ({ product }) => {
    return (
        <Link href={`/product/${product._id}`}>

            <Box
                component="div"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem'
                }}
            >

                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}
                >
                    <Box
                        component="div"
                        sx={{
                            width: '4rem',
                            height: '100%'
                        }}
                    >
                        <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={100}
                            height={100}
                            style={{
                                objectFit: 'cover'
                            }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        />
                    </Box>

                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            gap: '0.5rem'
                        }}
                    >
                        <Typography sx={{ color: '#94a3b8', fontWeight: '900', fontSize: '1rem' }}>{product.title}</Typography>
                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                alignItems: 'end',
                                gap: '0.25rem',
                                color: '#64748b'
                            }}
                        >
                            {product.offer ? (
                                <Box
                                    component="div"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.25rem'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '0.75rem',
                                            color: '#64748b',
                                            fontWeight: '700',
                                            textDecoration: 'line-through'
                                        }}
                                    >
                                        {formatPriceToFarsi(product?.price)}
                                    </Typography>

                                    <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 900 }}>
                                        {formatPriceToFarsi(product?.offer)}
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography variant="body1" sx={{ color: '#64748b' }}>
                                    {formatPriceToFarsi(product?.price)}
                                </Typography>
                            )}
                            <Typography variant="body2" sx={{ color: '#64748b', position: 'relative', top: '-2px' }}>تومان</Typography>
                        </Box>
                    </Box>
                </Box>


                <Box component="div">
                    <FaChevronLeft size={20} />
                </Box>

            </Box>

        </Link>
    )
}

export default ManageWishlistItem