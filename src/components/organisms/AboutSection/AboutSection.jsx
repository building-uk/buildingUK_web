import { PortableText } from '@portabletext/react'
import Label from '@atoms/Label'
import Heading from '@atoms/Heading'
import Button from '@atoms/Button'
import Image from '@atoms/Image'
import Skeleton from '@atoms/Skeleton'
import StatCard from '@molecules/StatCard'
import './AboutSection.css'

const portableTextComponents = {
  block: {
    normal: ({ children }) => <p className="about__paragraph">{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="about__list">{children}</ul>,
    number: ({ children }) => <ol className="about__list">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
}

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
              <Image src="/images/DSC_6758.webp" alt="BuildingUK Work" />
            </div>
          )}
        </div>

        {/* Right side - Content */}
        <div className="about__content">
          <Label color="primary">{label || 'About Us'}</Label>
          <Heading level={2} variant="section" color="dark">{title}</Heading>
          <div className="about__description">
            {Array.isArray(description) ? (
              description.length > 0 && typeof description[0] === 'string' ? (
                description.map((para, index) => (
                  <p key={index} className="about__paragraph">{para}</p>
                ))
              ) : (
                <PortableText value={description} components={portableTextComponents} />
              )
            ) : typeof description === 'string' ? (
              <p className="about__paragraph">{description}</p>
            ) : null}
          </div>

          <div className="about__cta">
            <Button href={ctaLink} variant="primary" size="lg">
              {ctaText}
            </Button>
          </div>
        </div>

        {/* Stats Grid - Moved outside content to span more width */}
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
    </section>
  )
}

export default AboutSection
