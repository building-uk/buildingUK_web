import Label from '@atoms/Label'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Button from '@atoms/Button'
import Image from '@atoms/Image'
import './AboutIntro.css'

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
            {paragraphs.map((para, index) => (
              <Text key={index} size="base" color="dark">
                {para}
              </Text>
            ))}
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
