// ** React
import { Box } from "@mui/material";
import { ReactNode } from "react"

interface FooterListProps {
    children: ReactNode;
}

const FooterList: React.FC<FooterListProps> = ({ children }) => {
    return (
        <Box
            component="div"
            sx={{
                width: { xs: '100%', '3sm': '50%', md: '25%' },
                mb: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
            }}
        >
            {children}
        </Box>
    )
}

export default FooterList