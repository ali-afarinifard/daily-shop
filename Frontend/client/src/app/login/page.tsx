import Container from "../components/Container"
import FormWrap from "../components/FormWrap"
import LoginForm from "../components/login/LoginForm"

const LoginPage = () => {
    return (
        <Container>
            <FormWrap>
                <LoginForm />
            </FormWrap>
        </Container>
    )
}

export default LoginPage