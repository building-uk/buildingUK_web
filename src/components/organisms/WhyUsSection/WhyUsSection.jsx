import SectionHeader from '@molecules/SectionHeader'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import Image from '@atoms/Image'
import Skeleton from '@atoms/Skeleton'
import './WhyUsSection.css'

// Icons component
const ProcessIcon = ({ icon, type }) => {
  const icons = {
    communicate: '/images/Communication Skill.png',
    deliver: '/images/Construction Worker.png',
    complete: '/images/City.png'
  }

  const src = icon || icons[type]

  if (!src) return <span className="why-us__icon">✓</span>

  return (
    <div className="why-us__icon-wrapper">
      <img src={src} alt={type || 'Process Icon'} className="why-us__icon-image" />
    </div>
  )
}

/**
 * WhyUsSection organism - Why choose us section
 * @param {Object} props
 * @param {Object[]} props.processes - Array of process steps
 * @param {string} props.image - Side image URL
 * @param {boolean} props.loading - Loading state
 */
function WhyUsSection({ processes = [], loading = false }) {
  if (loading) {
    return (
      <section id="why-us" className="why-us section section--light">
        <div className="container">
          <div className="why-us__container">
            <div className="why-us__content">
              <div className="section-header-skeleton">
                <Skeleton variant="text" width="70px" />
                <Skeleton variant="heading" width="280px" height="40px" />
              </div>

              <div className="why-us__list">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="why-us__item">
                    <Skeleton variant="circle" />
                    <div className="why-us__item-content">
                      <Skeleton variant="heading" width="60%" height="24px" />
                      <Skeleton variant="text" lines={2} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="why-us" className="why-us section section--light">
      <div className="container">
        <div className="why-us__container">
          {/* Content Only */}
          <div className="why-us__content">
            <SectionHeader
              label="Why Us"
              title="A Process Built on Excellence"
              align="center"
            />

            <div className="why-us__list">
              {processes.map((process) => (
                <div key={process.id} className="why-us__item">
                  <ProcessIcon icon={process.icon} type={process.type} />
                  <div className="why-us__item-content">
                    <Heading level={3} variant="card">{process.title}</Heading>
                    <Text size="sm" color="dark">{process.description}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUsSection
