
const InputTextArea = ({htmlLabel, label, id, value, onChange}) => {
    return (
        <div className="flex flex-col gap-1 mb-3">
            <label htmlFor={htmlLabel}>{label}</label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
            ></textarea>
        </div>
    )
}

export default InputTextArea