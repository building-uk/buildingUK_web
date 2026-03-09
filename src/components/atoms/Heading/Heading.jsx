import './Heading.css'

/**
 * Heading component - Display headings with consistent styling
 * @param {Object} props
 * @param {1 | 2 | 3 | 4 | 5 | 6} props.level - Heading level (h1-h6)
 * @param {'hero' | 'section' | 'card' | 'default'} props.variant - Visual variant
 * @param {'light' | 'dark' | 'muted'} props.color - Text color
 * @param {React.ReactNode} props.children - Heading content
 * @param {string} props.className - Additional CSS classes
 */
function Heading({ 
  level = 2, 
  variant = 'default', 
  color = 'dark',
  children, 
  className = '',
  ...props 
}) {
  const Tag = `h${level}`
  const classes = `heading heading--${variant} heading--${color} ${className}`.trim()
  
  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}

export default Heading
