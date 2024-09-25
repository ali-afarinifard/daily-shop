import { Box } from "@mui/material";

interface NullDataProps {
    title: string;
    center?: string;
};


const NullData: React.FC<NullDataProps> = ({ title, center }) => {
    return (
        <Box
        sx={{
            width: '100%',
            height: '50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: {xs: '1.25rem', md: '1.5rem'},
            lineHeight: {xs: '1.75rem', md: '2rem'},
        }}
         className={`${center ? center : ''}`}>
            <p className='font-medium'>{title}</p>
        </Box>
    )
}

export default NullData