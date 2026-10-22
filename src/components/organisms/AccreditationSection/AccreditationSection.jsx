import { PortableText } from '@portabletext/react'
import Skeleton from '@atoms/Skeleton'
import './AccreditationSection.css'

const portableTextComponents = {
  block: {
    normal: ({ children }) => <p className="accreditation__paragraph">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="accreditation__strong">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="accreditation__link">
        {children}
      </a>
    ),
  },
}

const DEFAULT_BADGES = [
  {
    name: 'Which? Trusted Trader',
    logo: '/images/which-trusted-trader-circle.svg',
    caption: 'Independently vetted for quality and customer service',
    url: 'https://trustedtraders.which.co.uk/businesses/buildinguk-ltd/',
  },
  {
    name: 'UK Firedoor Training',
    logo: '/images/uk-fire-door-approved-installer.svg',
    caption: 'Approved fire door installer',
    url: '',
  },
]

/**
 * AccreditationSection - Displayed right after Hero on landing page
 * Fully dynamic via Sanity CMS with fallback content matching design
 */
export default function AccreditationSection({ data, loading = false }) {
  if (loading) {
    return (
      <section className="accreditation-section section-padding">
        <div className="container accreditation__container">
          <div className="accreditation__content">
            <Skeleton variant="text" width="160px" height="18px" />
            <Skeleton variant="text" width="340px" height="42px" style={{ marginTop: '12px' }} />
            <Skeleton variant="text" width="100%" height="60px" style={{ marginTop: '12px' }} />
          </div>
          <div className="accreditation__badges">
            <Skeleton variant="circle" width="120px" height="120px" />
            <Skeleton variant="circle" width="120px" height="120px" />
          </div>
        </div>
      </section>
    )
  }

  const {
    subtitle = 'ACCREDITED & VETTED',
    title = 'Trusted by Londoners. Backed by the Industry.',
    description,
    badges,
  } = data || {}

  // Determine badges list: use Sanity badges if configured, fallback to default badges
  const displayBadges = badges && badges.length > 0
    ? badges.map((badge, idx) => ({
        name: badge.name || DEFAULT_BADGES[idx]?.name || '',
        logo: badge.logo || DEFAULT_BADGES[idx]?.logo || '/images/which-trusted-trader-circle.svg',
        caption: badge.caption || DEFAULT_BADGES[idx]?.caption || '',
        url: badge.url || DEFAULT_BADGES[idx]?.url || '',
      }))
    : DEFAULT_BADGES

  // Helper to split title into two lines if it contains the standard period separator
  const renderTitle = (rawTitle) => {
    if (!rawTitle) return null
    if (rawTitle.includes('. ') && !rawTitle.includes('\n')) {
      const parts = rawTitle.split('. ')
      return (
        <>
          {parts[0]}.
          <br />
          {parts.slice(1).join('. ')}
        </>
      )
    }
    return rawTitle
  }

  return (
    <section className="accreditation-section" aria-label="Accreditations and Industry Endorsements">
      <div className="container accreditation__container">
        {/* Left Side: Content */}
        <div className="accreditation__content">
          <span className="accreditation__tag">{subtitle}</span>
          <h2 className="accreditation__title">{renderTitle(title)}</h2>
          <div className="accreditation__description">
            {Array.isArray(description) && description.length > 0 ? (
              <PortableText value={description} components={portableTextComponents} />
            ) : typeof description === 'string' && description ? (
              <p className="accreditation__paragraph">{description}</p>
            ) : (
              <p className="accreditation__paragraph">
                We're accredited by <strong className="accreditation__strong">UK Firedoor Training</strong> and listed on{' '}
                <strong className="accreditation__strong">Which? Trusted Trader</strong>, so you can count on quality workmanship,
                high standards and fair treatment from start to finish.
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Badges */}
        <div className="accreditation__badges">
          {displayBadges.map((badge, index) => {
            const BadgeContent = (
              <div className="accreditation__badge-item">
                <div className="accreditation__badge-image-wrapper">
                  <img
                    src={badge.logo}
                    alt={badge.name || badge.caption || 'Accreditation Badge'}
                    className="accreditation__badge-image"
                    loading="lazy"
                    width="120"
                    height="120"
                  />
                </div>
                {badge.caption && (
                  <p className="accreditation__badge-caption">{badge.caption}</p>
                )}
              </div>
            )

            if (badge.url) {
              return (
                <a
                  key={index}
                  href={badge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accreditation__badge-link"
                  aria-label={`${badge.name || 'Accreditation'} - Opens in a new tab`}
                >
                  {BadgeContent}
                </a>
              )
            }

            return (
              <div key={index} className="accreditation__badge-static">
                {BadgeContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
