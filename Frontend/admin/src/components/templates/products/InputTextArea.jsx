
const InputTextArea = ({ htmlLabel, label, id, value, onChange, className }) => {
    return (
        <div className="flex flex-col gap-1 my-3">
            <label htmlFor={htmlLabel}>{label}</label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                autoComplete="off"
                className={className}
            />
        </div>
    )
}

export default InputTextArea