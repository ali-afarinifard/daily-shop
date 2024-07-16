import Container from "@/app/components/Container"
import FormWrap from "@/app/components/FormWrap"
import LoginForm from "@/app/components/login/LoginForm"

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