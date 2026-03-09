import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Button from '@atoms/Button'
import Image from '@atoms/Image'
import './ServiceCard.css'

/**
 * ServiceCard organism - Individual service display
 * @param {Object} props
 * @param {string} props.title - Service title
 * @param {string} props.description - Service description
 * @param {string} props.image - Service image URL
 * @param {string} props.link - Learn more link
 * @param {'left' | 'right'} props.imagePosition - Image alignment
 */
function ServiceCard({ 
  title,
  description,
  image,
  link = '#',
  imagePosition = 'left'
}) {
  return (
    <div className={`service-card service-card--${imagePosition}`}>
      <div className="service-card__image">
        <Image src={image} alt={title} />
      </div>
      <div className="service-card__content">
        <Heading level={3} variant="card">{title}</Heading>
        <Text size="base" color="dark">{description}</Text>
        <Button href={link} variant="primary" size="md">
          Learn More
        </Button>
      </div>
    </div>
  )
}

export default ServiceCard
