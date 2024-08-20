
const InputColor = ({htmlLabel, label, id, type, placeholder, value, onChange, className}) => {
    return (
        <div className="flex flex-col gap-1 pt-1 w-full">
            <label htmlFor={htmlLabel}>{label}</label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={className}
            />
        </div>
    )
}

export default InputColor