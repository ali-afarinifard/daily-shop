import { Box } from "@mui/material"
import { ReactNode } from "react"

interface ContainerProps {
    children: ReactNode
}


const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <Box
        sx={{
            maxWidth: '1920px',
            mx: 'auto',
            px: {xs: '1rem', md: '5rem'},
        }}
        >
            {children}
        </Box>
    )
}

export default Container