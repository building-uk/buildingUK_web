import Label from '@atoms/Label'
import Heading from '@atoms/Heading'
import './SectionHeader.css'

/**
 * SectionHeader molecule - Label + Title combination
 * @param {Object} props
 * @param {string} props.label - Small uppercase label
 * @param {string} props.title - Main section title
 * @param {'center' | 'left'} props.align - Text alignment
 * @param {string} props.className - Additional CSS classes
 */
function SectionHeader({ 
  label, 
  title, 
  align = 'center',
  className = '',
  ...props 
}) {
  const classes = `section-header section-header--${align} ${className}`.trim()
  
  return (
    <div className={classes} {...props}>
      <Label>{label}</Label>
      <Heading level={2} variant="section">{title}</Heading>
    </div>
  )
}

export default SectionHeader
