import SectionHeader from '@molecules/SectionHeader'
import ServiceCardSkeleton from '@molecules/ServiceCardSkeleton'
import ServiceCard from '@organisms/ServiceCard'
import Skeleton from '@atoms/Skeleton'
import Button from '@atoms/Button'
import './ServicesSection.css'

/**
 * ServicesSection organism - Services listing section
 * @param {Object} props
 * @param {Object[]} props.services - Array of service objects
 * @param {boolean} props.loading - Loading state
 */
function ServicesSection({ services = [], loading = false }) {
  return (
    <section id="services" className="services section section--light">
      <div className="container">
        {loading ? (
          <>
            <div className="section-header-skeleton">
              <Skeleton variant="text" width="80px" />
              <Skeleton variant="heading" width="300px" height="40px" />
            </div>
            <div className="services__list">
              <ServiceCardSkeleton imagePosition="left" />
              <ServiceCardSkeleton imagePosition="right" />
              <ServiceCardSkeleton imagePosition="left" />
            </div>
          </>
        ) : (
          <>
            <SectionHeader
              label="Services"
              title="Quality Construction, Done Right"
            />

            <div className="services__list">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.shortDescription || service.description}
                  image={service.image}
                  link={`/services/${service.id}`}
                  imagePosition={index % 2 === 0 ? 'left' : 'right'}
                />
              ))}
            </div>

            <div className="services__footer">
              <Button href="/services" variant="primary" size="lg">
                Learn More
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default ServicesSection
