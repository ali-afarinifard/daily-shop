import { Link } from 'react-router-dom'
import { FaShopify } from "react-icons/fa6";

const Logo = () => {
    return (
        <Link to={'/'} className="flex items-center gap-1">
            <FaShopify size={28} />
            <span>پنل فروشگاه ( ادمین )</span>
        </Link>
    )
}

export default Logo