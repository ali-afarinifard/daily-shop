// ** MUI
import { Box } from "@mui/material";

interface BackDropProfileNavProps {
    onClick: () => void;
}

const BackDropProfileNav: React.FC<BackDropProfileNavProps> = ({ onClick }) => {
    return (
        <Box
            component="div"
            sx={{
                zIndex: 20,
                background: '#334155',
                opacity: '0.5',
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0
            }}
            onClick={onClick}
        ></Box>
    )
}

export default BackDropProfileNav