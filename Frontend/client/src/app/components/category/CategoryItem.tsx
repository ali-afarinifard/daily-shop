
interface CategoryItemProps {
    selected?: boolean;
    label: string;
    centerParent?: string;
    centerChild?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ selected, label, centerParent, centerChild }) => {
    return (
        <div
            className={`flex items-center justify-center text-center gap-2 p-2  border-b-2 transition cursor-pointer ${selected ? 'border-b-slate-800' : 'border-transparent'} ${centerParent ? centerParent : ''}`}
        >
            <div className={`font-medium text-sm text-center break-normal ${centerChild ? centerChild : ''}`}>{label}</div>
        </div>
    )
}

export default CategoryItem