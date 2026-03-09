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
      <div className="stats-bar__container container">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </div>
    </section>
  )
}

export default StatsBar
