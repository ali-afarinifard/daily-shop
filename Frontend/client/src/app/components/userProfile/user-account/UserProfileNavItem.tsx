import { Box, Typography } from "@mui/material";
import { IconType } from "react-icons";


interface UserProfileNavItemProps {
    selected?: boolean;
    icon: IconType;
    label: string;
    custom?: string;
    onClick?: () => void;
};


const UserProfileNavItem: React.FC<UserProfileNavItemProps> = ({ selected, icon: Icon, label, custom, onClick }) => {
    return (
        <Box
            component={'div'}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: '0.5rem',
                p: '0.5rem',
                borderBottom: selected ? '2px solid' : 'transparent',
                borderColor: selected ? '#1e293b' : '#64748b',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                color: selected ? '#1e293b' : '#64748b',
                '&:hover': {
                    color: '#1e293b'
                }
            }}
            onClick={onClick}
        >
            <Icon size={20} className={`${custom ? custom : ''}`} />
            <Typography
                sx={{
                    fontWeight: 900,
                    fontSize: '0.8rem',
                    textAlign: 'center',
                    overflowWrap: 'normal',
                    wordBreak: 'normal'
                }}
                className={`${custom ? custom : ''}`}>{label}</Typography>
        </Box>
    )
}

export default UserProfileNavItem