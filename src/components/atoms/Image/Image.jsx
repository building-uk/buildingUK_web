import './Image.css'

/**
 * Image component - Optimized image display with lazy loading
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {'cover' | 'contain'} props.objectFit - Object fit style
 * @param {boolean} props.overlay - Show gradient overlay
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.aspectRatio - Aspect ratio (width/height)
 */
function Image({ 
  src, 
  alt = '',
  objectFit = 'cover',
  overlay = false,
  className = '',
  aspectRatio,
  ...props 
}) {
  const classes = `image image--${objectFit} ${overlay ? 'image--overlay' : ''} ${className}`.trim()
  
  const style = aspectRatio ? { aspectRatio } : {}
  
  return (
    <div className={classes} style={style}>
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        {...props}
      />
    </div>
  )
}

export default Image
