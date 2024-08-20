
const InputCheckbox = ({htmlLabel, label, id, type, checked, onChange, className}) => {
    return (
        <div className="my-3 flex items-center gap-2">
            <label htmlFor={htmlLabel}>
                {label}
            </label>
            <input
                id={id}
                type={type}
                checked={checked}
                onChange={onChange}
                className={className}
            />
        </div>
    )
}

export default InputCheckbox