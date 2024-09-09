import Container from "../components/Container"
import Weblog from "../components/weblog/Weblog"

const WeblogPage = () => {
    return (
        <div className="pt-20 xl:pt-10">
            <Container>
                <Weblog />
            </Container>
        </div>
    )
}

export default WeblogPage