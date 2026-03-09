import Label from '@atoms/Label'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Button from '@atoms/Button'
import Image from '@atoms/Image'
import Skeleton from '@atoms/Skeleton'
import StatCard from '@molecules/StatCard'
import './AboutSection.css'

/**
 * AboutSection organism - About us section with stats
 * @param {Object} props
 * @param {Object} props.data - About section data from repository
 * @param {boolean} props.loading - Loading state
 */
function AboutSection({ data, loading = false }) {
  const {
    label = 'About Us',
    title = 'BuildingUK Ltd',
    description = '',
    stats = [],
    images = [],
    ctaText = 'Learn More',
    ctaLink = '/about'
  } = data || {}

  if (loading) {
    return (
      <section id="about" className="about section">
        <div className="about__container container">
          {/* Skeleton Images */}
          <div className="about__images">
            <div className="about__image about__image--1">
              <Skeleton variant="image" height="300px" />
            </div>
            <div className="about__image about__image--2">
              <Skeleton variant="image" height="200px" />
            </div>
          </div>

          {/* Skeleton Content */}
          <div className="about__content">
            <Skeleton variant="text" width="80px" />
            <Skeleton variant="heading" width="200px" height="40px" />
            <Skeleton variant="text" lines={4} />
            <Skeleton variant="button" />

            <div className="about__stats">
              <Skeleton variant="card" height="80px" />
              <Skeleton variant="card" height="80px" />
              <Skeleton variant="card" height="80px" />
              <Skeleton variant="card" height="80px" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="about section">
      <div className="about__container container">
        {/* Left side - Images */}
        <div className="about__images">
          {Array.isArray(images) && images.length > 0 ? (
            <div className="about__image about__image--single">
              <Image src={images[0].src} alt={images[0].alt || 'BuildingUK Quality'} />
            </div>
          ) : (
            <div className="about__image about__image--single">
              <Image src="/images/DSC_6758.JPG" alt="BuildingUK Work" />
            </div>
          )}
        </div>

        {/* Right side - Content */}
        <div className="about__content">
          <Label color="primary">{label || 'About Us'}</Label>
          <Heading level={2} variant="section" color="dark">{title}</Heading>
          <Text size="base" color="dark" className="about__description">{description}</Text>

          <div className="about__cta">
            <Button href={ctaLink} variant="primary" size="lg">
              {ctaText}
            </Button>
          </div>

          {/* Stats Grid - Now correctly showing after CTA as requested */}
          <div className="about__stats">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                description={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
