import "./InputField.css"

export default function InputField({name,
    placeholder,
    value,
    label,
    id,
    type,
    onChange,
    required,
    error,
    onBlur,
    autofocus
}) {
   return(<label className="inputfield">
    {label && `${label}`}
     <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
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