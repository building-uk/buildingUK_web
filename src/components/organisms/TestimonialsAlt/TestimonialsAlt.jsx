import { useState } from 'react'
import SectionHeader from '@molecules/SectionHeader'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Image from '@atoms/Image'
import './TestimonialsAlt.css'

/**
 * TestimonialsAlt organism - Alternative testimonials with dark theme
 * @param {Object} props
 * @param {Object[]} props.testimonials - Array of testimonial objects
 * @param {string} props.backgroundImage - Background image URL
 */
function TestimonialsAlt({ testimonials = [], backgroundImage = '/images/testimonials-bg.jpg' }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, testimonials.length - 3) : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 3 ? 0 : prev + 1))
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3)

  return (
    <section
      className="testimonials-alt section"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="testimonials-alt__overlay"></div>
      <div className="container testimonials-alt__inner">
        <div className="testimonials-alt__header">
          <div className="testimonials-alt__title">
            <SectionHeader
              label="Clients Testimonials"
              title="Real Experiences. Real Results."
            />
          </div>
          <a href="/testimonials" className="link-underline testimonials-alt__link">
            See More
          </a>
        </div>

        <div className="testimonials-alt__slider">
          <button
            className="testimonials-alt__nav testimonials-alt__nav--prev"
            onClick={goToPrev}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <div className="testimonials-alt__cards">
            {visibleTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-alt-card">
                <div className="testimonial-alt-card__quote">❝</div>
                <Heading level={4} variant="default" color="dark">
                  {testimonial.name}
                </Heading>
                <Text size="sm" color="dark">{testimonial.text}</Text>
              </div>
            ))}
          </div>

          <button
            className="testimonials-alt__nav testimonials-alt__nav--next"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>

        {/* Pagination dots */}
        <div className="testimonials-alt__dots">
          {Array.from({ length: Math.max(0, testimonials.length - 2) }).map((_, i) => (
            <span
              key={i}
              className={`testimonials-alt__dot ${i === currentIndex ? 'testimonials-alt__dot--active' : ''}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsAlt
