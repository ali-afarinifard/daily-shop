// ** Components
import Container from "../components/Container"
import FormWrap from "../components/FormWrap"
import ResetAccountForm from "../components/resetAccount/ResetAccountForm"

const ResetAccountPage = () => {
    return (
        <Container>
            <FormWrap>
                <ResetAccountForm />
            </FormWrap>
        </Container>
    )
}

export default ResetAccountPage