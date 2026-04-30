import Label from '@atoms/Label'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import ServiceCardAlt from '@organisms/ServiceCardAlt'
import './ServicesIntro.css'

/**
 * ServicesIntro organism - Services intro section with cards
 * @param {Object} props
 * @param {Object[]} props.services - Array of service objects
 * @param {Object} props.intro - Intro text data from CMS
 */
function ServicesIntro({ services = [], intro = {} }) {
  const {
    label = 'Our Services',
    headline = 'Expert Solutions for Every Space',
    description = 'At BuildingUK Ltd, we offer a full range of construction, renovation, and restoration services designed to meet the unique needs of homes and businesses. Our experienced team works closely with clients to deliver projects with precision, reliability, and attention to detail.'
  } = intro || {}

  return (
    <section className="services-intro section">
      <div className="container">
        <div className="services-intro__header">
          <Label>{label}</Label>
          <Heading level={2} variant="section">
            {headline}
          </Heading>
          <Text size="base" color="dark" className="services-intro__description">
            {description}
          </Text>
        </div>
        
        <div className="services-intro__cards">
          {services.map((service) => (
            <ServiceCardAlt key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesIntro
