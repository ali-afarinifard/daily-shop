import Container from "../components/Container"
import UserAccountInfo from "../components/userAccount/UserAccount"

const UserAccountPage = () => {
    return (
        <div className="pt-8">
            <Container>
                <UserAccountInfo />
            </Container>
        </div>
    )
}

export default UserAccountPage