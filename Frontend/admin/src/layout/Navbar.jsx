import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/templates/Logo";
import { RxDashboard } from "react-icons/rx";
import { BsBasket } from "react-icons/bs";
import { BsViewList } from "react-icons/bs";
import { TbCategoryPlus } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { MdLogout } from "react-icons/md";


const Navbar = () => {

  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // for text
  const inActiveLink = 'flex gap-3 s:flex-col s:items-center s:w-full m:text-xs p-2';
  const activeLink = inActiveLink + ' !bg-highlight text-black rounded-l-md s:rounded-xl xs:rounded-full';

  // for icon
  const inActiveIcon = 'w-6 h-6';
  const activeIcon = inActiveIcon + ' text-primary';


  return (
    <aside className={'text-gray-500 p-4 pl-0 bg-bgGray w-auto z-[1000]'}>

      <div className='mb-8 mr-4 ml-3 s:hidden'>
        <Logo />
      </div>

      <nav className='flex flex-col gap-6 s:flex-row s:gap-1 s:fixed s:left-0 s:bottom-0 s:right-0 s:bg-white s:shadow-2xl s:py-4 w-full'>

        <Link to={'/'} className={pathname === '/' ? activeLink : inActiveLink}>
          <RxDashboard className={pathname === '/' ? activeIcon : inActiveIcon} />
          <span className='xs:hidden'>پنل اصلی</span>
        </Link>

        <Link to={'/products'} className={pathname.includes('/products') ? activeLink : inActiveLink}>
          <BsBasket className={pathname.includes('/products') ? activeIcon : inActiveIcon} />
          <span className='xs:hidden'>محصولات</span>
        </Link>

        <Link to={'/categories'} className={pathname.includes('/categories') ? activeLink : inActiveLink}>
          <TbCategoryPlus className={pathname === '/categories' ? activeIcon : inActiveIcon} />
          <span className='xs:hidden'>دسته بندی ها</span>
        </Link>

        <Link to={'/account'} className={`${pathname.includes('/settings') ? activeLink : inActiveLink} xs:hidden`}>
          <IoSettingsOutline className={pathname === '/settings' ? activeIcon : inActiveIcon} />
          <span className='xs:hidden'>حساب کاربری</span>
        </Link>

        <Link to={'/orders'} className={pathname.includes('/orders') ? activeLink : inActiveLink}>
          <BsViewList className={pathname === '/orders' ? activeIcon : inActiveIcon} />
          <span className='xs:hidden'>سفارشات</span>
        </Link>

        <button onClick={handleLogout} className={inActiveLink}>
          <MdLogout className={inActiveIcon} />
          <span className='xs:hidden'>خروج</span>
        </button>

      </nav>

    </aside>
  )
}

export default Navbar