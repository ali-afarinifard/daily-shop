
interface MenuItemProps {
    children: React.ReactNode;
    onClick: () => void;
}


const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
    return (
        <div onClick={onClick} className="px-4 py-3 hover:bg-neutral-100 transition cursor-pointer">
            {children}
        </div>
    )
}

export default MenuItem