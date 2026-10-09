import { PortableText } from '@portabletext/react'
import Label from '@atoms/Label'
import Heading from '@atoms/Heading'
import Button from '@atoms/Button'
import Image from '@atoms/Image'
import './AboutIntro.css'

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
 * AboutIntro organism - About introduction with images and text
 * @param {Object} props
 * @param {Object} props.data - About section data
 */
function AboutIntro({ data = {} }) {
  const {
    label = 'About Us',
    headline = 'We transform spaces with seamless, high-quality renovations and restorations',
    paragraphs = [],
    image = '',
    ctaText = 'Contact Us',
    ctaLink = '#contact'
  } = data || {}

  return (
    <section className="about-intro section">
      <div className="about-intro__container container">
        {/* Left - Image */}
        {image && (
          <div className="about-intro__image-wrapper">
            <Image src={image} alt={headline} />
          </div>
        )}

        {/* Right - Content */}
        <div className="about-intro__content">
          <Label>{label}</Label>
          <Heading level={2} variant="section" className="about-intro__headline">
            {headline}
          </Heading>
          <div className="about-intro__text">
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
          </div>
          <Button href={ctaLink} variant="primary" size="md">
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default AboutIntro
