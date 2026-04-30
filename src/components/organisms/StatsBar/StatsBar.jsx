import StatCard from '@molecules/StatCard'
import './StatsBar.css'

/**
 * StatsBar organism - Horizontal stats display
 * @param {Object} props
 * @param {Object[]} props.stats - Array of stat objects
 */
function StatsBar({ stats = [] }) {
  return (
    <section className="stats-bar">
      <div className="container">
        <div className="stats-bar__header text-center mb-xl">
          <span className="stats-bar__supporting">Our Impact in Numbers</span>
        </div>
        <div className="stats-bar__container">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              value={stat.value}
              description={stat.label || stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsBar
