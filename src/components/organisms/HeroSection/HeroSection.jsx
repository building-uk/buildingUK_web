import { useRef, useState, useEffect } from 'react'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Button from '@atoms/Button'
import { useParallax } from '../../../hooks'
import './HeroSection.css'

/**
 * HeroSection organism - Main hero banner
 * @param {Object} props
 * @param {string} props.title - Main heading (can include line breaks)
 * @param {string} props.ctaText - CTA button text
 * @param {string} props.ctaLink - CTA button link
 * @param {string} props.backgroundImage - Background image URL
 */
function HeroSection({
  title = 'Building Renovation\n& Restoration',
  subtitle,
  ctaText = 'BOOK A CONSULTATION',
  ctaLink = '/contact',
  images = []
}) {
  // Use local fallback if no images provided from CMS
  const displayImages = images?.length > 0 ? images : ['/images/DSC_6758.JPG']
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const parallaxRef = useParallax(0.5)

  useEffect(() => {
    if (!displayImages || displayImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % displayImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [displayImages])

  // Split title by newlines for proper rendering
  const titleLines = title.split('\n')

  return (
    <section className="hero">
      {displayImages.map((img, index) => (
        <div
          key={img}
          className={`hero__bg ${index === currentImageIndex ? 'active' : ''}`}
          style={{
            backgroundImage: `url(${img})`,
            zIndex: index === currentImageIndex ? 0 : -1
          }}
          ref={index === currentImageIndex ? parallaxRef : null}
        />
      ))}
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <Heading level={1} variant="hero" color="light">
          {titleLines.map((line, index) => (
            <span key={index}>
              {line}
              {index < titleLines.length - 1 && <br />}
            </span>
          ))}
        </Heading>
        {subtitle && (
          <Text size="lg" color="light" className="hero__subtitle">
            {subtitle}
          </Text>
        )}
        <Button href={ctaLink} variant="primary" size="lg">
          {ctaText}
        </Button>
      </div>

    </section>
  )
}

export default HeroSection
