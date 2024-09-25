import React from 'react'

// ** Components
import Container from '../components/Container'
import AboutUs from '../components/about-us/about-us'

// ** MUI
import { Box } from '@mui/material'

const AboutUsPage = () => {
    return (
        <Box
            component="div"
            sx={{
                pt: { xs: '2.5rem', lg: '5rem' },
            }}
        >
            <Container>
                <AboutUs />
            </Container>
        </Box>
    )
}

export default AboutUsPage