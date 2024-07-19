import { Link } from "react-router-dom"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
    return (
        <div
            className="flex s:flex-col-reverse min-h-screen"
        >
            <Navbar />
            <div className="flex-grow p-4 pb-16 s:pb-20">{children}</div>
            {/* <div className="flex gap-8">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </div> */}
        </div>
    )
}

export default Layout