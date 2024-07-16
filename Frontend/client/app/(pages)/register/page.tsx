import Container from "@/app/components/Container"
import FormWrap from "@/app/components/FormWrap"
import RegisterForm from "@/app/components/register/RegisterForm"

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