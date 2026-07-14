import "./form.css"

export default function InputField({ name,
    placeholder,
    value,
    label,
    min,
    max,
    id,
    type,
    onChange,
    required,
    error,
    onBlur,
    autofocus
}) {
    return (<label className="inputfield">
        {label && `${label}`}
        <input
            className={`input ${error ? "error" : ""}`}
            type={type}
            name={name}
            placeholder={placeholder}
            id={id}
            min={min}
            max={max}
            onChange={onChange}
            required={required}
            error={error}
            value={value}
            onBlur={onBlur}
            autoFocus={autofocus}
        />
        {error && <span className="error">{error}</span>}
    </label>)
}