import SectionHeader from '@molecules/SectionHeader'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import './WhyUsAlt.css'

const ProcessIcon = ({ type }) => {
  const icons = {
    communicate: '💬',
    deliver: '🏗️',
    complete: '✓'
  }
  return <span className="why-us-alt__icon">{icons[type] || '✓'}</span>
}

/**
 * WhyUsAlt organism - Why us section with process steps (vertical layout)
 * @param {Object} props
 * @param {Object[]} props.processes - Array of process objects
 */
function WhyUsAlt({ processes = [] }) {
  return (
    <section className="why-us-alt section">
      <div className="container">
        <SectionHeader 
          label="Why Us"
          title="A Process Built on Excellence"
        />
        
        <div className="why-us-alt__list">
          {processes.map((process) => (
            <div key={process.id} className="why-us-alt__item">
              <ProcessIcon type={process.type} />
              <div className="why-us-alt__content">
                <Heading level={3} variant="card">{process.title}</Heading>
                <Text size="sm" color="dark">{process.description}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsAlt
