import './Input.css'

/**
 * Input component - Form input fields with validation
 * @param {Object} props
 * @param {'text' | 'email' | 'tel' | 'textarea'} props.type - Input type
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.name - Input name
 * @param {string} props.value - Input value
 * @param {function} props.onChange - Change handler
 * @param {function} props.onBlur - Blur handler
 * @param {string} props.error - Error message
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.rows - Rows for textarea
 */
function Input({ 
  type = 'text', 
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  error,
  className = '',
  rows = 6,
  required = false,
  disabled = false,
  ...props 
}) {
  const hasError = !!error
  const classes = `input ${hasError ? 'input--error' : ''} ${className}`.trim()
  
  const inputProps = {
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    className: classes,
    required,
    disabled,
    'aria-invalid': hasError,
    'aria-describedby': hasError ? `${name}-error` : undefined,
    ...props
  }
  
  return (
    <div className="input-wrapper">
      {type === 'textarea' ? (
        <textarea {...inputProps} rows={rows} />
      ) : (
        <input {...inputProps} type={type} />
      )}
      {hasError && (
        <span id={`${name}-error`} className="input-error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

export default Input
