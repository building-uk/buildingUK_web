import { Link, useLocation } from 'react-router-dom'
import './NavLink.css'

/**
 * NavLink molecule - Navigation link with active state
 * @param {Object} props
 * @param {string} props.to - Link destination
 * @param {React.ReactNode} props.children - Link text
 * @param {'light' | 'dark'} props.variant - Link color variant
 * @param {string} props.className - Additional CSS classes
 */
function NavLink({ 
  to, 
  children, 
  variant = 'light',
  className = '',
  ...props 
}) {
  const location = useLocation()
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
  const classes = `nav-link nav-link--${variant} ${isActive ? 'nav-link--active' : ''} ${className}`.trim()
  
  // Handle anchor links for single-page scroll
  if (to.startsWith('#')) {
    return (
      <a href={to} className={classes} {...props}>
        {children}
      </a>
    )
  }
  
  return (
    <Link to={to} className={classes} {...props}>
      {children}
    </Link>
  )
}

export default NavLink
