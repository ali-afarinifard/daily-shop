// ** Next
import { ReactNode } from "react"

// ** MUI
import { Box } from "@mui/material"


interface ContainerProps {
    children: ReactNode
}


const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <Box
            component="div"
            sx={{
                maxWidth: '1920px',
                mx: 'auto',
                px: { xs: '1rem', md: '5rem' },
            }}
        >
            {children}
        </Box>
    )
}

export default Container