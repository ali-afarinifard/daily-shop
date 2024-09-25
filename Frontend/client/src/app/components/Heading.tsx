import { Box, Typography } from "@mui/material";

interface HeadingProps {
    title: string;
    center?: boolean;
    custom?: string;
};


const Heading: React.FC<HeadingProps> = ({ title, center, custom = '' }) => {
    return (
        <Box
            component="div"
            sx={{
                position: 'relative',
                textAlign: center ? 'center' : 'start'
            }}
        >
            <Typography variant="h2" sx={{ ...(custom && { className: custom }) }}>{title}</Typography>
            <Typography
                sx={{
                    width: '100%',
                    height: '2px',
                    background: '#94a3b8',
                    position: 'absolute',
                    left: 0,
                    bottom: '-0.5rem'
                }}
            >
            </Typography>
        </Box>
    )
}

export default Heading