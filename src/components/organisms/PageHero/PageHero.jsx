import Heading from '@atoms/Heading'
import './PageHero.css'

/**
 * PageHero organism - Page title hero banner with background
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.backgroundImage - Background image URL
 */
function PageHero({
  title,
  backgroundImage
}) {
  const defaultBg = '/images/page-hero-bg.jpg'
  const bgStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : { backgroundImage: `url(${defaultBg})` }

  return (
    <section
      className="page-hero"
      style={bgStyle}
    >
      <div className="page-hero__overlay"></div>
      <div className="page-hero__content container">
        <Heading level={1} variant="hero" color="light">
          {title}
        </Heading>
      </div>
    </section>
  )
}

export default PageHero
