import { PortableText } from '@portabletext/react'
import Label from '@atoms/Label'
import Heading from '@atoms/Heading'
import StatCard from '@molecules/StatCard'
import './WhyChooseUs.css'

const portableTextComponents = {
  block: {
    normal: ({ children }) => <p className="rich-text__paragraph">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="rich-text__list">{children}</ul>,
    number: ({ children }) => <ol className="rich-text__list">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
}

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
                  <p key={index} className="rich-text__paragraph">{para}</p>
                ))
              ) : (
                <PortableText value={paragraphs} components={portableTextComponents} />
              )
            ) : typeof paragraphs === 'string' ? (
              <p className="rich-text__paragraph">{paragraphs}</p>
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
