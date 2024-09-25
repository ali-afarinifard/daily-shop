// ** MUI
import { Box } from "@mui/material"


const FormWrap = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            component="div"
            sx={{
                minHeight: 'fit-content',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pb: '3rem',
                pt: '6rem'
            }}
        >
            {/* max-h-[55.625rem]  */}
            <Box
                component="div"
                sx={{
                    maxWidth: { xs: 'full', md: '56.25rem' },
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    borderRadius: '0.37rem',
                    p: { xs: '1rem', md: '2rem' }
                }}
            >
                {children}
            </Box>
        </Box>
    )
}

export default FormWrap