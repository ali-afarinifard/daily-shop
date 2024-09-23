import { Box, Typography } from "@mui/material";
import { IconType } from "react-icons";

interface MenuProfileItemProps {
    onClick: () => void;
    label: string;
    icon: IconType;
}


const MenuProfileItem: React.FC<MenuProfileItemProps> = ({ onClick, icon: Icon, label }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                py: '0.75rem',
                px: '1rem',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                '&:hover': {
                    background: '#f5f5f5'
                }
            }}
        >
            <Icon size={20} />
            <Typography variant="body1">
                {label}
            </Typography>
        </Box>
    )
}

export default MenuProfileItem