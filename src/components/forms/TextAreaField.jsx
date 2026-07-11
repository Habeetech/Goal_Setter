import "./form.css"

export default function TextAreaField({name,
    placeholder,
    value,
    label,
    min,
    max,
    id,
    onChange,
    required,
    error,
    onBlur,
    autofocus
}) {
   return(<label className="textarea-field">
    {label && `${label}`}
     <textarea
     className={`textarea ${error ? "error" : ""}`}
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