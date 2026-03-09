import Skeleton from '@atoms/Skeleton'
import './ServiceCardSkeleton.css'

/**
 * ServiceCardSkeleton - Loading placeholder for ServiceCard
 */
function ServiceCardSkeleton({ imagePosition = 'left' }) {
  return (
    <div className={`service-card-skeleton service-card-skeleton--${imagePosition}`}>
      <div className="service-card-skeleton__image">
        <Skeleton variant="image" height="100%" />
      </div>
      <div className="service-card-skeleton__content">
        <Skeleton variant="heading" width="70%" />
        <Skeleton variant="text" lines={3} />
        <Skeleton variant="button" />
      </div>
    </div>
  )
}

export default ServiceCardSkeleton
