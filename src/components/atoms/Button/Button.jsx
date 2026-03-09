import { Link } from 'react-router-dom'
import './Button.css'

/**
 * Button component - Primary interactive element
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost'} props.variant - Button style variant
 * @param {'sm' | 'md' | 'lg'} props.size - Button size
 * @param {string} props.href - If provided, renders as anchor/link
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {function} props.onClick - Click handler
 */
function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  className = '', 
  onClick,
  type = 'button',
  ...props 
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim()
  
  // If href is provided
  if (href) {
    // Check if it's an external link or anchor link
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a href={href} className={classes} {...props}>
          {children}
        </a>
      )
    }

    // Use Router Link for internal routes
    return (
      <Link to={href} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  
  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button
