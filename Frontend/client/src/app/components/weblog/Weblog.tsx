import { Box } from "@mui/material"

const Weblog = () => {
    return (
        <Box
            component={'div'}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                lineHeight: '1.75rem',
                fontWeight: 900
            }}
        >
            این صفحه در حال ساخت است
        </Box>
    )
}

export default Weblog