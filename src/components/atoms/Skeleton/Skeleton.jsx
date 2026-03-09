import './Skeleton.css'

/**
 * Skeleton atom - Loading placeholder for content
 * @param {Object} props
 * @param {'text' | 'heading' | 'image' | 'card' | 'circle' | 'button'} props.variant
 * @param {string} props.width - Custom width
 * @param {string} props.height - Custom height
 * @param {number} props.lines - Number of text lines (for text variant)
 * @param {string} props.className - Additional classes
 */
function Skeleton({ 
  variant = 'text', 
  width, 
  height, 
  lines = 1, 
  className = '' 
}) {
  const style = {
    ...(width && { width }),
    ...(height && { height })
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`skeleton-lines ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i} 
            className="skeleton skeleton--text" 
            style={{ 
              ...style, 
              width: i === lines - 1 ? '70%' : '100%' 
            }} 
          />
        ))}
      </div>
    )
  }

  return (
    <div 
      className={`skeleton skeleton--${variant} ${className}`} 
      style={style}
    />
  )
}

export default Skeleton
