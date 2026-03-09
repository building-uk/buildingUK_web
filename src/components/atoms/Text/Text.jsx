import './Text.css'

/**
 * Text component - Body text with consistent styling
 * @param {Object} props
 * @param {'sm' | 'base' | 'lg'} props.size - Text size
 * @param {'dark' | 'muted' | 'light' | 'white'} props.color - Text color
 * @param {React.ReactNode} props.children - Text content
 * @param {string} props.className - Additional CSS classes
 * @param {'p' | 'span' | 'div'} props.as - HTML element to render
 */
function Text({ 
  size = 'base', 
  color = 'dark',
  children, 
  className = '',
  as: Component = 'p',
  ...props 
}) {
  const classes = `text text--${size} text--${color} ${className}`.trim()
  
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}

export default Text
