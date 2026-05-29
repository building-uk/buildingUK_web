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

  // Optimize Sanity images automatically
  let optimizedSrc = src
  if (src && typeof src === 'string' && src.includes('cdn.sanity.io/images') && !src.includes('?')) {
    optimizedSrc = `${src}?auto=format&fit=max&q=80&w=1200`
  }
  
  return (
    <div className={classes} style={style}>
      <img 
        src={optimizedSrc} 
        alt={alt} 
        loading="lazy"
        {...props}
      />
    </div>
  )
}

export default Image
