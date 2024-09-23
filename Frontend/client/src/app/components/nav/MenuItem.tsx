import { Box } from "@mui/material";

interface MenuItemProps {
    children: React.ReactNode;
    onClick: () => void;
}


const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
    return (
        <Box
            sx={{
                px: '1rem',
                py: '0.75rem',
                transition: 'all 0.3s',
                cursor: 'pointer',
                '&:hover': {
                    background: '#f5f5f5',
                }
            }}
            onClick={onClick}
        >
            {children}
        </Box>
    )
}

export default MenuItem