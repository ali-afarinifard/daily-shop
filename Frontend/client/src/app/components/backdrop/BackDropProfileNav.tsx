
interface BackDropProfileNavProps {
    onClick: () => void;
}

const BackDropProfileNav: React.FC<BackDropProfileNavProps> = ({ onClick }) => {
    return (
        <div onClick={onClick} className="z-40 bg-slate-700 opacity-50 w-screen h-screen fixed top-0 left-0"></div>
    )
}

export default BackDropProfileNav