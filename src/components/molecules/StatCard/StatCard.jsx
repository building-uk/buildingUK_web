import { useCountUp } from '../../../hooks'
import './StatCard.css'

/**
 * StatCard molecule - Number + Description statistic
 * @param {Object} props
 * @param {string} props.value - Stat value (e.g., "25+")
 * @param {string} props.description - Stat description
 * @param {string} props.className - Additional CSS classes
 */
function StatCard({
  value,
  description,
  className = '',
  ...props
}) {
  const { value: animatedValue, ref } = useCountUp(value)
  const classes = `stat-card ${className}`.trim()

  return (
    <div ref={ref} className={classes} {...props}>
      <span className="stat-card__value">{animatedValue}</span>
      <span className="stat-card__description">{description}</span>
    </div>
  )
}

export default StatCard
