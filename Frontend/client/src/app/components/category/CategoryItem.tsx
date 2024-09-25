import { Box, Typography } from "@mui/material";

interface CategoryItemProps {
    selected?: boolean;
    label: string;
    centerParent?: string;
    centerChild?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ selected, label, centerParent, centerChild }) => {
    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                textAlign: 'center',
                gap: '0.5rem',
                p: '0.5rem',
                borderBottom: selected ? '2px solid' : '2px solid transparent',
                borderBottomColor: selected ? 'grey.800' : 'transparent',
                transition: 'border-bottom-color 0.3s ease',
                cursor: 'pointer',
                ...(centerParent ? { [centerParent]: '' } : {}),
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    textAlign: 'center',
                    wordBreak: 'break-word',
                    ...(centerChild ? { [centerChild]: '' } : {}),
                }}
            >
                {label}
            </Typography>
        </Box>
    )
}

export default CategoryItem