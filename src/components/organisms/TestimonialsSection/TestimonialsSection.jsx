import { useState } from 'react'
import SectionHeader from '@molecules/SectionHeader'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Skeleton from '@atoms/Skeleton'
import './TestimonialsSection.css'

/**
 * TestimonialsSection organism - Client testimonials slider
 * @param {Object} props
 * @param {Object[]} props.testimonials - Array of testimonial objects
 * @param {boolean} props.loading - Loading state
 */
function TestimonialsSection({ testimonials = [], loading = false }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, testimonials.length - 3) : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 3 ? 0 : prev + 1))
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3)

  if (loading) {
    return (
      <section id="testimonials" className="testimonials section section--light">
        <div className="container">
          <div className="section-header-skeleton" style={{ textAlign: 'center' }}>
            <Skeleton variant="text" width="140px" style={{ margin: '0 auto' }} />
            <Skeleton variant="heading" width="300px" height="40px" style={{ margin: '0 auto' }} />
          </div>

          <div className="testimonials__cards">
            {[1, 2, 3].map((i) => (
              <div key={i} className="testimonial-card">
                <Skeleton variant="text" width="40px" height="40px" />
                <Skeleton variant="heading" width="60%" height="24px" />
                <Skeleton variant="text" lines={3} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="testimonials section section--light">
      <div className="container">
        <SectionHeader
          label="Clients Testimonials"
          title="Real Experiences. Real Results."
        />

        <div className="testimonials__slider">
          <button
            className="testimonials__nav testimonials__nav--prev"
            onClick={goToPrev}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <div className="testimonials__cards">
            {visibleTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-card__quote">❝</div>
                <Heading level={4} variant="default" color="dark">
                  {testimonial.name}
                </Heading>
                <Text size="sm" color="dark">{testimonial.text}</Text>
              </div>
            ))}
          </div>

          <button
            className="testimonials__nav testimonials__nav--next"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>

        {/* Pagination dots */}
        <div className="testimonials__dots">
          {Array.from({ length: Math.max(0, testimonials.length - 2) }).map((_, i) => (
            <span
              key={i}
              className={`testimonials__dot ${i === currentIndex ? 'testimonials__dot--active' : ''}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
