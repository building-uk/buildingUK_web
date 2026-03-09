import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import './ContactInfo.css'

/**
 * ContactInfo molecule - Label + contact details
 * @param {Object} props
 * @param {string} props.title - Section title (e.g., "Location", "Contact Us")
 * @param {string[]} props.lines - Array of text lines
 * @param {'dark' | 'light'} props.variant - Color variant
 * @param {string} props.className - Additional CSS classes
 */
function ContactInfo({ 
  title, 
  lines = [], 
  variant = 'dark',
  className = '',
  ...props 
}) {
  const classes = `contact-info contact-info--${variant} ${className}`.trim()
  
  return (
    <div className={classes} {...props}>
      <Heading level={4} variant="default" color={variant === 'light' ? 'light' : 'dark'}>
        {title}
      </Heading>
      <div className="contact-info__lines">
        {lines.map((line, index) => (
          <Text 
            key={index} 
            size="sm" 
            color={variant === 'light' ? 'footer' : 'dark'}
          >
            {line}
          </Text>
        ))}
      </div>
    </div>
  )
}

export default ContactInfo
