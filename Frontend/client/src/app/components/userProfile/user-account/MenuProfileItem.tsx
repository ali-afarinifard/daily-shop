import { IconType } from "react-icons";

interface MenuProfileItemProps {
    onClick: () => void;
    label: string;
    icon: IconType;
}


const MenuProfileItem: React.FC<MenuProfileItemProps> = ({ onClick, icon: Icon, label }) => {
    return (
        <div onClick={onClick} className="px-4 py-3 hover:bg-neutral-100 transition cursor-pointer flex items-center gap-2">
            <Icon size={20} />
            {label}
        </div>
    )
}

export default MenuProfileItem