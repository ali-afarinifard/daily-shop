// ** Components
import Container from "../components/Container"
import FormWrap from "../components/FormWrap"
import RegisterForm from "../components/Register/RegisterForm"

const RegisterPage = () => {
    return (
        <Container>
            <FormWrap>
                <RegisterForm />
            </FormWrap>
        </Container>
    )
}

export default RegisterPage