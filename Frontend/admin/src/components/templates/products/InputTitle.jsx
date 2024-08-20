
const InputTitle = ({ htmlLabel, label, id, type, value, onChange, className, placeholder }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor={htmlLabel}>{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className={className}
                placeholder={placeholder}
            />
        </div>
    )
}

export default InputTitle