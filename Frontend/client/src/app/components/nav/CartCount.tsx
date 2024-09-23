'use client'

// ** Next
import { useRouter } from "next/navigation"

// ** Hooks
import { useCart } from "@/hooks/useCart"

// ** Icons
import { CiShoppingCart } from 'react-icons/ci'
import { Box, Typography } from "@mui/material"


const CartCount = () => {

    const { cartTotalQty } = useCart();

    const router = useRouter();

    return (
        <Box
            sx={{
                position: 'relative',
                cursor: 'pointer'
            }}
            onClick={() => router.push('/cart')}>

            <Typography variant="h1">
                <CiShoppingCart />
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    background: '#334155',
                    color: '#fff',
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pt: '4px'
                }}
            >
                {cartTotalQty}
            </Typography>

        </Box>
    )
}

export default CartCount