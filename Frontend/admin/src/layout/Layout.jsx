import { useContext } from "react";
import Navbar from "./Navbar"
import { AuthContext } from "../context/AuthContext";
import Login from "../components/templates/Login";

const Layout = ({ children }) => {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div
            className="flex s:flex-col-reverse min-h-screen"
        >
            {isAuthenticated && <Navbar />}
            <div className={`flex-grow p-4 pb-16 s:pb-20`}>{children}</div>
        </div>
    )
}

export default Layout