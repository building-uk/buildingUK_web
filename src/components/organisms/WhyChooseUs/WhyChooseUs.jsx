import { PortableText } from '@portabletext/react'
import Label from '@atoms/Label'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import StatCard from '@molecules/StatCard'
import './WhyChooseUs.css'

/**
 * WhyChooseUs organism - Why choose us section with image and stats
 * @param {Object} props
 * @param {Object} props.data - Section data
 */
function WhyChooseUs({ data }) {
  const safeData = data || {}
  const {
    label = 'Why Choose Us',
    title = 'Your project deserves reliability — and we deliver it.',
    paragraphs = [],
    stats = []
  } = safeData

  return (
    <section className="why-choose-us section section--light">
      <div className="container">
        <div className="why-choose-us__container">
          {/* Content Only */}
          <div className="why-choose-us__content">
            <Label>{label}</Label>
            <Heading level={2} variant="section">{title}</Heading>

            {Array.isArray(paragraphs) ? (
              paragraphs.length > 0 && typeof paragraphs[0] === 'string' ? (
                paragraphs.map((para, index) => (
                  <Text key={index} size="base" color="dark">{para}</Text>
                ))
              ) : (
                <PortableText value={paragraphs} />
              )
            ) : typeof paragraphs === 'string' ? (
              <Text size="base" color="dark">{paragraphs}</Text>
            ) : null}

            {/* Stats Grid */}
            <div className="why-choose-us__stats">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  value={stat.value}
                  description={stat.label || stat.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
