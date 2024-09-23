// ** Components
import { Box } from "@mui/material"
import Container from "../components/Container"
import Weblog from "../components/weblog/Weblog"

const WeblogPage = () => {
    return (
        <Box
            sx={{
                pt: { xs: '2.5rem', lg: '5rem' }
            }}
        >
            <Container>
                <Weblog />
            </Container>
        </Box>
    )
}

export default WeblogPage