import './Label.css'

/**
 * Label component - Small uppercase section labels
 * @param {Object} props
 * @param {React.ReactNode} props.children - Label content
 * @param {'primary' | 'dark' | 'white'} props.color - Label color
 * @param {string} props.className - Additional CSS classes
 */
function Label({ 
  children, 
  color = 'primary',
  className = '',
  ...props 
}) {
  const classes = `label label--${color} ${className}`.trim()
  
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}

export default Label
