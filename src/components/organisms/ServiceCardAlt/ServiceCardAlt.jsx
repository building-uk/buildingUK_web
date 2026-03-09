import { Link } from 'react-router-dom'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Button from '@atoms/Button'
import Image from '@atoms/Image'
import './ServiceCardAlt.css'

/**
 * ServiceCardAlt organism - Service card with image and explore button
 * @param {Object} props
 * @param {Object} props.service - Service data
 */
function ServiceCardAlt({ service }) {
  const { id, title, shortDescription, image } = service
  
  return (
    <div className="service-card-alt">
      <div className="service-card-alt__image">
        <Image src={image} alt={title} />
      </div>
      <div className="service-card-alt__content">
        <Heading level={3} variant="card">{title}</Heading>
        <Text size="sm" color="dark">{shortDescription}</Text>
        <Button href={`/services/${id}`} variant="primary" size="md">
          Explore Service
        </Button>
      </div>
    </div>
  )
}

export default ServiceCardAlt
